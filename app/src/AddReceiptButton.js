import React, { Component } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import * as $ from 'jquery';

class AddReceiptButton extends Component {

  state = {
    selector: null
  }

  componentDidMount = () => {
    this.setState({selector: document.getElementById('file')});

    $("document").ready(() => {
      $('input[type=file]').on("change", () => {
        const $files = this.state.selector;

        //Reject Big Files
        if($files.length){
          if($files[0].size > $(this).data("max-size" * 1024)){
            alert('Please select a smaller file.');
            return false;
          }
        }

        //Begin File Upload
        console.log("Uploading File...")

        const file = $files.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {

          const image = reader.result.split(',')[1];

          $.ajax({
            url: 'https://api.imgur.com/3/image',
            headers: {
            'Authorization': 'Client-ID c7d4fb85c7f86ed'
            },
            type: 'POST',
            data: {
              'image': image
            },
           success: function(data) { console.log(data.data.link); }
          });
        }

      })
    })
  }

  fileSelect = () => {
    this.state.selector.setAttribute('type', 'file');
    this.state.selector.click();
  }

  render(){

    return (
      <div>
        <Fab color="primary" aria-label="Add" style={styles.button} onClick={() => {this.fileSelect()}}>
          <form id="imgur">
            <input id="file" className="imgur" type="file" accept="image/*" data-max-size="5000" style={{display: 'none'}}/>
          </form>
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
    backgroundColor: '#1fcd81'
  }
}

export default AddReceiptButton;
