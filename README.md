# Puppy Image Generator

Imagine you’re new to the company and this is the first project you’ve been assigned. Due to COVID-19, morale has been down and the management team thinks it would help to have a website employees could access to help brighten their day. They’ve come up with the genius idea of allowing the employees to generate random dog and puppy pictures. A little research has shown that there is a public API that can achieve that exact goal. They’ve also found a starter template for a React project that they’ve been able to send you. Now it’s up to you to set up a proper integration between the two.

The provided template was bootstrapped with create-react-app. It already includes all the required dependencies (ex: Axios for API calls). The first thing you’ll need to do on downloading and opening the project is run _npm install_. The project contains a frontend that will automatically find an available port. It can be started with _npm run start_. It also has a backend that will run on port 8001. This can be started by running _nodemon server.js_.

You can find the documentation and endpoints for the Dog API at:
**https://dog.ceo/dog-api/documentation/**

The project has 3 main files that need to be completed:

- ./src/pages/generateImage.js
- ./src/pages/generateImageByBreed.js
- ./server.js

To avoid issues with CORS policies, the requests to the Dog API should be made from the backend, the responses then being passed over to the client side.

## generateImage.js

This page should generate a new random dog image every time the button is clicked. The button is already set to execute a function when clicked. This function should send a request to an endpoint on the server which will in turn fetch an image from the API. The server should then return the image back to the client-side function where it will be set as the source to an already existing HTML img element.

The HTML img element is, by default, hidden. Make sure your function makes it visible **after** an image is set.

## generateImageByBreed.js

This page should generate a new random dog image of the selected breed each time a new one is chosen. The HTML select element is already set to execute a function when a new option is selected.

When this page loads, the dynamic filling of the HTML select element’s options should be the very first thing to occur. A function should therefore send a request to the backend which will retrieve the list of breeds from the API.

When a new option is selected, another function should send the chosen breed to the backend, which will then get a random image for that breed from the API. The image should then be sent back to the client side and populate the source of the HTML img element.

The HTML img element is, by default, hidden. Make sure your function makes it visible **after** an image is set.

## server.js

This is where all the calls to the Dog API should take place. This file should be populated with endpoints that the frontend can access. Every endpoint needs to use the proper method (GET, POST, PATCH, etc.) and should return the proper data to the frontend. There should also be some form of error handling in the event of an incorrect request.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
