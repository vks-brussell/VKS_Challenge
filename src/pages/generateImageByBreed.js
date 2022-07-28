import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

export default class ImageGenerator extends Component {
  //Populate the selct's options
  constructor() {
    super();
    this.state = {
      dogImg: "",
      breed: [""],
      select: "",
      err: false,
    };
  }
  // this will get the breed list, when i would try to put my path from server.js it would break the code i'm not sure why
  // so this is why i put the URL for the purpose of making it work but i would love to get your input on why it's not working
  getBreed = async () => {
    const { breed } = this.state;
    await axios
      .get("https://dog.ceo/api/breeds/list")
      .then((response) => {
        this.setState({
          breed: breed.concat(response.data.message),
        });
      })
      .catch((err) => {
        this.setState({ err: true });
      });
  };

  // getting the image of the dog that is selected from the list with the help of the state
  getDogImage = async () => {
    const { select } = this.state;
    await axios
      .get(`getBreedList/${select}`)
      .then((response) => {
        this.setState({
          dogImg: response.data.message,
        });
      })
      .catch((err) => {
        this.setState({ err: true });
      });
  };

  handleSelect = (e) => {
    this.setState({
      select: e.target.value,
    });
  };

  componentDidMount() {
    this.getBreed();
  }

  render() {
    const { breed, dogImg, select } = this.state;

    return (
      <div>
        <div className="container">
          <CssBaseline />
          <h2>Select a breed to generate an image</h2>

          <select value={select} onChange={this.handleSelect}>
            {breed.map((e) => (
              <option value={e}> {e} </option>
            ))}
          </select>

          <Button id="submit" disabled={!select} onClick={this.getDogImage}>
            see a dog
          </Button>
          {/* ternary operator to handle error and loading */}
          {!this.state ? (
            <div>.... Loading</div>
          ) : this.state.err ? (
            <p>THERE ARE NO DOGS HERE TRY AGAIN</p>
          ) : (
            <div id="img">
              <img
                src={dogImg}
                alt="Random dog image"
                className={`container ${!this.statedogImg && "hidden"}`}
                id="imgContainer"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
