from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
from database import db, cursor
import mysql.connector

app = Flask(__name__)
CORS(app)  # allow your React/Vite front-end to call these endpoints

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

if __name__ == '__main__':
    app.run(port=5001, debug=True)
