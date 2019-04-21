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
            console.log("Document data:", doc.data());
            component.calculateBudget();
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
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

    console.log(this.state.categories);
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

export default Budget;
