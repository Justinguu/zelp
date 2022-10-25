
from flask import Blueprint,jsonify,request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Review
from app.forms.review_form import ReviewForm


review_routes = Blueprint('reviews', __name__)

# get all reviews in descending order and filter if user.id equals current_user.id
@review_routes.route('/', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}

# get a review by id
@review_routes.route('/<int:id>',methods=['GET'])
def one_review(id):
    review = Review.query.get(id)
    if not review:
        return {'errors': ['Review not found']}, 404
    return review.to_dict()

# create a new review
@review_routes.route('/new', methods=['POST'])
# @login_required
def new_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id = form.data['user_id'],
            business_id=form.data['business_id'],
            review=form.data['review'],
            avgRating=form.data['avgRating'],
        )

        db.session.add(review)
        db.session.commit()
        return(review.to_dict())
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    # edit a review
@review_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        review.user_id = form.data['user_id']
        review.business_id = form.data['business_id']
        review.review = form.data['review']
        review.avgRating = form.data['avgRating']
        db.session.commit()
        return review.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    # delete a review
@review_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {
        "message": "Review has been deleted",
        "statusCode": 200
    }
    
    
