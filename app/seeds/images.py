from app.models import Image, db

def seed_images():
    image_1 = Image(owner_id=1, business_id=1, imageUrl="https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80", description="This is a description")
    image_2 = Image(owner_id=1, business_id=1, imageUrl="https://images.unsplash.com/photo-1620296595801-3cd364a12807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1523&q=80", description="This is a description")
    image_3 = Image(owner_id=1, business_id=1, imageUrl="https://images.unsplash.com/photo-1616864765695-fc15e791440c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", description="This is a description")


    images = [image_1, image_2, image_3]
    for image in images:
        db.session.add(image)
        db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()