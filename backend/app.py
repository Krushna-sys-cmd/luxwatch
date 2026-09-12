import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()

from auth import admin_login, admin_status, admin_logout
from uploads import upload_watch_image




app = Flask(__name__)

app.secret_key = os.getenv("FLASK_SECRET_KEY")


CORS(
    app,
    supports_credentials=True,
    origins=["http://127.0.0.1:5500"]
)


app.route("/")(lambda: "LuxWatch backend is running!")

app.route("/admin-login", methods=["POST"])(admin_login)

app.route("/admin-status", methods=["GET"])(admin_status)

app.route("/admin-logout", methods=["POST"])(admin_logout)

app.route("/upload-watch-image", methods=["POST"])(upload_watch_image)


if __name__ == "__main__":
    app.run(debug=True)