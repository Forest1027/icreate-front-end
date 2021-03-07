# Introduction
ICreate project is an article management system using React to build its front-end. It allows users to store and manage their articles. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Functions
This project covers functions shown below:
- Sign up
- Login
- Log out
- View all articles
- Create articles
- Edit articles
- Delete articles

# Technology
- React
- Redux
- Material UI
- Axios
- CKEditor
- Firebase (used as back-end)

# Structure
Here is the project's structure and what each folder contains.
- containers
    - JS classes that manages complex stateful logic
- components
    - Reusable JS components that manages UI
- assets
    - Image files
- hoc
    - Higher-order components like error handler
- shared
    - Common methods that can used in different places
- store
    - Actions and reducers for redux

# How to use
1. git clone the project to your local
2. npm install the dependency
3. create a .env file in the project's root directory and define "REACT_APP_FIREBASE_API_KEY" using firebase key
    - REACT_APP_FIREBASE_API_KEY=[your_firebase_key]
4. run npm start to run the project