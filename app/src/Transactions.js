import React, { Component } from 'react';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, Divider, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import config from './environment';

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/firestore');
firebase.initializeApp(config.firebase);
const db = firebase.firestore();

class Transations extends Component {

  state = {
    transactions: []
  }

  componentDidMount = () => {

    const component = this;

    db.collection("transactions").doc("OENR7di8Vkv4cHZoTvIw")
      .onSnapshot(function(doc) {
          const transactions = doc.data().transactions;
          component.setState({transactions: transactions});
      });

  }

  render(){
    return (
      <div style={{padding: '1.5em'}}>
        <Typography variant="h3" style={{textAlign: 'center', padding: '1em'}}>
          Transactions
        </Typography>
        { this.state.transactions.map((transaction, i) => Transaction(transaction, i)) }

      </div>
    )
  }

}

function Transaction(props, i){

  return(
    <ExpansionPanel key={i}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            { `Transaction #${i+1}` }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={styles.details}>
            <img src={props.img} style={styles.image} alt="receipt"/>
            <List style={{width: '100%'}}>
              {
                props.items.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <ListItem>
                        <ListItemText>
                          {item.name} - {item.category}
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {item.price}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider/>
                    </React.Fragment>
                  )
                })
              }
            </List>
          </div>
        </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '.3em'
  },
  image: {
    width: '50%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
}

export default Transations;
