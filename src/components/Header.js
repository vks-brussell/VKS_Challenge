import React from '../../node_modules/react';
import Link from '../../node_modules/react-router-dom/Link';

import AppBar from '../../node_modules/@material-ui/core/AppBar';
import CssBaseline from '../../node_modules/@material-ui/core/CssBaseline';
import Toolbar from '../../node_modules/@material-ui/core/Toolbar';
import Button from '../../node_modules/@material-ui/core/Button';

export default function Navbar() {
  return (
    <div>
      <CssBaseline />
      <AppBar position='fixed' className='navbar'>
        <Toolbar className='nav-container'>
          <img src='logo.png' alt='VKS Logo' className='header_logo' />
          <div>
            <Button component={Link} to='/' className='nav-button'>
              Random Images
            </Button>
            <Button component={Link} to='/by-breed' className='nav-button'>
              By Breed
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}