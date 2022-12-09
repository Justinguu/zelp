# from app.models import db, Category


# # Adds a demo user, you can add other users here if you want
# def seed_categories():
#     American = Category(type='American')
#     Mexican = Category(type='Mexican')
#     Korean = Category(type='Korean')
#     Italian = Category(type='Italian')
#     African = Category(type='African')
#     Japanese = Category(type='Japanese')
#     Chinese = Category(type='Chinese')
#     Desert = Category(type='Desert')

#     db.session.add(American)
#     db.session.add(Mexican)
#     db.session.add(Korean)
#     db.session.add(Italian)
#     db.session.add(African)
#     db.session.add(Japanese)
#     db.session.add(Chinese)
#     db.session.add(Desert)

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and RESET IDENTITY
# # resets the auto incrementing primary key, CASCADE deletes any
# # dependent entities
# def undo_categories():
#     db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
#     db.session.commit()