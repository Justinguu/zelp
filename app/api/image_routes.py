

from flask import Blueprint, jsonify, render_template
from flask_login import login_required
from app.models import Image, db
from app.api.auth_routes import validation_errors_to_error_messages

image_routes = Blueprint('images', __name__)


@image_routes.route('/all')
@login_required
def get_all_images():
    allTheImages = Image.query.all()
    images = {image.id: image.to_dict() for image in allTheImages}
    return images

