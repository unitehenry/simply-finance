import React, { Component } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class AddReceiptButton extends Component {

  state = {
    selector: null,
    file: null
  }

  componentDidMount = () => {
    this.setState({selector: document.getElementById('file')});
  }

  fileChange = () => {
    console.log(this.state.selector.files[0].name)
    //Get mock data from OCR
  }

  fileSelect = () => {
    this.state.selector.setAttribute('type', 'file');
    this.state.selector.click();
  }

  render(){

    return (
      <div>
        <Fab color="primary" aria-label="Add" style={styles.button} onClick={() => {this.fileSelect()}}>
          <input id="file" type="file" style={{display: 'none'}} onChange={() => this.fileChange()}/>
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
