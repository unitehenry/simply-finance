import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Logo from './SimpliFiLogo.png'

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/auth');

function NavBar(props){
  function signOut(){
    firebase.auth().signOut().then(function() {
      props.setUid('')
    }).catch(function(error) {
      if(error){alert(error)}
    })
  }

  return(
    <AppBar position="static" style={styles.topbar}>
      <Toolbar>
        {
          !props.auth ?
          (
            <React.Fragment>
                <Button style={styles.button} onClick={() => signOut()}>sign out</Button>
            </React.Fragment>
          ) :
          <img src={Logo} style={styles.image} alt="logo"/>
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
