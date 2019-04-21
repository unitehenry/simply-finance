import React, { Component } from 'react';

import NavBar from './NavBar';
import Transactions from './Transactions';
import AddReceiptButton from './AddReceiptButton';
import Login from './Login';

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/auth');

class App extends Component {

  state = {
    uid: ''
  }

  setUid = (id) => {
    this.setState({uid: id})
  }

  componentDidMount = () => {
    const component = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        component.setState({uid: user.uid})
      } else {
        this.props.setUid('');
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar auth={this.state.uid === '' ? true : false} setUid={(id) => this.setUid(id)}/>
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

export default App;
