
from unicodedata import category
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


   

class BusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    phone_number = StringField('phone_number', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    lat = IntegerField('lat', validators=[DataRequired()])
    lng = IntegerField('lng', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('rice', validators=[DataRequired()], choices = [(1, '$'), (2, '$$'), (3, '$$$'), (4, '$$$$')])
    submit = SubmitField('Submit')