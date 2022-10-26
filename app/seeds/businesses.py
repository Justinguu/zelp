from app.models import db, Business


def seed_businesses():
    business_1 = Business(
        id = 1,
        owner_id= 1,
        business_name= "JustDaLoi",
        phone_number= 678,
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
    businesses=[business_1]
    for business in businesses:
        db.session.add(business)
        db.session.commit()



    
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
