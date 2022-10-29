from app.models import db, Business


def seed_businesses():
    business_1 = Business(
        owner_id= 1,
        business_name= "JustDaLoi",
        phone_number= "1112223333",
        email= "justinspho@gmail.com",
        address= "321 Pho Park Avenue",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 44444,
        description= "Best pho in the country",
        price = 10,
        preview_image="https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=831&q=80"
    )
    business_2 = Business(
        owner_id= 2,
        business_name= "Iron Age Korean Steak House",
        phone_number= "6789745075",
        email= "IronageCore.com",
        address= "5600 Roswell Rd F290",
        city = "Sandy Springs",
        state = "Georgia",
        country = "United States",
        zip_code = 30342,
        description= "Korean BBQ 24/7 Open ",
        price = 35,
        preview_image="https://s3-media0.fl.yelpcdn.com/bphoto/tNTZ5_Lnt3UcPafqmJ2aRQ/o.jpg"

    )
    business_3 = Business(
        owner_id= 3,
        business_name= "Budi's Sushi",
        phone_number= "4049074500",
        email= "Budissushi@gmail.com",
        address= "349 Decatur St SE",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 30312,
        description= "Next level sushi in your area",
        price = 18,
        preview_image="https://s3-media0.fl.yelpcdn.com/bphoto/2F4ibCZaFL9_kRXQIO6Tfg/o.jpg"

    )

    business_4= Business(
        owner_id= 4,
        business_name= "Fresh Bowl",
        phone_number= "67832282222",
        email= "FreshBowl@gmail.com",
        address= "31812 N Brown Rd Ste",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 30324,
        description= "Challenge your spice level with thai spice",
        price = 17,
        preview_image="https://s3-media0.fl.yelpcdn.com/bphoto/zBTQy6FK0JntcIqa-_7njw/o.jpg"

    )


    
    businesses=[business_1,business_2,business_3,business_4]
    for business in businesses:
        db.session.add(business)
        db.session.commit()



    
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
