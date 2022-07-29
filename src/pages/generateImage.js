import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

export default class ImageGenerator extends Component {
  generateImage = async () => {
    //Generate the image HERE
    //Setting the image container to a variable.
    const imageContainer = document.getElementById("imgContainer");

    try {
      //fetching the random image
      await axios
        .get("http://localhost:8001/api/breeds/image/random")
        .then((data) => {
          const randomImage = data.data.randomImage;

          //Updating the image container styling to remove the hidde attribute. I would have used useState() hook but did not want to modify the original code.
          imageContainer.setAttribute("class", "img-container");

          //Updating the image path.
          imageContainer.setAttribute("src", randomImage);
        });
    } catch (error) {
      //Creating an p tag element to display an error message to the user
      const p = document.createElement("p");
      const errorMessage = document.createTextNode(
        `Failed to load image : ${error.message}`
      );
      p.appendChild(errorMessage);

      //Appending the p node after the button. This will only work on the first button on the page.
      document.querySelector("button").after(p);
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
        <img
          src=""
          alt="Random dog pic" // renamed to pic to remove the screen-reader warning
          className="img-container hidden"
          id="imgContainer"
        />
      </div>
    );
  }
}
