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
    var someObj = JSON.stringify([{"Name": "Banana", "Price": "1.00", "Category": "Food"},{"Name": "TV","Price": "100.00", "Category": "Entertaiment"},{"Name" : "Apple","Price" : "2.00", "Category": "Food"}]);
    state = calcPercent(someObj);
    


  function calcPercent(someObj){
      var dict = {}
      for (var i = 0; i < someObj.length;i++){
          
          if (someObj[i].Category in dict ){
            dict[someObj[i].Category] += someObj[i].Price;
          }else {
            dict[someObj[i].Category] = someObj[i].Price;
          }
      }
      var count = 0
      var percent = {}
      for (var key in dict){
        count += dict[key];
      }
      for (var key in dict){
          percent[key] = dict[key]/count;
      }
      return percent;
      
  }
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
        for(var key in state){
        
            <p>key</p>
            <LinearProgress variant="determinate" value={this.state[key]} />
            <LinearProgress variant="determinate" value={this.state[key]} />
            <LinearProgress variant="determinate" value={this.state[key]} />
            <LinearProgress variant="determinate" value={this.state[key]} />
            <br />
        }
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