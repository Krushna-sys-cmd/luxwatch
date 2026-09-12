import os 

from dotenv import load_dotenv
from flask import request, jsonify, session
from werkzeug.security import check_password_hash


load_dotenv()



ADMIN_USERNAME = "Admin"

ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")


def admin_login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and check_password_hash(
        ADMIN_PASSWORD_HASH,
        password
    ):

        session["admin_logged_in"] = True

        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid username or password"
    }), 401


def admin_status():

    if session.get("admin_logged_in"):

        return jsonify({
            "logged_in": True
        })

    return jsonify({
        "logged_in": False
    }), 401


def admin_logout():

    session.clear()

    return jsonify({
        "success": True,
        "message": "Logged out successfully"
    })