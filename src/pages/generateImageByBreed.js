import React, { Component, useEffect } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

export default class ImageGenerator extends Component {
  // state that will hold the dog img, the breed and the
  // class name of the img
  // "hidden" will be used to unhide the the img tag once an image is loaded
  constructor(props) {
    super(props);
    this.state = {
      breedsOfDogs: null,
      dogImg: null,
      hidden: "img-container hidden",
    };
  }

  // Fetches the breeds of dogs and stores them in state in an array
  // Perhaps change it to the back end so that it's passed to the front end
  // in an array already?
  componentDidMount = async () => {
    const response = await fetch("/alldogbreeds");
    const data = await response.json();
    this.setState({ breedsOfDogs: Object.keys(data.message) });
  };

  generateImage = async (e) => {
    //Generates the image of the selected dog breed that was passed to the function
    const response = await fetch(`/getdogbybreed/${e}`);
    const data = await response.json();
    this.setState({ dogImg: data.message, hidden: "img-container" });
  };

  render() {
    return (
      <div className="container">
        <CssBaseline />
        <h2>Select a breed to generate an image</h2>
        <select
          id="list"
          onChange={(event) => this.generateImage(event.target.value)}
          className="select"
        >
          <option value="">Select a breed</option>
          {/* Will map through the array of dog breeds and create an option for each */}
          {this.state.breedsOfDogs &&
            this.state.breedsOfDogs.map((dog) => {
              return (
                <option key={dog} value={dog}>
                  {dog}
                </option>
              );
            })}
        </select>
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
