import React, { Component } from 'react';
import Questions from './Questions';
import SimpleSelect from './SimpleSelect';
import TextFile from './TextFile';
import Progress from './Progress';
import Button from '@material-ui/core/Button';
    

class Budget extends Component {
  render() {
    return (
      <div>
        <p style = {styles.header}> Budget </p>
        <Progress />
            <div style = {styles.center}>
            <Button variant="contained" color="primary" >
                Create
            </Button>
            
            <Button disabled style = {styles.inBut}>
                
            </Button>
            <Button variant="contained" >
                Edit
            </Button>
            
            </div>
        <Questions />
        
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
}
}

export default Budget;
