var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var axios = require("axios");

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE

//endpoint for generating random dog images
app.get("/getRandomImage", async (req, res) => {
  try {
    const image = await axios.get(
      "https://dog.ceo/api/breeds/image/random",
      {}
    );
    res.status(200).send(image.data);
  } catch (error) {
    console.log(error);
  }
});

//endpoint for generating list of dog breeds
app.get("/getDogBreedList", async (req, res) => {
  try {
    const dogBreedList = await axios.get("https://dog.ceo/api/breeds/list/all");
    res.status(200).send(dogBreedList.data);
  } catch (error) {
    console.log(error);
  }
});

//endpoint for generating random dog images for specific breeds
app.get("/getRandomBreedImage", async (req, res) => {
  try {
    const dogBreedImage = await axios.get(
      `https://dog.ceo/api/breed/${req.query.selectedBreed}/images/random`
    );
    res.status(200).send(dogBreedImage.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8001, function () {
  console.log("App running on port 8001");
});
