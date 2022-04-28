# Folder Structure Conventions


- Backend              ~ Root Folder of the Project
- config               ~ Environment configuration file in this folder
- services             ~ ODM Library for MongoDB - mongoose service file in this folder
- controllers          ~ This folder stores three different controllers for User, Post, and Comment
- models               ~ This folder stores three different models for User, Post, and Comment
- index.js             ~ This file handles the Startup of the Application
- routes.config.js     ~ This file handles the routing function of all controllers of the Application
- package.json         ~ This is a main file of the project. It stores metadata, attributes, and dependencies of the Application
- Dockerfile           ~ A file contains all required commands to assemble an image
- docker-compose.yml   ~ A YAML file to configure multiple services of the Application.

# INSTRUCTIONS

> This Application is set to runon port: 3600

> APIEndpoint of this Application is ~ http://localhost:3600

> For the API Documentation I've implemented Swagger. Link for API Docs ~ http://localhost:3600/api-docs/

> DATABASE AND API SERVICES ARE RUNNING IN THE DOCKER CONTAINERS.

> THEREFORE, TO START THIS PROJECT WE JUST NEED TO RUN THE FOLLOWING COMMAND IN ./Backend DIRECTORY ~ 
           
           $ docker-compose up --build