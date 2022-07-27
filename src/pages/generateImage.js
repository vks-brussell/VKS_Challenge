import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

export default class ImageGenerator extends Component {
  //States used to update the image URL as well as the loading and error state (if there is one)
  constructor() {
    super();
    this.state = {
      imgSrc: "",
      loading: false,
      error: false,
    };
  }

  //Call to the server endpoint which then pings the Dog API endpoint for a random image
  generateImage = async () => {
    this.setState({ loading: true, error: false });
    const getImage = await axios.get("/getRandomImage");
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
        <h2>Click the button to generate a new picture</h2>
        <Button
          variant="contained"
          onClick={this.generateImage}
          className="button"
        >
          Click Me!
        </Button>
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
