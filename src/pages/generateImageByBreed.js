import React, { Component, useState, useEffect } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

//changed component to arrow function

const ImageGenerator = () => {
// declaring state variables
  const [images, setImages] = useState();
  const [breeds, setBreeds] = useState();
  const [loading, setLoading] = useState(false);

// useEffecct to load breeds on page refresh

  useEffect(() => {
    getBreed();
  }, []);

  //Populate the select's options

  const getBreed = async () => {
    setLoading(true);
    const { data } = await axios("https://dog.ceo/api/breeds/list/all");
    
    //creating array from data
    const array = Object.keys(data.message);

    //set the image to the data
    setBreeds(array);
    setLoading(false);
  };

  const generateImage = async (e) => {
    //Generate the image HERE

    //set id to selected breed
    const id = e.target.value;
    // GET images from breed
    const { data } = await axios(`https://dog.ceo/api/breed/${id}/images`);
    
    // tried to use the following code to connect to backend
    // const { data } = await axios.get(`/api/breed/${id}/images`)

    //set the image to the data
    setImages(data.message);
    console.log("Generate an image");
  };

  return (
    <>
      {loading ? (
        <> loading </>
      ) : (
        <>
          <div className="container">
            <CssBaseline />
            <h2>Select a breed to generate an image </h2>
            <select id="list" onChange={generateImage} className="select">
              {breeds?.map((breed) => {
                return (
                  <>
                    <option value="none" selected disabled hidden>
                      Select a breed
                    </option>
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  </>
                );
              })}
            </select>
            {images?.map((image) => {
              return (
                <>
                  {image ? (
                    // rendering conditionally the images
                    <>
                      <img
                        src={image}
                        alt="Random dog image"
                        className="container"
                        id="imgContainer"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={image}
                        alt="Random dog image"
                        className="img-container hidden"
                        id="imgContainer"
                      />
                    </>
                  )}
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ImageGenerator;
