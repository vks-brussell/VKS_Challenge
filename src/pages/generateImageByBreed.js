import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

export default class ImageGenerator extends Component {
  //States used to update the breed list, select input options, breed list errors, user input, image source, loading, and image errors
  constructor() {
    super();
    this.state = {
      breedList: "",
      listError: false,
      input: "",
      imgSrc: "",
      loading: false,
      imgError: false,
    };
  }

  //Call to the server endpoint which then pings the Dog API endpoint for the list of all dog breeds
  generateBreedList = async () => {
    this.setState({ listError: false });
    const getList = await axios.get("/getDogBreedList");

    //Checks if the returned data contains the list of breeds. If it doesn't then the error state is set to true and a message is displayed to the user
    if (getList.data.status === "success") {
      this.setState({ breedList: getList.data.message });
    } else {
      this.setState({ listError: true });
    }
  };

  //populates the select options as soon as the component mounts
  componentDidMount() {
    this.generateBreedList();
  }

  //generate random image of user-selected Breed
  generateImage = async (input) => {
    this.setState({ loading: true, imgError: false });
    const getImage = await axios.get("/getRandomBreedImage", {
      params: {
        selectedBreed: input,
      },
    });
    //Checks if the returned data contains an image. If it doesn't then the error state is set to true and a message is displayed to the user
    if (getImage.data.status === "success") {
      this.setState({ imgSrc: getImage.data.message, loading: false });
    } else {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    return (
      <div className="container">
        <CssBaseline />
        <h2>Select a breed to generate an image</h2>
        {this.state.input && (
          //After user selects a breed, a new button appears to generate more random images for selected breed
          <Button onClick={(e) => this.generateImage(this.state.input)}>
            Click me for more images for selected breed!
          </Button>
        )}
        <select
          //image generation function gets called every time a user changes the select input. user input state also gets updated
          onChange={(e) => {
            this.generateImage(e.target.value);
            this.setState({ input: e.target.value });
          }}
          defaultValue="default"
          id="list"
          className="select"
        >
          <option value="default" disabled>
            Select a breed
          </option>
          {this.state.listError ? ( //checks if an error was generated when populating list of dogs and conditionally renders the appropriate data/message
            <option value="" disabled>
              Error loading breed list. Please refresh and try again!
            </option>
          ) : (
            //The breed list comes as an object of arrays. It is divided into master breeds and subbreeds,
            //with the subbreeds being orgnaized into arrays for the related master breed object element.
            //In order to display all of the breeds and subbreeds as options in the select input, I found it necessary to map through the object keys and then checking if that
            //object element contained an array of length greater than zero. If so, I then mapped into that array and conditionally rendered the master breed (object keys)
            // with the subbreeds (array elements). If not, then I only conditionally rendered the master breed (object keys).
            this.state.breedList &&
            Object.keys(this.state.breedList).map((breed) =>
              this.state.breedList[breed].length > 0 ? (
                this.state.breedList[breed].map((subBreed) => (
                  <option value={`${breed}/${subBreed}`} key={subBreed}>
                    {subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}{" "}
                    {breed.charAt(0).toUpperCase() + breed.slice(1)}
                  </option>
                ))
              ) : (
                <option value={breed} key={breed}>
                  {breed.charAt(0).toUpperCase() + breed.slice(1)}
                </option>
              )
            )
          )}
        </select>
        {this.state.loading ? ( //checks the loading, error, and imgSrc states and conditionally renders the appropriate information
          <CircularProgress />
        ) : this.state.error ? (
          <h2>Oops, something went wrong! Please refresh and try again!</h2>
        ) : (
          <img
            src={this.state.imgSrc}
            alt="Random dog image"
            className={`img-container ${!this.state.imgSrc && "hidden"}`} //conditional className based on if the imgSrc state is populated or not
            id="imgContainer"
          />
        )}
      </div>
    );
  }
}
