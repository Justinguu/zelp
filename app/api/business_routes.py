from gettext import lngettext
from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Business, Review,User,Image
from app.forms.business_form import BusinessForm


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

# create a new business
@business_routes.route('/new', methods=['POST'])
# @login_required
def new_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business(
            owner_id = form.data['owner_id'],
            business_name=form.data['business_name'],
            phone_number=form.data['phone_number'],
            email = form.data['email'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            zip_code=form.data['zip_code'],
            description=form.data['description'],
            price=form.data['price'],
            avgRating=2,
        )

        db.session.add(business)
        db.session.commit()
        return(business.to_dict())
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        
    

# #get all images for the business by business id
# @business_routes.route('/<int:id>/images')
# def business_images(id):
#     images = Image.query.filter(Image.business_id == id).all()
#     return {"images": [image.to_dict() for image in images]}

# edit an existing business
@business_routes.route('/<int:id>/edit', methods=['PUT'])
# @login_required
def edit_business(id):
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business.query.get(id)
       
        business.owner_id = form.data['owner_id'],
        business.business_name=form.data['business_name'],
        business.phone_number=form.data['phone_number'],
        business.email = form.data['email'],
        business.address=form.data['address'],
        business.city=form.data['city'],
        business.state=form.data['state'],
        business.country=form.data['country'],
        business.lat=form.data['lat'],
        business.lng=form.data['lng'],
        business.zip_code=form.data['zip_code'],
        business.description=form.data['description'],
        business.price=form.data['price'],
        business.avgRating = form.data['avgRating']
        db.session.commit()
        return(business.to_dict())
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        
# delete an existing business if you are the owner
@business_routes.route('/<int:id>/delete', methods=['DELETE'])
# @login_required
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return {
        "message": "Business has been deleted",
        "statusCode": 200
    }

