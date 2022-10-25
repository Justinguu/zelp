from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = TextAreaField('review', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    submit = SubmitField('Submit')
