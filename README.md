# Task App 
##### Task App is a simple app to manange tasks it`s built in React and Firebase 


[![React](https://cdn.iconscout.com/icon/free/png-256/react-2752089-2284906.png)](https://ibb.co/3fW2RyQ)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Screenshots
![Alt text](https://i.ibb.co/gtkspXX/home.png "Landing Page")
![Alt text](https://i.ibb.co/mB7L7CM/2022-09-12-22-37.png "Tasks Page")

## Features
- Authantication login and signup 
- Create New Task (title , description , priority and due date fields )
- update (title , description , priority and due date fields )
- read single task 
- delete Task
- Filter Data By Task Title , Due Date of Task , Priority of task and Status of Task
- Private Routes only logedin user can access 

Task App is a simple app to manange tasks its built in React and Firebase 
## Tech

- [ReactJS](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Sass](https://sass-lang.com/)
- [Tailwind](https://tailwindcss.com/)
- [Formik](https://formik.org/)
- [Yup](https://www.npmjs.com/package/yup)
- [React-Datepicker](https://www.npmjs.com/package/react-datepicker) 
- [React-toastify](https://www.npmjs.com/package/react-toastify)

## Folder Structure 

└── Taskapp/
    ├── build
    ├── public
    └── src/
        ├── Apis/
        │   └── Firebase-config
        ├── Assets/
        │   ├── icons
        │   ├── images
        │   └── styles
        ├── components/
        │   ├── AddTask
        │   ├── FilterBar
        │   ├── Navbar
        │   ├── SwitchBtn
        │   └── TaskCard
        ├── context/
        │   ├── actions
        │   └── reducers
        ├── pages/
        │   ├── Landing
        │   ├── Home 
        │   ├── Login
        │   ├── Signup
        │   ├── EditTask
        │   └── NotFound
        └── Routes/
            ├── PrivateRoute.js
            └── PublicRoute.js

## Installation

Taskapp requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
cd app-folder
npm install
npm start
```

For Generate Build folder:

```sh
npm run build 
```

## License

MIT
