from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(50), nullable=False)
    profile_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete")
    businesses = db.relationship('Business', back_populates='owner')
    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'profileImage': self.profile_image,
            'createdAt': self.created_at,
            'reviews': [review.to_dict() for review in self.reviews],
            'businesses': [business.to_dict() for business in self.businesses]
        }
