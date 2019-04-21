import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Progress extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.roots}>
        <Paper className={classes.paper} elevation={5}>
          {
            this.props.categories.map((category) => {
              return (
                <React.Fragment>
                  <label style={styles.labelTag}>{category === "" ? 'Other' : category}</label>
                  <Typography variant="h5" component="h3" style={{margin: '1em'}}>
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
