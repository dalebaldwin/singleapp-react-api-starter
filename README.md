# Single APP - React + API starter template
A simple Node Express API starter template showing how to role out an api and a react app in a single application

## Getting Started

`Yarn` or `npm install` in both the react-app and server folders.

`build-frontend` Will build the React Application from the projects server folder

`yarn` or `npm start` will spin up the node.js server from the projects server folder

`yarn start-prod-test` or `npm run start-prod-test` will build the front end and then run the node.js server

`yarn start-nodemon` or `npm run start-nodemon` will start the nodejs server with dev environment settings using nodemon (make sure to install this first)

### What is this for?
I built this as an example or a simple template to show how you can develop a single application using Create React App with a  node.js/express api and then deploy it as a single node instance to your choice of server environment. 

### Inspiration
This was originally designed as a simple way to get applications up and running quickly inside an Azure App Service. I wanted to be able to handle auth across a single domain with Passport and get something up and running fast. 

The benefit of this is you end up with a single application in production without the need to handle auth on both the front end and backend individually.

### What's going on underneath the hood.
We have a Create React App folder and a Server folder for node.js/express. In development you need to spin up both applications on individual ports, I've also added in extra start commands for nodemon if you want to use node.js in development with live reload.

The Create React App has been configured to start on port 3001 instead of it's traditional port 3000 and proxies requests to http://localhost:3000. The node application will start on port 3000.

For deploy to production you just need to run the start command and the front end build process is automatically started followed by node booting up. Express then statically serves your react application.

### Dependencies Involved
* Create React App
* Express
* Babel
* Axios
* Passport
* Mongo DB

### Setting up Passport
Passport is pre-configured to use github auth, but you can change this to suit your needs easily enough. There are example paths for login screens, logout, error and api endpoints. Check out the documentation for passports github strategy for more info.

http://www.passportjs.org/packages/passport-github2/

### Mongo DB
I've got a simple mongodb connection working with the MongoDB Atlas service, you can setup your own free server for testing.

https://www.mongodb.com/cloud/atlas

I'm using an express mongo db wrapper linked below to simplify the connection and pass the db connector through the express req

https://github.com/floatdrop/express-mongo-db 

