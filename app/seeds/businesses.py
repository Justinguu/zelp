from app.models import db, Business


def seed_businesses():
    business_1 = Business(
        owner_id= 1,
        business_name= "Kamakaze",
        category = "Japanese",
        phone_number= "111-222-3333",
        email= "Kamakaze@gmail.com",
        address= "321 Pho Park Avenue",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 44444,
        description= "Kamakaze Ramen is Japanese wonder in Mid-town. Specialize in Creamy Chicken broth. All made from scratch and Noodle special order from Japanese. It is Best Tori Paitan ramen in the state.Enjoy!",
        price = "$",
        preview_image="https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=831&q=80"
    )
    business_2 = Business(
        owner_id= 2,
        business_name= "GenMeat",
        category = "Korean",
        phone_number= "678-974-5075",
        email= "GenMeat@.com",
        address= "5600 Roswell Rd F290",
        city = "Sandy Springs",
        state = "Georgia",
        country = "United States",
        zip_code = 30342,
        description= "GenMeat has been delivering happiness to our customers through the food and dining experience. We believe that as human beings the simple and basic act of dining together can build the strongest bonds.",
        price = "$$",
        preview_image="https://images.squarespace-cdn.com/content/v1/5a317985b1ffb6d925d978cf/1563559230678-Z1P5GSSCFTNX3JJ2N9EV/DSCF7368.jpg?format=2500w"

    )
    business_3 = Business(
        owner_id= 3,
        business_name= "Budi's Sushi",
        category = "Japanese",
        phone_number= "404-907-4500",
        email= "Budissushi@gmail.com",
        address= "349 Decatur St SE",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 30312,
        description= "Next level sushi in your area with all the flavors you could imagine! Our chefs have perfected the art of all sushi including Rolls, Nigri, Sashimi and more! We have it all!, Don't think about it, Run!",
        price = "$$",
        preview_image="https://s3-media0.fl.yelpcdn.com/bphoto/2F4ibCZaFL9_kRXQIO6Tfg/o.jpg"

    )

    business_4= Business(
        owner_id= 4,
        business_name= "Fresh Bowl",
        category = "American",
        phone_number= "678-322-8222",
        email= "FreshBowl@gmail.com",
        address= "31812 N Brown Rd Ste",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 30314,
        description= "FreshBowl is an upscale, casual restaurant where food, drink and lounge meet, pleasing taste buds from around the world with award winning dishes and specialty cocktails since 2007.",
        price = "$$",
        preview_image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

    )

    business_5= Business(
        owner_id= 5,
        business_name= "Alma Cocina",
        category = "Mexican",
        phone_number= "678-999-1212",
        email= "AlmaCocina@gmail.com",
        address= "4182 N Tread Ste",
        city = "Atlanta",
        state = "Georgia",
        country = "United States",
        zip_code = 30324,
        description= "At Alma Cocina! A Downtown Atlanta eatery serving delicious Mexican fare in a delightful atmosphere created from artisan-crafted decor, several principles inspire everything we do. The first: We're in love with food.",
        price = "$$",
        preview_image="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/zjycusrw/270a41d6-0212-4afd-950c-710f89f38260.jpg"
     )
    
    business_6 = Business(
        owner_id= 6,
        business_name= "Nonis",
        category = "Italian",
        phone_number= "672-999-1212",
        email= "Nonis@gmail.com",
        address= "4182 N Sweet Rd",
        city = "Downville",
        state = "Georgia",
        country = "United States",
        zip_code = 30324,
        description= "We make everything from scratch, from the mozzarella in our obnoxiously big sandwiches to the bolognese in our lasagna.",
        price = "$$$",
        preview_image="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
    )

    business_7 = Business(
        owner_id= 7,
        business_name= "The Lawrence",
        category = "American",
        phone_number= "672-943-5512",
        email= "Lawrence@gmail.com",
        address= "4182 Mooville lane",
        city = "Lawrenceville",
        state = "Georgia",
        country = "United States",
        zip_code = 30354,
        description= "Our food menu rotates poultry to get the freshest ingredients in town, pair it with our Granacha Blend Sangria",
        price = "$$$",
        preview_image="https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
    )

    business_8 = Business(
        owner_id= 8,
        business_name= "Four Fat Cows",
        category = "Desert",
        phone_number= "672-943-1212",
        email= "FatCows@gmail.com",
        address= "4182 Memory Sweet lane",
        city = "Alpharetta",
        state = "Georgia",
        country = "United States",
        zip_code = 30324,
        description= "We started this place to keep peoples smiles alive, and to experiment with a multitude of flavors that everyone will love",
        price = "$",
        preview_image="https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=444&q=80"
    )

        



    
    businesses=[business_1,business_2,business_3,business_4,business_5,business_6,business_7,business_8]
    for business in businesses:
        db.session.add(business)
        db.session.commit()



    
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
