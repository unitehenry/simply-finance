import React, { Component } from 'react';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, Divider, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Receipt Type - {"$35.21"}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={styles.details}>
            <img src={'https://i.imgur.com/ixTOWYZ.jpg'} style={styles.image} />
            <List style={{width: '100%'}}>
              <ListItem>
                <ListItemText>
                  Hello
                </ListItemText>
                <ListItemSecondaryAction>
                  {"$200"}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
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
    alignItems: 'center'
  }
}

export default Transations;
