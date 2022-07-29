var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var axios = require("axios");

const getRandomImage = async (req, res) => {
  try {
    //Fetching random image
    let randomImage = await axios.get(
      "https://dog.ceo/api/breeds/image/random"
    );

    //Random image src
    randomImage = randomImage.data.message;
    res.status(200).json({ status: 200, randomImage });
  } catch (error) {
    res.status(400).json({ status: 400 });
  }
};

const getBreedList = async (req, res) => {
  try {
    //Fetching all breeds
    let breedList = await axios.get("https://dog.ceo/api/breeds/list/all");

    //breeds list
    breedList = breedList.data.message;
    res.status(200).json({ status: 200, breedList });
  } catch (error) {
    res.status(400).json({ status: 400 });
  }
};

const getRandomImageByBreed = async (req, res) => {
  //Getting the selected breed from the params
  const breed = req.params.breed;
  try {
    //fetching random image
    let randomImage = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    //random image src
    randomImage = randomImage.data.message;
    res.status(200).json({ status: 200, randomImage });
  } catch (error) {
    res.status(400).json({ status: 400 });
  }
};

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE
app.get("/api/breeds/image/random", getRandomImage);
app.get("/api/breeds", getBreedList);

//the breed is selected from the select menu
app.get("/api/:breed/image/random", getRandomImageByBreed);

app.listen(8001, function () {
  console.log("App running on port 8001");
});
