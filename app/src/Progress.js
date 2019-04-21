import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';  
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
});

class Progress extends React.Component {
  state = {
    food: 0,
    merch: 5,
    entertainment: 85,
    other: 10,
  };


  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.roots}>
        <Paper className={classes.root} elevation={5}>
        <Typography variant="h5" component="h3">
            <p>Food</p>
            <LinearProgress variant="determinate" value={this.state.food} />
            <LinearProgress variant="determinate" value={this.state.food} />
            <LinearProgress variant="determinate" value={this.state.food} />
            <LinearProgress variant="determinate" value={this.state.food} />
            <br />
            <p>Merch</p>
            <LinearProgress color="secondary" variant="determinate" value={this.state.merch} />
            <LinearProgress color="secondary" variant="determinate" value={this.state.merch} />
            <LinearProgress color="secondary" variant="determinate" value={this.state.merch} />
            <LinearProgress color="secondary" variant="determinate" value={this.state.merch} />
            <br />
            <p>Entertainment</p>
            <LinearProgress variant="determinate" value={this.state.entertainment} />
            <LinearProgress variant="determinate" value={this.state.entertainment} />
            <LinearProgress variant="determinate" value={this.state.entertainment} />
            <LinearProgress variant="determinate" value={this.state.entertainment} />
            <br />
            <p>Other</p>
            <LinearProgress color="secondary" variant="determinate" value={this.state.other} />
            <LinearProgress color="secondary" variant="determinate" value={this.state.other} />
            <LinearProgress color="secondary" variant="determinate" value={this.state.other} />
            <LinearProgress color="secondary" variant="determinate" value={this.state.other} />
            <br />
        </Typography>
      </Paper>  
      </div>
    );
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);