
from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Business, Review,User,Image
from app.forms.business_form import BusinessForm
from app.forms.review_form import ReviewForm
from app.forms.business_image_form import BusinessImageForm
# from app.api.aws_routes import (upload_file_to_s3,allowed_file, get_unique_filename)


business_routes = Blueprint('businesses', __name__)




#get all businesses
@business_routes.route('/', methods=['GET'])
def get_all_businesses():
    businesses = Business.query.all()
    return {"businesses": [business.to_dict() for business in businesses]}


# get one business
@business_routes.route('/<int:id>',methods=['GET'])
def one_business(id):
    business = Business.query.get(id)
    if not business:
        return {'errors': ['Business not found']}, 404
    return business.to_dict()

# create a new business if you are logged in user


# create a new business if you are logged in user and current user


@business_routes.route("/new", methods=['POST'])
# @login_required
def new_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business(
            owner_id = form.data['owner_id'],
            business_name=form.data['business_name'],
            category = form.data['category'],
            phone_number=form.data['phone_number'],
            email = form.data['email'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            zip_code=form.data['zip_code'],
            description=form.data['description'],
            price=form.data['price'],
            preview_image=form.data['preview_image'],
        )


        db.session.add(business)
        db.session.commit()
        return business.to_dict()
    if form.errors:
       return {'errors': validation_errors_to_error_messages(form.errors)}, 401
       






@business_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_business(id):
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = db.session.query(Business).get(id)
        business.owner_id=form.data['owner_id']
        business.business_name=form.data['business_name']
        business.category=form.data['category']
        business.phone_number=form.data['phone_number']
        business.email = form.data['email']
        business.address=form.data['address']
        business.city=form.data['city']
        business.state=form.data['state']
        business.country=form.data['country']
        business.zip_code=form.data['zip_code']
        business.description=form.data['description']
        business.price=form.data['price']
        business.preview_image=form.data['preview_image']
        db.session.commit()
        return business.to_dict()
        # return form.data
    if form.errors:
        return form.data
   

    # delete a business
# delete an existing business if you are the owner
@business_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return {
        "message": "Business has been deleted",
        "statusCode": 200
    }

# ----------------------Images Routes----------------------
# get all images by businessId      
@business_routes.route('/<int:businessId>/images', methods=['GET'])
def get_all_images(businessId):
    images = Image.query.filter_by(business_id = businessId).all()
    if images == None:
        return {'errors': ['Images not found']}, 404
    return {"images": [image.to_dict() for image in images]}

# Post a new image to a business by businessId if they are the owner_id
@business_routes.route('/<int:businessId>/images/new', methods=['POST'])
@login_required
def add_business_image(businessId):
    form = BusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = Image(
            owner_id = form.data['owner_id'],
            business_id = form.data['business_id'],
            imageUrl=form.data['imageUrl'],
            description=form.data['description'],
        )

        db.session.add(image)
        db.session.commit()
        return(image.to_dict())
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # from a businessId delete one image by id
@business_routes.route('/<int:businessId>/images/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_image(businessId,id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return {
        "message": "Image has been deleted",
        "statusCode": 200
    }



# ----------------------aws Routes----------------------

# @business_routes.route('/images/new', methods=['POST'])
# @login_required
# def upload_image():
#     if "imageUrl" not in request.files:
#         return {"errors": "image required"}, 400
#         # return request.files, 400

#     imageUrl = request.files["imageUrl"]

#     if not allowed_file(imageUrl.filename):
#         return {"errors": "file type not permitted"}, 400
    
#     imageUrl.filename = get_unique_filename(imageUrl.filename)

#     upload = upload_file_to_s3(imageUrl)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400

#     imageUrl_aws = upload["url"]
#     # flask_login allows us to get the current user from the request
#     form = BusinessImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         image = Image(
#             owner_id = form.data['owner_id'],
#             business_id = form.data['business_id'],
#             imageUrl=imageUrl_aws,
#             description=form.data['description'],
#         )

#         db.session.add(image)
#         db.session.commit()
#         return(image.to_dict())
#     if form.errors:
#          return {'errors': validation_errors_to_error_messages(form.errors)}, 401
   



#------------------------------------Review Routes--------------------------------------------
 # get curr review
@business_routes.route('/<int:businessId>/reviews', methods=['GET'])
@login_required
def get_review_by_businessId(businessId):
    reviews = Review.query.filter(businessId == businessId).all()
    if reviews == None:
        return "business has no reviews"
    return {"reviews": [review.to_dict() for review in reviews]}



# create a new review
@business_routes.route('/<int:business_id>/reviews/new', methods=['POST'])
@login_required
def new_review(business_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('fewfwefefwefwfewfwfwe')
    print(form.data)
    if form.validate_on_submit():
        review = Review(
            user_id = form.data['user_id'],
            business_id=form.data['business_id'],
            review=form.data['review'],
            avg_rating=form.data['avg_rating'],
        )

        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    # edit a review if you have the same user_id as the one who created the review
@business_routes.route('/<int:business_id>/reviews/<int:id>/edit', methods=['PUT'])
@login_required
def edit_review(business_id, id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        review.user_id == form.data['user_id']
        review.review = form.data['review']
        review.avg_rating = form.data['avg_rating']
        db.session.commit()
        return review.to_dict()
        # else:
        #     return {'errors': ['You are not authorized to edit this review']}, 401
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



    # delete a review
@business_routes.route('/<int:businessId>/reviews/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(businessId,id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {
        "message": "Review has been deleted",
        "statusCode": 200
    }
    
    
