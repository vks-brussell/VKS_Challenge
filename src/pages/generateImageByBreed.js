import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';


//changed component to arrow function 

const ImageGenerator = () => {
// export default class ImageGenerator extends Component {

  const [images, setImages] =  useState();
  const [breeds, setBreeds] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getBreed();
  }, []);

  //Populate the select's options

  const getBreed = async () => {
    setLoading(true)
    const { data } = await axios("https://dog.ceo/api/breeds/list/all");
    const array = Object.keys(data.message);
    console.log(data.message)
      //set the image to the data
      setBreeds(array);
      setLoading(false)
      console.log(array)
      
      
  }
  

  const generateImage = async (e) => {
    //Generate the image HERE
    const chosenBreed = e.target.value
    const { data } = await axios(`https://dog.ceo/api/breed/${chosenBreed}/images`);
      //set the image to the data
      setImages(data.message);
      console.log('Generate an image');
    console.log(data.message)

  };

  
  
  return (
    <>
  { loading ? ( <> loading </>) :(
    <>

      <div className='container'>
        <CssBaseline />
        <h2>Select a breed to generate an image </h2>
        <select id='list' onChange={generateImage} className='select'>
         
          {breeds?.map((breed) => {
return (
<>
{/* <option value=''>Select a breed</option> */}
<option value="none" selected disabled hidden>Select a breed</option>
<option key={breed} value={breed}>{breed}</option>
</>
)
          })}
        </select>
        {images?.map((image) => {
return (

<>
{ image ? (
  <>
        <img
          src={image}
          alt='Random dog image'
          id='imgContainer'
        />
        </>

        ) : (
          <>

          <img
          src={image}
          alt='Random dog image'
          className='img-container hidden'
          id='imgContainer'
        />
        </>


        )}

</>)})}

      </div>
      </>)}
    </>
    );
        }

export default ImageGenerator
