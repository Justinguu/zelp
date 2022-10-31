from app.models import db, Review

def seed_reviews():
    
    review_1 = Review(
        user_id=1,
        business_id=1,
        review= "This is one of my favorite places. The decor was unique and incredible. I was happy to see how clean everything was. The experience was heavenly as I was served a meal fit for God himself. Try out the huge selection of incredible appetizers. ",
        avg_rating= 5
    )
    review_2 = Review(
        user_id=2,
        business_id=1,
        review= "I have been here several times before. The food was flavorful, savory, and succulent. The desserts must be sprinkled with crack because I just craved for more and more.",
        avg_rating= 4
    )
    review_3 = Review(
        user_id=3,
        business_id=1,
        review= "I had high hopes for this place. The waiter was mediocre at best. The ambiance gives off an earthy feel-good vibe. Might be back. Time will tell.",
        avg_rating= 3
    )
    review_4 = Review(
        user_id=4,
        business_id=1,
        review= "I was pleasantly surprised. The food is simply to die for. The waitress was prompt and polite. Everything I tried was bursting with flavor. ",
        avg_rating= 5
    )
    review_5 = Review(
        user_id=4,
        business_id=2,
        review= "I stumbled on this undiscovered gem right in our neighboorhood. The food is simply to die for. The waiter did an excellent job. Everything I tried was bursting with flavor. ",
        avg_rating= 5
    )
    review_6 = Review(
        user_id=3,
        business_id=2,
        review= "The decor was unique and incredible. I'm definitely coming back for more! Would Recommend",
        avg_rating= 5
    )
    review_7 = Review(
        user_id=2,
        business_id=2,
        review= "My taste buds are still dancing from our last visit! Make sure to save room for dessert, because that was the best part of the meal!",
        avg_rating= 5
    )
    review_8 = Review(
        user_id=1,
        business_id=3,
        review= "I was knocked into a food coma. The waitress did an excellent job. Easily earned their 5 stars!",
        avg_rating= 5
    )
    review_9 = Review(
        user_id=4,
        business_id=3,
        review= " The photos of the food were appetizing and palpable, but didn't live up to the hype. Satisfactory experience, will come again.",
        avg_rating= 3
    )
    review_10 = Review(
        user_id=4,
        business_id=3,
        review= "Yummers! The decor was unique and incredible. Everything was just so yummy. After my meal",
        avg_rating= 5
    )
    review_11 = Review(
        user_id=5,
        business_id=3,
        review= "Yummers! The decor was unique and incredible. Everything was just so yummy. After my meal",
        avg_rating= 5
    )
    review_12 = Review(
        user_id=5,
        business_id=3,
        review= "Yummers! The decor was unique and incredible. Everything was just so yummy. After my meal",
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