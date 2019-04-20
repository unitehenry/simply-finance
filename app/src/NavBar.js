import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


function NavBar(props){
  return(
    <AppBar position="static">
      <Toolbar>
        {
          props.auth ?
          (
            null
          ) :
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        }
        <Typography variant="h6" color="inherit" style={styles.header}>
          SimpliFi
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  header: {
    margin: '1em'
  }
}

export default NavBar;
