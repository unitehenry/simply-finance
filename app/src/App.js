import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={styles.header}>SimpliFi</h1>
      </div>
    );
  }
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '1em'
  }
}

export default App;
