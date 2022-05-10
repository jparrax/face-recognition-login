from flask import Flask, Response, jsonify, request
import numpy as np
import cv2

# Get user supplied values
cascPath = "haarcascade_frontalface_default.xml"
# Create the haar cascade
faceCascade = cv2.CascadeClassifier(cascPath)


app = Flask(__name__)

@app.route("/authenticate", methods=['POST'])
def authenticate():

    face_image_bytes = request.files['face'].stream.read()
    nparr = np.fromstring(face_image_bytes, np.uint8)

    # # Read the image
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags = cv2.CASCADE_SCALE_IMAGE
    )

    return jsonify(data = f"Found {len(faces)} faces!")
