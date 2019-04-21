import React, { Component } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import * as $ from 'jquery';

const HOST = 'http://10.250.68.25:8080';

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
               url: `${HOST}/transcribeReceipt?image=${data.data.link}`,
               type: 'GET',
               crossDomain: true,
               dataType: 'text',
               success: function(data){
                 const items = JSON.parse(data);
                 component.setState({reviewItems: items, detailsOpen: true});
               },
               error: function(err){
                 if(err){console.log(err)}
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
    const component = this;

    var params = JSON.stringify(this.state.reviewItems);
    var returnItems = []; //CALLBACK FROM API

    $.ajax({
      url: `${HOST}/classifyData`,
      type: 'GET',
      contentType: 'applcation/json',
      crossDomain: true,
      data: {
        json : params
      },
      dataType: 'text',
      success: function(data){
        returnItems = JSON.parse(data);

        //Pushing to Firebase
        let newTransaction =  {
            img: component.state.receiptUrl,
            items: returnItems
          }

        db.collection("users").doc(component.props.uid)
          .get()
          .then((doc) => {
            const transactions = doc.data().transactions;
            transactions.push(newTransaction);
            db.collection("users").doc(component.props.uid).set({transactions: transactions});
          })


        component.setState({detailsOpen: false})
      }
    })
  }

  handleChange = (e) => {
    const items = this.state.reviewItems;
    items[e.target.index][e.target.name] = e.target.value;
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
                    name={'Name'}
                    index={i}
                    value={item.Name}
                    type="text"
                    style={{width: '100%'}}
                  />
                  <TextField
                    name={'Price'}
                    value={'      ' + item.Price}
                    index={i}
                    type="text"
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
