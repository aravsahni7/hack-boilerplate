from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import requests
from database import db, cursor
import mysql.connector

app = Flask(__name__)
CORS(app)

API_KEY = "AIzaSyB0IdA26Gsd-oDuuWGHEuPEW1D4ziahSEU"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}"

# —— Signup endpoint ——
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    firstname = data.get('firstname')
    lastname  = data.get('lastname')
    email     = data.get('email')
    password  = data.get('password')
    confirm   = data.get('confirm_password')

    if not all([firstname, lastname, email, password, confirm]):
        return jsonify({'message': 'All fields are required'}), 400
    if password != confirm:
        return jsonify({'message': 'Passwords do not match'}), 400

    hashed = hashlib.sha256(password.encode()).hexdigest()
    try:
        cursor.execute(
            "INSERT INTO users (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)",
            (firstname, lastname, email, hashed)
        )
        db.commit()
        return jsonify({'message': 'User registered successfully!'})
    except mysql.connector.Error as err:
        if err.errno == 1062:  # duplicate email
            return jsonify({'message': 'Email already registered'}), 400
        return jsonify({'message': f'Database error: {err}'}), 500

# —— Login endpoint ——
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email    = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'message': 'Email and password required'}), 400

    hashed = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute(
        "SELECT firstname, lastname, password FROM users WHERE email = %s",
        (email,)
    )
    row = cursor.fetchone()
    if row is None:
        return jsonify({'message': 'No account with that email'}), 404

    firstname, lastname, db_password = row
    if hashed != db_password:
        return jsonify({'message': 'Invalid credentials'}), 401

    # If you need sessions or JWT, generate token here
    return jsonify({
        'message': 'Login successful',
        'user': {'firstname': firstname, 'lastname': lastname, 'email': email}
    })

# —— Schedule Generator endpoint ——
@app.route('/generate-schedule', methods=['POST'])
def generate_schedule():
    data = request.json
    school_info = data.get("school_information")
    start_date = data.get("start_date")
    end_date = data.get("end_date")

    if not all([school_info, start_date, end_date]):
        return jsonify({"error": "EMPTY ERROR"}), 400

    prompt = (
        f"Create a schedule knowing my syllabus: {school_info} "
        f"and knowing my school starts on {start_date} and ends on {end_date}. "
        "Knowing the length of each content of the syllabus as I provided and the dates, "
        "spread out the work I should study and assignments I should do in a clear schedule with format:\n\n"
        "DATE:\n\"work to do\"\n\nDATE:\n\"work to do\""
    )

    response = requests.post(
        GEMINI_URL,
        json={"contents": [{"parts": [{"text": prompt}]}]},
        headers={"Content-Type": "application/json"}
    )

    if response.status_code != 200:
        return jsonify({"error": f"Failed to generate schedule: {response.text}"}), 500

    result = response.json()
    try:
        generated_text = result['candidates'][0]['content']['parts'][0]['text']
    except (KeyError, IndexError):
        return jsonify({"error": "Invalid response from Gemini"}), 500

    return jsonify({"schedule": generated_text})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
