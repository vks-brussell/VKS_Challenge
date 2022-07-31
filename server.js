var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE
app.get("https://dog.ceo/api/breeds/image/random")
app.get("https://dog.ceo/api/breed/hound/images")
app.get("https://dog.ceo/api/breeds/list/all")




app.listen(8001, function () {
  console.log('App running on port 8001');
});