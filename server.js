var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var axios = require("axios");

app.use(cors());
app.use(bodyParser.json());

//

// this is the endpoint to get a random dog
app.get("/getRandomDogImage", async (req, res) => {
  try {
    const imgDog = await axios.get(
      "https://dog.ceo/api/breeds/image/random",
      {}
    );

    res.status(200).send(imgDog.data);
  } catch (error) {
    console.log(error);
  }
});

// end point to get the List of all the dogs breed
app.get("/getBreedList", async (req, res) => {
  try {
    const breedList = await axios.get("https://dog.ceo/api/breeds/list/all");
    res.status(200).send(breedList.data);
  } catch (error) {
    console.log(error, "there are no dogs here :(");
  }
});

app.get("/getBreedList/:breedName", async (req, res) => {
  const dogBreed = req.params.breedName;
  try {
    const breedName = await axios.get(
      `https://dog.ceo/api/breed/${dogBreed}/images/random`
    );
    res.status(200).send(breedName.data);
  } catch (error) {
    console.log(error, "there are no dogs here :(");
  }
});
app.listen(8001, function () {
  console.log("App running on port 8001");
});
