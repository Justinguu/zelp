from app.models import Image, db

def seed_images():
    image_1 = Image(owner_id=1, business_id=1, imageUrl="https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80", description="Fancy Japanese Resturants")
    image_2 = Image(owner_id=1, business_id=1, imageUrl="https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=831&q=80", description="Ramen you'll find no where else")
    image_3 = Image(owner_id=1, business_id=1, imageUrl="https://images.unsplash.com/photo-1602273660127-a0000560a4c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80", description="For for all to share!")
    image_4 = Image(owner_id=2, business_id=2, imageUrl="https://images.squarespace-cdn.com/content/v1/5a317985b1ffb6d925d978cf/1563559230678-Z1P5GSSCFTNX3JJ2N9EV/DSCF7368.jpg?format=2500w", description="Food for families to share")
    image_5 = Image(owner_id=2, business_id=2, imageUrl="https://images.unsplash.com/photo-1548150914-c9f19106dbf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80", description="Porkbelly sliced up ready to eat")
    image_6 = Image(owner_id=2, business_id=2, imageUrl="https://images.unsplash.com/photo-1566705474094-5bf047ce2754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80", description="Family meals are the best meals")
    image_7 = Image(owner_id=3, business_id=3, imageUrl="https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80", description="Family meals are the best meals")
    image_8 = Image(owner_id=3, business_id=3, imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/2F4ibCZaFL9_kRXQIO6Tfg/o.jpg", description="Family meals are the best meals")
    image_9 = Image(owner_id=4, business_id=4, imageUrl="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", description="Family meals are the best meals")
    image_10 = Image(owner_id=4, business_id=4, imageUrl="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", description="Family meals are the best meals")
    image_11 = Image(owner_id=5, business_id=5, imageUrl="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/zjycusrw/270a41d6-0212-4afd-950c-710f89f38260.jpg", description="Family meals are the best meals")
    image_12 = Image(owner_id=5, business_id=5, imageUrl="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=960&q=80", description="Family meals are the best meals")
    image_13 = Image(owner_id=6, business_id=6, imageUrl="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80", description="Family meals are the best meals")
    image_14 = Image(owner_id=6, business_id=6, imageUrl="https://images.unsplash.com/photo-1506280754576-f6fa8a873550?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", description="Family meals are the best meals")
    image_15 = Image(owner_id=7, business_id=7, imageUrl="https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80", description="Family meals are the best meals")
    image_16 = Image(owner_id=7, business_id=7, imageUrl="https://images.unsplash.com/photo-1562457346-c1d10d9dee52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1656&q=80", description="Family meals are the best meals")
    images = [image_1, image_2, image_3, image_4,image_5,image_6,image_7,image_8,image_9,image_10,image_11,image_12,image_13,image_14,image_15,image_16]
    for image in images:
        db.session.add(image)
        db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()