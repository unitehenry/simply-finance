import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


function NavBar(props){
  return(
    <AppBar position="static">
      <Toolbar>
        {
          ['transactions', 'budget','about', 'sign out'].map((item) => {
            return (
              <Button style={styles.button}>{item}</Button>
            )
          })
        }
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  header: {
    margin: '1em'
  },
  button: {
    color: 'inherit'
  }
}

export default NavBar;
