
from .db import db
from datetime import datetime


class Business(db.Model):
    __tablename__ = 'businesses'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(60), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text(500), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    avgRating = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)




review = db.relationship('Review', backref='business', cascade="all, delete")
images = db.relationship('Image', backref='business')

def to_dict(self):
    return {
        "id": self.id,
        "owner_id": self.owner_id,
        "name": self.name,
        "phone_number": self.phone_number,
        "address": self.address,
        "city": self.city,
        "state": self.state,
        "country": self.country,
        "lat": self.lat,
        "lng": self.lng,
        "description": self.description,
        "price": self.price,
        "avgRating": self.avgRating,
        "created_at": self.created_at,
        "updated_at": self.updated_at,
    }