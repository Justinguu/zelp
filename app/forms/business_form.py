from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired


   

class BusinessForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    business_name = StringField('name', validators=[DataRequired()])
    phone_number = IntegerField('phone_number', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    preview_image = StringField('preview_image', validators=[DataRequired()])
    submit = SubmitField('Submit')