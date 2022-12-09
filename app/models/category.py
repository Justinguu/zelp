# from .db import db

# class Category(db.Model):
#     __tablename__ = "categories"

#     id = db.Column(db.Integer, primary_key=True)
#     business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
#     type = db.Column(db.String, nullable=False)


#     business = db.relationship("Business", backref="category")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "business_id": self.business_id,
#             "type": self.type,
#             "businesses": [business.to_dict() for business in self.business]
#         }