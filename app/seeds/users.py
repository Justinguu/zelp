from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="lition", username="Demolition", email="demo@aa.io", password="password", profileImage="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55737/grinning-face-with-big-eyes-emoji-clipart-xl.png")
    marnie = User(
        first_name="marnie", last_name="lition", username="marnielition", email="marnie@aa.io", password="password", profileImage="https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png")
    bobbie = User(
        first_name="bob", last_name="lition", username="boblition", email="bob@aa.io", password="password", profileImage="https://cdn-icons-png.flaticon.com/512/16/16363.png")
    sam = User(
        first_name="sam", last_name="duong", username="samduong", email="samduong@aa.io", password="password", profileImage="https://cdn-icons-png.flaticon.com/512/16/16363.png")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sam)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
