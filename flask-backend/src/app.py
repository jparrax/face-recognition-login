from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import face_recognition
import cv2

app = Flask(__name__)
CORS(app)

@app.route("/authenticate", methods=['POST'])
def authenticate():
    # Upload known face
    base_img = face_recognition.load_image_file("C:\\Users\\parraua\\Documents\\GitHub\\face-recognition-login\\flask-backend\\src\\assets\\images\\juan\\0.jpg")
    base_img = cv2.cvtColor(base_img, cv2.COLOR_BGR2RGB)
    encode_my_face = face_recognition.face_encodings(base_img)[0]
    # Get image from request
    sample_image_bytes = request.files['face'].stream.read()
    sample_image_np_array = np.fromstring(sample_image_bytes, np.uint8)
    sample_image = cv2.imdecode(sample_image_np_array, cv2.IMREAD_COLOR)
    sample_image = cv2.cvtColor(sample_image, cv2.COLOR_BGR2RGB)
    encode_sample_face = face_recognition.face_encodings(sample_image)[0]
    # Compare faces
    result = face_recognition.compare_faces([encode_my_face], encode_sample_face)
    return jsonify(data = str(result[0]))
