import React, { Component } from 'react';

import NavBar from './NavBar';
import Transactions from './Transactions';
import Budget from './Budget';
import AddReceiptButton from './AddReceiptButton';
import Login from './Login';

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/auth');

class App extends Component {

  state = {
    uid: '',
    budget: false
  }

  setUid = (id) => {
    this.setState({uid: id})
  }

  activateBudget = () => {
    this.setState({budget: true})
  }

  componentDidMount = () => {
    const component = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        component.setState({uid: user.uid})
      }
    });
  }

  render() {
    if(this.state.budget){
      return <Budget uid={this.state.uid} />
    } else {
      return (
        <div>
          <NavBar auth={this.state.uid === '' ? true : false} setUid={(id) => this.setUid(id)} activateBudget={() => this.activateBudget()}/>
          {
            this.state.uid !== '' ?
            (
              <React.Fragment>
                <Transactions uid={this.state.uid}/>
                <AddReceiptButton uid={this.state.uid}/>
              </React.Fragment>
            ):
            <Login setUid={(id) => this.setUid(id)}/>
          }


        </div>
      )
    }
  }
}

export default App;
