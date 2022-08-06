var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

const getRandomDogImage = async (req, res) => {
  try{
    const result = await axios.get('https://dog.ceo/api/breeds/image/random')
    res.send(result.data)
  }catch(error){
    console.log(error);
  }
}

const getDogBreeds = async (req, res) => {
  try{
    const result = await axios.get('https://dog.ceo/api/breeds/list/all')
    res.send(result.data)
  }catch(error){
    console.log(error);
  }
}

const getRandomImageByDobBreed= async (req, res) => {
  const dogBreed = decodeURI(req.params.dogBreed);
  try{
    const result = await axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    res.send(result.data)
  }catch(error){
    console.log(error);
  }
}

app.get('/api/getRandomDogImage', getRandomDogImage);

app.get('/api/getDogBreeds', getDogBreeds);

app.get('/api/getRandomImageByDogBreed/:dogBreed', getRandomImageByDobBreed);

app.listen(8001, function () {
  console.log('App running on port 8001');
});