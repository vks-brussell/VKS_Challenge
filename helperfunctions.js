const request = require("request-promise");

// Helper functions that will call the API

const randomDogApiCall = (req, res) => {
  return request("https://dog.ceo/api/breeds/image/random")
    .then((response) => JSON.parse(response))
    .then((parsedResponse) => {
      res.send(parsedResponse);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getAllDogBreeds = (req, res) => {
  return request("https://dog.ceo/api/breeds/list/all")
    .then((response) => JSON.parse(response))
    .then((parsedResponse) => {
      res.send(parsedResponse);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getSelectedBreed = (req, res) => {
  const breed = req.params.breed;
  return request(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((response) => JSON.parse(response))
    .then((parsedResponse) => {
      res.send(parsedResponse);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { randomDogApiCall, getAllDogBreeds, getSelectedBreed };
