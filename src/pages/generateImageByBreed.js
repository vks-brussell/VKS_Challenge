import React, { Component } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

export default class ImageGenerator extends Component {
  //Populate the selct's options

  generateImage = async (e) => {
    //Generate the image HERE
    console.log('Generate an image');
  };

  render() {
    return (
      <div className='container'>
        <CssBaseline />
        <h2>Select a breed to generate an image</h2>
        <select id='list' onChange={this.generateImage} className='select'>
          <option value=''>Select a breed</option>
        </select>
        <img
          src=''
          alt='Random dog image'
          className='img-container hidden'
          id='imgContainer'
        />
      </div>
    );
  }
}