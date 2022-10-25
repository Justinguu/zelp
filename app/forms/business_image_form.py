from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class BusinessImageForm(FlaskForm):
    url = StringField('Preview Image', validators=[DataRequired()])
    submit = SubmitField('Submit')
