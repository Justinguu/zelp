from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = TextAreaField('review', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()], choices = [(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])
    submit = SubmitField('Submit')
