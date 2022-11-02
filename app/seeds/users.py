from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="lition", username="Demolition", email="demo@aa.io", password="password", profileImage="https://cdn-icons-png.flaticon.com/512/2395/2395608.png")
    marnie = User(
        first_name="Duke", last_name="lition", username="dukelition", email="duke@aa.io", password="password", profileImage="https://www.kindpng.com/picc/m/353-3534825_cool-profile-avatar-picture-cool-profile-hd-png.png")
    bobbie = User(
        first_name="Bob", last_name="lition", username="boblition", email="bob@aa.io", password="password", profileImage="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png")
    sam = User(
        first_name="Sam", last_name="duong", username="samduong", email="samduong@aa.io", password="password", profileImage="https://cdn-icons-png.flaticon.com/512/16/16363.png")
    justin = User(
         first_name="Justin", last_name="Po", username="justinpo", email="justinpo@aa.io", password="password", profileImage="https://2.bp.blogspot.com/-yGbKkiJUex4/W56WQvF4xEI/AAAAAAAAP0Q/EXKcTReq6fofYIKlQTUC_DsWbpTJ2Ng-ACLcBGAs/s400/steam%2Bprofile%2Bpicture%2B-steam%2Bavatar%2B%25289%2529.png"
    )
    kevin = User(
         first_name="Kevin", last_name="Lu", username="kevinlu", email="kevinlu@aa.io", password="password", profileImage="https://i.pinimg.com/originals/8b/5f/04/8b5f04525a528637c52dc12298e9e8e3.png"
    )
    David = User(
         first_name="David", last_name="Kim", username="davidkim", email="davidkim@aa.io", password="password", profileImage="https://s11.favim.com/orig/7/761/7616/76164/cartoon-icons-naruto-shippuden-anime-icons-Favim.com-7616408.jpg"
    )
    Brian = User(
         first_name="Brian", last_name="Mo", username="brianmo", email="brianmo@aa.io", password="password", profileImage="https://wallpapercave.com/wp/wp6110921.jpg"
    )
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sam)
    db.session.add(justin)
    db.session.add(kevin)
    db.session.add(David)
    db.session.add(Brian)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
