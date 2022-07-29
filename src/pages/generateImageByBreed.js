import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";

export default class ImageGenerator extends Component {
  //Populate the selct's options
  componentDidMount = () => {
    this.populateSelect();
  };

  populateSelect = async (e) => {
    const selectMenu = document.getElementById("list");
    try {
      //Fetching breed list
      await axios.get("http://localhost:8001/api/breeds").then((data) => {
        //The keys are list items. Extracting them into an array.
        const breedList = Object.keys(data.data.breedList);

        //Populating the select
        breedList.forEach((breed) => {
          const option = document.createElement("option");
          option.text = breed;
          selectMenu.appendChild(option);
        });
      });
    } catch (error) {
      //Creating an p tag element to display an error message to the user
      const p = document.createElement("p");
      const errorMessage = document.createTextNode(
        `Failed to load breed list : ${error.message}`
      );
      p.appendChild(errorMessage);

      //Appending the p node after the button. This will only work on the first button.
      document.querySelector("select").after(p);
    }
  };

  generateImage = async (e) => {
    // Generate the image HERE
    // Setting the image container to a variable.
    const imageContainer = document.getElementById("imgContainer");

    //chosen breed
    const breed = e.target.value;
    try {
      //fetching the random image
      await axios
        .get(`http://localhost:8001/api/${breed}/image/random`)
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

      //Appending the p node to the select menu
      document.querySelector("select").after(p);
    }
  };

  render() {
    return (
      <div className="container">
        <CssBaseline />
        <h2>Select a breed to generate an image</h2>
        <select id="list" onChange={this.generateImage} className="select">
          <option value="">Select a breed</option>
        </select>
        <img
          src=""
          alt="Random dog pic"
          className="img-container hidden"
          id="imgContainer"
        />
      </div>
    );
  }
}
