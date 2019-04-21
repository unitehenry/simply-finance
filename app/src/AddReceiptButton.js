import React, { Component } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const HOST = 'http://10.250.68.25:8080';

import * as $ from 'jquery';

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/firestore');
const db = firebase.firestore();

class AddReceiptButton extends Component {

  state = {
    selector: null,
    detailsOpen: false,
    receiptUrl: '',
    reviewItems: []
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
             component.setState({receiptUrl: data.data.link})

             $.ajax({
               url: `${HOST}/transcribeReceipt?image=https://i.imgur.com/tElLPXP.png`,
               type: 'GET',
               success: function(data){
                 console.log(data);
                 component.setState({reviewItems: data, detailsOpen: true});
               }
             })
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
    let returnedItems = []; //CALLBACK FROM API

    //API call to server for confirmation goes here (send edits)
    $.ajax({
      url: `${HOST}/classifyData`,
      type: 'GET',
      contentType: 'applcation/json',
      crossDomain: true,
      data: this.state.reviewItems,
      dataType: 'json',
      success: function(data){
        returnedItems = data;
      }
    })

    //Pushing to Firebase
    let currentTransactions = [];
    db.collection("users").doc(this.props.uid)
      .get()
      .then((doc) => {
        currentTransactions = doc.data().transactions;
        let newTransaction =  {
            img: this.state.receiptUrl,
            items: returnedItems
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

    this.setState({detailsOpen: false})
  }

  handleChange = (e) => {
    const items = this.state.reviewItems;
    items[e.target.name.i][e.target.name.type] = e.target.value;
    this.setState({reviewItems: items});
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
        <ImageConfirm open={this.state.detailsOpen} closeDialog={() => this.closeDialog()} reviewItems={this.state.reviewItems}/>
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
          {
            props.reviewItems.map((item, i) => {
              return (
                <div style={styles.itemField} key={i}>
                  <TextField
                    name={{type: 'name', index: i}}
                    value={item.name}
                    type="text"
                    style={{width: '100%'}}
                  />
                  <TextField
                    name={{type: 'price', index: i}}
                    value={item.price}
                    type="number"
                    style={{width: '100%'}}
                  />
                </div>
              )
            })
          }
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
