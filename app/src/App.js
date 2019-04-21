import React, { Component } from 'react';

import NavBar from './NavBar';
import Transactions from './Transactions';
import AddReceiptButton from './AddReceiptButton';
import Login from './Login';

class App extends Component {

  state = {
    uid: ''
  }

  setUid = (id) => {
    this.setState({uid: id})
  }

  render() {
    return (
      <div>
        <NavBar auth={true}/>
        {
          this.state.uid ?
          <Transactions />:
          <Login setUid={(id) => this.setUid(id)}/>
        }

        <AddReceiptButton />
      </div>
    )
  }
}

export default App;
