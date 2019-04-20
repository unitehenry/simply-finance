import React, { Component } from 'react';
import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';

class Transations extends Component {

  render(){
    return (
      <div style={{padding: '1.5em'}}>

        <div>
          <Typography variant="h4" color="inherit" style={styles.header}>
              Total Spent
          </Typography>
          <Typography variant="h3" color="inherit" style={styles.header}>
              { "$35.26" }
          </Typography>
        </div>

        {Transaction()}
        {Transaction()}
        {Transaction()}
        {Transaction()}
        {Transaction()}
        {Transaction()}
        {Transaction()}

      </div>
    )
  }

}

function Transaction(){
  return(
    <Button style={{width: '100%'}}>
      <Card style={{width: '100%'}}>
        <CardContent>
          <Typography variant="h6" color="inherit" style={styles.transaction.header}>
              { "Vendor Name - $35.26" }
          </Typography>
        </CardContent>
      </Card>
    </Button>
  )
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '.3em'
  },
  transaction: {
    header: {

    }
  }
}

export default Transations;
