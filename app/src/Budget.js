import React, { Component } from 'react';
import Questions from './Questions';
import SimpleSelect from './SimpleSelect';
import TextFile from './TextFile';
import Progress from './Progress';
import Button from '@material-ui/core/Button';

const firebase = require('firebase/app');
require('firebase/firestore');
const db = firebase.firestore();

class Budget extends Component {

    state = {
        header: true,
        nameTextField: true,
        graphs: true,
        questions: false,
        transactions: [],
        categories: []
      }

  componentDidMount = () => {
    const component = this;

    db.collection("users").doc(this.props.uid)
      .get().then(function(doc) {
        if (doc.exists) {
            const data = doc.data();
            component.setState({transactions: data.transactions})
            // console.log("Document data:", doc.data().transactions);
            // console.log(calcPercent(JSON.stringify(doc.data().transactions)))
            const resultPercent = calcPercent(JSON.stringify(doc.data().transactions));
            console.log("Final " + JSON.stringify(resultPercent));
            component.calculateBudget();
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    // console.log(this.state.transactions)
    //console.log(calcPercent(JSON.stringify(this.state.transactions[1].items)))
  }

  calculateBudget = () => {
    this.state.transactions.forEach((transaction) => {
      transaction.items.forEach((item) => {
        if(this.state.categories.includes(item.Category)){
          return;
        } else{
          const categories = this.state.categories;
          categories.push(item.Category);
          this.setState({categories: categories})
        }
      })
    })

    // console.log(this.state.categories);
  }

  render() {
    return (
      <div>

        {!this.state.questions ?
            (

            <div style = {styles.header}>
              <Progress categories={this.state.categories}/>
              <Button variant="contained" style={styles.button2} onClick={()=> {this.setState({graphs: true,questions: true,nameTextField: false,header: false})}} style={styles.button}>
                Create!
              </Button>
              <Button variant="contained" id = 'Edit'  style={styles.button}>
                Edit
              </Button>
            </div>
          )
            :
            (
            <div>
              <Questions updateItem={(item) => this.select(item)}/>
            </div>
            )
          }
        </div>
    );
  }
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '1em',
    fontSize: 30,
  },
  info: {
    textAlign: 'center'
  },
  inBut:{
      visibility: 'false'
  },
  center:{
    textAlign: 'center',
    fontSize: 50
  },
  button2:{
      margin: 'lem'
  },
  button: {
    margin: '1em'
  }
}

function calcPercent(oldJSON){
      var dict = {}
      var someObj = [];
      var js = JSON.parse(oldJSON);
      for (var item in js) {
        for (var elm in js[item].items) {
          // console.log(js[item].items[elm]);
          someObj.push(js[item].items[elm]);
        }
        // console.log(item);
        // console.log(js[item]);
      }

      console.log("SOME " + JSON.stringify(someObj));


      for (var i = 0; i < someObj.length;i++){
        if (someObj[i].Category != "") {
          if (someObj[i].Category in dict ){
              if (isNaN(someObj[i].Price)) {
                dict[someObj[i].Category] += 0;
              } else {
                dict[someObj[i].Category] += parseInt(someObj[i].Price, 10);
              }
          }else {
              if (isNaN(someObj[i].Price)) {
                dict[someObj[i].Category] = 0;
              } else {
                dict[someObj[i].Category] = parseInt(someObj[i].Price, 10);
              }
          }
        }
      }
      var count = 0
      var percent = {}
      for (var key in dict){
        if (key != "") {
          if (isNaN(dict[key])) {
                  count += 0
          } else {
              count += parseInt(dict[key], 10);
          }
        }
      }
      for (var key in dict){
          percent[key] = parseInt(dict[key]/count*100);
      }

      console.log("PERENT " + JSON.stringify(percent));
      return percent;

  }

export default Budget;
