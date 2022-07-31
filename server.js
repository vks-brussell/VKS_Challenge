var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE
const generateImage = async (e) => {
const id = e.target.value
const { data } = await axios(`https://dog.ceo/api/breed/${id}/images`);
console.log(data.message)
}




//get random image
app.get("https://dog.ceo/api/breeds/image/random")
//get all breeds
app.get("https://dog.ceo/api/breeds/list/all")
//get images by breed
app.get(`/api/breed/:id/images`, generateImage)



app.listen(8001, function () {
  console.log('App running on port 8001');
});