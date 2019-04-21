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
        categories: [],
        percent: {}
      }

  componentDidMount = () => {
    const component = this;

    db.collection("users").doc(this.props.uid)
      .get().then(function(doc) {
        if (doc.exists) {
            component.setState({transactions: doc.data().transactions})
            console.log(component.state.categories);
            component.getCategories();
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  getCategories = () => {
    let categories = [];

    this.state.transactions.forEach((transaction) => {
      transaction.items.forEach((item) => {
        if(categories.includes(item.Category)){
          return;
        } else{
          categories.push(item.Category);

        }
      })
    })

    this.setState({categories: categories})
  }

  render() {
    return (
      <div style={styles.content}>
        <Progress categories={this.state.categories}/>
      </div>
    )
  }
}

const styles = {
  content: {
    padding: '1em'
  }
}

export default Budget;
