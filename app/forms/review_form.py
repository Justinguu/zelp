from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    business_id = IntegerField('business_id', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])
    avg_rating = IntegerField('avg_rating', validators=[DataRequired()])
    submit = SubmitField('Submit')
