from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class BusinessImageForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    business_id = IntegerField('business_id', validators=[DataRequired()])
    imageUrl = StringField('ImageUrl', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')
