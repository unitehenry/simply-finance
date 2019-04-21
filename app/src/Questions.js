import React, { Component } from 'react';
import SimpleSelect from './SimpleSelect';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextFile from './TextFile';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Questions extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
            <Paper className={classes.root} elevation={5}>
                <Typography variant="h5" component="h3">
                    <p>How much do you earn every month?</p>
                    <TextFile />
                    <br />
                    <p>What percent of your income would you spend on food?</p>
                    <SimpleSelect />
                    <br />
                    <p>What percent of your income would you spend on merch?</p>
                    <SimpleSelect />
                    <br />
                    <p>What percent of your income would you spend on entertainment?</p>
                    <SimpleSelect />
                    <br />
                    <p>What percent of your income would you spend on other things?</p>
                    <SimpleSelect />
                    <br />
                    <Button variant = "contained" color = "primary">
                        Submit
                    </Button>
                </Typography>
              </Paper>  
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
Questions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Questions);