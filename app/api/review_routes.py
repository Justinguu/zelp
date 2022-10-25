
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
@review_routes.route('/<int:businessId>/reviews/', methods=['GET'])
def get_review_by_businessId(businessId):
    reviews = Review.query.filter(Review.businessId == businessId).all()
    return {"reviews": [review.to_dict() for review in reviews]}

# create a new review
@review_routes.route('/<int:businessId>/reviews/new', methods=['POST'])
@login_required
def new_review(businessId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id = form.data['user_id'],
            businessId=form.data['businessId'],
            review=form.data['review'],
            avg_rating=form.data['avg_rating'],
        )

        db.session.add(review)
        db.session.commit()
        return(review.to_dict())
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    # edit a review if you have the same user_id as the one who created the review
@review_routes.route('/<int:reviewId>/reviews/edit', methods=['PUT'])
@login_required
def edit_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(reviewId)
        if review.user_id == current_user.id:
            review.review = form.data['review']
            review.avg_rating = form.data['avg_rating']
            db.session.commit()
            return(review.to_dict())
        else:
            return {'errors': ['You are not authorized to edit this review']}, 401
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



    # delete a review
@review_routes.route('/<int:businessId>/reviews/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(businessId,id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {
        "message": "Review has been deleted",
        "statusCode": 200
    }
    
    
