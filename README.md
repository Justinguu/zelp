Welcome to the zelp!

zelp Project is a clone of Flickr that is centered around sharing images and looking at images relatable to you. Users can browse images to find inspiration for themselves or to use images for personal projects.

Link to test out website: https://app-zelp.herokuapp.com/

Tech Stack
Frontend:

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Express.js](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

SQLAlchemy
How to run zelp Locally
Clone/download the repo https://github.com/ChzFlvrHrse/zelp-Group.git

cd into zelp-group folder and run pipenv install

Open two terminal paths for both zelp and react-app.

Under zelp run pipenv shell then flask run, for react-app run npm install

Create a .env file under the root of the backend folder with the following contents:

REACT_APP_BASE_URL=http://localhost:5000

Getting started
Clone the repository then install dependencies

using pipenv install -r requirements.txt Create a .env file based on the example with proper settings for your development environment

Get into your pipenv run pipenv shell,flask db upgrade, flask seed all, flask run

Environment Info
DATABASE_URL=sqlite:///dev.db
FLASK_DEBUG=True
SECRET_KEY=«generate_strong_secret_here» 
Inside react-app create another .env and add     REACT_APP_BASE_URL=http://localhost:5000 
