from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)




    def to_dict(self):
        return {
        "id": self.id,
        "business_id": self.business_id,
        "url": self.url
        }









