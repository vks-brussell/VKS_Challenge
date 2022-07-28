import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

export default class ImageGenerator extends Component {
  // state that will hold the dog img and the
  // class name of the img
  // "hidden" will be used to unhide the the img tag once an image is loaded
  state = {
    dogImg: null,
    hidden: "img-container hidden",
  };
  generateImage = async () => {
    //Generate the image HERE
    const response = await fetch("/randomdog");
    const data = await response.json();
    // Changes the class name so that the image is no longer hidden
    this.setState({ dogImg: data.message, hidden: "img-container" });
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
        <img
          // state is used to store and change the src and className
          src={this.state.dogImg}
          alt="Random dog image"
          className={this.state.hidden}
          id="imgContainer"
        />
      </div>
    );
  }
}
