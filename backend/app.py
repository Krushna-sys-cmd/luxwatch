import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import check_password_hash

load_dotenv()

app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    origins=["http://127.0.0.1:5500"]
)

app.secret_key = os.getenv("FLASK_SECRET_KEY")

ADMIN_USERNAME = "Admin"

ADMIN_PASSWORD_HASH = "scrypt:32768:8:1$v6AkcYUwl2jSpMMF$1118ca207202f4e557b96980a3f4106440c045f52d8ee9cb7881bceac790ffcf6cab14cb544953b54d8a6990a0fe88f55cd283bf090a7050172c5431be2c219c"

@app.route("/")
def home():
    return "LuxWatch backend is running!"


@app.route("/admin-login", methods=["POST"])
def admin_login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and check_password_hash(ADMIN_PASSWORD_HASH, password):

        session["admin_logged_in"] = True

        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid username or password"
    }), 401
@app.route("/admin-status", methods=["GET"])
def admin_status():

    if session.get("admin_logged_in"):
        return jsonify({
            "logged_in": True
        })

    return jsonify({
        "logged_in": False
    }), 401

@app.route("/admin-logout", methods=["POST"])
def admin_logout():

    session.clear()

    return jsonify({
        "success": True,
        "message": "Logged out successfully"
    })



if __name__ == "__main__":
    app.run(debug=True)