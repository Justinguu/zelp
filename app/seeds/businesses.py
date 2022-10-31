from app.models import db, Business


def seed_businesses():
    business_1 = Business(
        owner_id= 1,
        business_name= "Kamakaze",
        phone_number= "1112223333",
        email= "Kamakaze@gmail.com",
        address= "321 Pho Park Avenue",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 44444,
        description= "Kamakaze Ramen is Japanese wonder in Mid-town. Specialize in Creamy Chicken broth. All made from scratch and Noodle special order from Japanese. It is Best Tori Paitan ramen in the state.Enjoy!",
        price = 13,
        preview_image="https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=831&q=80"
    )
    business_2 = Business(
        owner_id= 2,
        business_name= "GenMeat",
        phone_number= "6789745075",
        email= "GenMeat@.com",
        address= "5600 Roswell Rd F290",
        city = "Sandy Springs",
        state = "Georgia",
        country = "United States",
        zip_code = 30342,
        description= "GenMeat has been delivering happiness to our customers through the food and dining experience. We believe that as human beings the simple and basic act of dining together can build the strongest bonds.",
        price = 35,
        preview_image="https://images.squarespace-cdn.com/content/v1/5a317985b1ffb6d925d978cf/1563559230678-Z1P5GSSCFTNX3JJ2N9EV/DSCF7368.jpg?format=2500w"

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
        price = 21,
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
        zip_code = 30314,
        description= "FreshBowl is an upscale, casual restaurant where food, drink and lounge meet, pleasing taste buds from around the world with award winning dishes and specialty cocktails since 2007.",
        price = 20,
        preview_image="https://s3-media0.fl.yelpcdn.com/bphoto/dmArpYhwoj6QIe5LOfxV-g/o.jpg"

    )

    business_5= Business(
        owner_id= 5,
        business_name= "Alma Cocina",
        phone_number= "6789991212",
        email= "AlmaCocina@gmail.com",
        address= "4182 N Tread Ste",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 30324,
        description= "At Alma Cocina! A Downtown Atlanta eatery serving delicious Mexican fare in a delightful atmosphere created from artisan-crafted decor, several principles inspire everything we do. The first: We're in love with food.",
        price = 25,
        preview_image="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/zjycusrw/270a41d6-0212-4afd-950c-710f89f38260.jpg"
     )



    
    businesses=[business_1,business_2,business_3,business_4,business_5]
    for business in businesses:
        db.session.add(business)
        db.session.commit()



    
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
