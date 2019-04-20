import React, { Component } from 'react';
import Information from './Information';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={styles.header}>SimpliFi</h1>
      <div>
        <h1 style={styles.header}>SimpliFi</h1>
        <Information />
      </div>
    );
  }
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '1em'
  },
  info: {
    textAlign: 'center'
  }
}

export default App;
