import React, { Component } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import * as $ from 'jquery';

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/firestore');
const db = firebase.firestore();

class AddReceiptButton extends Component {

  state = {
    selector: null,
    detailsOpen: false,
    receiptUrl: ''
  }

  componentDidMount = () => {
    this.setState({selector: document.getElementById('file')});
    const component = this;

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
           success: function(data) {
             console.log(data.data.link);
             component.setState({receiptUrl: data.data.link})
             component.setState({detailsOpen: true});
             //API call to server for parsing goes here
           }
          });
        }

      })
    })
  }

  fileSelect = () => {
    this.state.selector.setAttribute('type', 'file');
    this.state.selector.click();
  }

  closeDialog = () => {

    let currentTransactions = [];
    db.collection("users").doc(this.props.uid)
      .get()
      .then((doc) => {
        currentTransactions = doc.data().transactions;
        let newTransaction =  {
            img: this.state.receiptUrl,
            items: [
              {
                name: 'Red Bull',
                price: 2.25,
                category: 'Beverage'
              }
            ]
          }
        currentTransactions.push(newTransaction);
        db.collection("users").doc(this.props.uid).set({
          transactions: currentTransactions
        })
        .then(function() {
            console.log("New Transaction Added!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      })

    //API call to server for confirmation goes here (send edits)
      //Push to firebase here

    this.setState({detailsOpen: false})
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
        <ImageConfirm open={this.state.detailsOpen} closeDialog={() => this.closeDialog()}/>
      </div>
    )
  }

}

function ImageConfirm(props){
  return(
    <Dialog open={props.open} fullWidth={true}>
      <div>
        <DialogTitle>Confirm Details</DialogTitle>
        <DialogContent>
          <div style={styles.itemField}>
            <TextField
              value="red bull"
              type="text"
              style={{width: '100%'}}
            />
            <TextField
              value={4.23}
              type="number"
              style={{width: '100%'}}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={styles.dialogButton} onClick={() => props.closeDialog()}>save</Button>
        </DialogActions>
      </div>
    </Dialog>
  )
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
  },
  itemField: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  dialogButton: {
    margin: '1em',
    backgroundColor: '#1fcd81',
    color: '#fff'
  }
}

export default AddReceiptButton;
