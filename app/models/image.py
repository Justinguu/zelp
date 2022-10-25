from .db import db


class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    # business = db.relationship('Business', back_populates='images')


    def to_dict(self):
        return {
        "id": self.id,
        "business_id": self.business_id,
        "url": self.url
        }









