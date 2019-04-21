import React, { Component } from 'react';
import SimpleSelect from './SimpleSelect';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextFile from './TextFile';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Budget from './Budget'

class Questions extends Component {
    state = {
    header: true,
    nameTextField: true,
    graphs: true,
    questions: false
    }

    select = (item) => {
    console.log(item)
    //this.setState({ [item.target.name]: item.target.value });
    //this.props.updateItem(this.state[item.target.name])
    }

  render() {
    const { classes } = this.props;
    return (
        <div>
        {!this.state.questions ?
            (
              <div>
                    <Paper className={classes.root} elevation={5}>
                        <Typography variant="h5" component="h3">
                            <p>How much do you earn every month?</p>
                            <TextFile select={(item) => this.select(item)}/>
                            <br />
                            <p>What percent of your income would you spend on food?</p>
                            <SimpleSelect select={(item) => this.select(item)}/>
                            <br />
                            <p>What percent of your income would you spend on merch?</p>
                            <SimpleSelect select={(item) => this.select(item)}/>
                            <br />
                            <p>What percent of your income would you spend on entertainment?</p>
                            <SimpleSelect select={(item) => this.select(item)}/>
                            <br />
                            <p>What percent of your income would you spend on other things?</p>
                            <SimpleSelect select={(item) => this.select(item)}/>
                            <br />
                            <Button variant = "contained" color = "primary" onClick={()=> {this.setState({graphs: true,questions: true,nameTextField: false,header: false})}}>
                                Submit
                            </Button>
                        </Typography>
                      </Paper>  
                </div>
            )
            :
                    (
                    <div>
                      <Budget />
                    </div>
                    )
        }
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