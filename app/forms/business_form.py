from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired


   

class BusinessForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    business_name = StringField('name', validators=[DataRequired()])
    phone_number = StringField('phone_number', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    avgRating = FloatField('avgRating', validators=[DataRequired()])
    submit = SubmitField('Submit')