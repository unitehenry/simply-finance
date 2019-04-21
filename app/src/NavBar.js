import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import Logo from './SimpliFiLogo.png'

function NavBar(props){
  return(
    <AppBar position="static" style={styles.topbar}>
      <Toolbar>
        {
          !props.auth ?
          (
            ['transactions', 'budget','about', 'sign out'].map((item) => {
              return (
                <Button style={styles.button} key={item}>{item}</Button>
              )
            })
          ) :
          <img src={Logo} style={styles.image}/>
        }
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  topbar: {
    backgroundColor: '#1fcd81'
  },
  header: {
    margin: '1em'
  },
  button: {
    color: 'inherit'
  },
  image: {
    width: '150px'
  }
}

export default NavBar;
