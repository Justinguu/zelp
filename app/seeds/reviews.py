from app.models import db, Review

def seed_reviews():
    
    review_1 = Review(
        user_id=1,
        business_id=1,
        review= "Cant wait to come here again",
        avg_rating= 5
    )
    review_2 = Review(
        user_id=2,
        business_id=1,
        review= "The smell when i walked in was amazing!",
        avg_rating= 4
    )
    review_3 = Review(
        user_id=3,
        business_id=1,
        review= "It was too spicy!!!",
        avg_rating= 3
    )
    review_4 = Review(
        user_id=4,
        business_id=1,
        review= "Wow can't beat the quality here!",
        avg_rating= 5
    )
    review_5 = Review(
        user_id=5,
        business_id=2,
        review= "Feel like i'm going to explode too much food!",
        avg_rating= 5
    )
    review_6 = Review(
        user_id=6,
        business_id=2,
        review= "Unlimited beef, chicken,pork, and seafood? Count me in!!",
        avg_rating= 5
    )
    review_7 = Review(
        user_id=7,
        business_id=2,
        review= "Had too wait on a list for over an hour!! How dare they!",
        avg_rating= 5
    )
    review_8 = Review(
        user_id=8,
        business_id=3,
        review= "The creativity of everything blew my mind!",
        avg_rating= 5
    )
    review_9 = Review(
        user_id=9,
        business_id=3,
        review= "Staff was friendly, but i couldn't get myself to like it",
        avg_rating= 3
    )
    review_10 = Review(
        user_id=10,
        business_id=3,
        review= "Better then my mom's cooking!!!",
        avg_rating= 5
    )


    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.add(review_7)
    db.session.add(review_8)
    db.session.add(review_9)
    db.session.add(review_10)

    
    
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()