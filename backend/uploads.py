import os
import uuid

from flask import request, jsonify, session
from werkzeug.utils import secure_filename


UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "assets"
)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}


def allowed_file(filename):

    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


def upload_watch_image():

    if not session.get("admin_logged_in"):
        return jsonify({
            "success": False,
            "message": "Unauthorized"
        }), 401

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "success": False,
            "message": "No image selected"
        }), 400

    if not allowed_file(image.filename):
        return jsonify({
            "success": False,
            "message": "Invalid image type"
        }), 400

    filename = secure_filename(image.filename)

    extension = filename.rsplit(".", 1)[1].lower()

    filename = f"{uuid.uuid4().hex}.{extension}"

    image.save(os.path.join(UPLOAD_FOLDER, filename))

    return jsonify({
        "success": True,
        "image": f"/assets/{filename}"
    })