from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class BusinessImageForm(FlaskForm):
    owner_id = StringField('owner_id', validators=[DataRequired()])
    business_id = StringField('business_id', validators=[DataRequired()])
    imageUrl = StringField('ImageUrl', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')
