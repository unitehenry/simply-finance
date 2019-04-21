import React, { Component } from 'react';

import NavBar from './NavBar';
import Transactions from './Transactions';
import AddReceiptButton from './AddReceiptButton';

class App extends Component {

  render() {
    return (
      <div>
        <NavBar auth={true}/>
        <Transactions />
        <AddReceiptButton />
      </div>
    )
  }
}

export default App;
