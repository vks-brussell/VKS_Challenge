import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';




//changed component to arrow function 

const ImageGenerator = () => {
 
  //declaring state
const [image, setImage] =  useState();

 const generateImage = async () => {


    //Generate the image 
    
      const { data } = await axios("https://dog.ceo/api/breeds/image/random");
      //set the image to the data
      setImage(data.message);
  
    console.log('Generate an image');
  };

    return (
      <div className='container'>
        <CssBaseline />
        <h2>Click the button to generate a new picture</h2>
        <Button
          variant='contained'
          onClick={generateImage}
          className='button'
        >
          Click Me!
        </Button>
    
      {image ? (
        // rendering conditionally the image
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
      </div>
    );
  }
// }
export default ImageGenerator