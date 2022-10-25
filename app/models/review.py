from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    review = db.Column(db.Text, nullable=False)
    avgRating = db.Column(db.Integer, nullable=False)
    profile_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    business = db.relationship('Business', back_populates='review')
    user = db.relationship('User', back_populates='review')
    images = db.relationship('Image', back_populates='reviews')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "review": self.review,
            "avgRating": self.avgRating,
            "profile_image": self.profile_image,
            "created_at": self.created_at,
            
        }