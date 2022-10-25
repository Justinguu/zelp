from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Business, Review, Image, User


business_routes = Blueprint('businesses', __name__)

@business_routes.route('/<int:id>')
@login_required
def get_business(id):
     business = Business.query.get(id)
     if business == None:
        return "business is not available"
     return business.to_dict()