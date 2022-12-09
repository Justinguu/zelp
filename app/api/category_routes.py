# from flask import Blueprint, jsonify, request

# from app.models import db, Category



# category_routes = Blueprint("categories", __name__)

# @category_routes.route("/all")
# def get_all_categories():
#     allTheCategories = Category.query.all()
#     categories = {category.id: category.to_dict() for category in allTheCategories}
#     return categories