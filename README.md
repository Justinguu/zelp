Welcome to the zelp!

zelp Project is a clone of Flickr that is centered around sharing images and looking at images relatable to you. Users can browse images to find inspiration for themselves or to use images for personal projects.

Link to test out website: https://app-zelp.herokuapp.com/

Tech Stack
Frontend:

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Express.js](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

SQLAlchemy
## How to run Zelp Locally

* Clone/download the repo https://github.com/Justinguu/zelp

* cd into zelp folder and ``` run pipenv install ```

* Open two terminal paths for both zelp and react-app.
* Under zelp ``` run pipenv shell  then flask run, for react-app run npm install```
* Create a .env file under the root of the backend folder with the following contents:

  ``` REACT_APP_BASE_URL=http://localhost:5000 ```


## Getting started
Clone the repository then install dependencies

using ```pipenv install -r requirements.txt ```
Create a .env file based on the example with proper settings for your development environment


 ``` Get into your pipenv run pipenv shell,flask db upgrade, flask seed all, flask run```



# Environment Info
```
DATABASE_URL=sqlite:///dev.db
FLASK_DEBUG=True
SECRET_KEY=«generate_strong_secret_here» 
```

``` 
Inside react-app create another .env and add     REACT_APP_BASE_URL=http://localhost:5000 

```

## HomePage 

![HomePage](https://user-images.githubusercontent.com/99216902/200045958-a93c3e85-f660-4bc6-9e9a-8aab5b34bed0.png)

* HomePage displays the picture of the esturants and a brief description but you need to be logged in to display price and extra details.

## Detail's Page


![DetailsPage](https://user-images.githubusercontent.com/99216902/200046132-6c74663f-4800-4c86-88b2-cd13d6c3ab6d.png)

* After resturant owner has created a business their price will be converted into $$$ signs for other users to view.

![Reviews](https://user-images.githubusercontent.com/99216902/200046370-e508c81c-c404-4315-85bd-a1e74ca917a5.png)

* I am most proud of the create review. Users can hover over the review, and click the star rating they thought about the resturant



