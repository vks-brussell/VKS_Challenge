import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

export default class ImageGenerator extends Component {
  // state to update the image when you click
  constructor() {
    super();
    this.state = {
      imgDog: "",
      err: false,
    };
  }

  // this function will generate a random dog when you click on the button
  generateImage = async () => {
    this.setState({ err: false });
    const getImg = await axios.get("/getRandomDogImage");
    if (getImg.data.status === "success") {
      this.setState({ imgDog: getImg.data.message });
    } else {
      this.setState({ err: true });
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
        {/* ternary operator to handle error and loading */}
        {!this.state ? (
          <div>....loading</div>
        ) : this.state.err ? (
          <p>THERE ARE NO DOGS HERE TRY AGAIN</p>
        ) : (
          <img
            src={this.state.imgDog}
            alt="Random dog image"
            className={`container ${!this.state.imgDog && "hidden"}`}
            id="imgContainer"
          />
        )}
      </div>
    );
  }
}
