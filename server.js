var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var axios = require("axios");

// Created some helper functions to call the
// api's and do some error checking and keep the code clean
const {
  randomDogApiCall,
  getAllDogBreeds,
  getSelectedBreed,
} = require("./helperfunctions");

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE
// Will generate a random dog image
app.get("/randomdog", randomDogApiCall);
// Generates a list of all the dog breeds
app.get("/alldogbreeds", getAllDogBreeds);
// Generates a random image based on the breed that was selected
app.get("/getdogbybreed/:breed", getSelectedBreed);

app.listen(8001, function () {
  console.log("App running on port 8001");
});
