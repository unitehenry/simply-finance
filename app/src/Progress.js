import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Progress extends React.Component {

  render() {
    console.log(this.props.percent);

    return(
      <React.Fragment>
        {
          Object.keys(this.props.percent).forEach(function(key){
            return(<h1>key</h1>)
          })
        }
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 60,
    paddingRight: theme.spacing.unit * 60,

  },
  roots: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: '1.5em',
    textAlign: 'left'
  },
  progressBar: {
    margin: '1em'
  },
  labelTag: {
    padding: '1em'
  }
});

export default withStyles(styles)(Progress);
