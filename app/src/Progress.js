import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Progress extends React.Component {
  render() {
    return (
      <div style={styles.roots}>
        <Paper style={styles.paper} elevation={5}>

          {

            this.props.categories.map((category) => {
              return (
                <React.Fragment key={category}>
                  <Typography variant="h5" component="h3" style={{padding: '1em'}}>
                    <label>{ category === '' ? 'Other' : category }</label>
                    <LinearProgress variant="determinate" value={98.99}/>
                  </Typography>
                  <br />
                </React.Fragment>
              )
            })

          }
        </Paper>
      </div>
    );
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
    padding: '3em 1.5em 1.5em 1.5em',
    textAlign: 'left'
  },
  progressBar: {
    margin: '1em'
  }
});

export default withStyles(styles)(Progress);
