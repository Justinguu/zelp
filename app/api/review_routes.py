
from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Review
from app.forms.review_form import ReviewForm


review_routes = Blueprint('reviews', __name__)

# get all reviews
@review_routes.route('/', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}

# get a review by businessId


