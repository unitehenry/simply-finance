import React, { Component } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class AddReceiptButton extends Component {

  render(){
    return (
      <div>
        <Fab color="primary" aria-label="Add" style={styles.button}>
          <AddIcon />
        </Fab>
      </div>
    )
  }

}

const styles = {
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
}

export default AddReceiptButton;
