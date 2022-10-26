from app.models import db, Review

def seed_reviews():
    
    Kanye = Review(
        user_id=1,
        business_id=1,
        review= "Cant wait to come here again",
        avg_rating= 5

    )

    db.session.add(Kanye)
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()