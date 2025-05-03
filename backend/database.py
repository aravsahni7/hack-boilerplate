import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="AravSahni",
    password="h7F$k9Vm!Q2pRx8",
    database="hacks2025"
)
# buffered=True makes fetchone() behave predictably
cursor = db.cursor(buffered=True)
