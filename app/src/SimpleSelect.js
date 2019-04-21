import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',   
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
    labelWidth: 0,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.select(this.state[event.target.name]);
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="percent">Percent</InputLabel>
          <Select
            native
            value={this.state.age}
            //onChange={this.handleChange('age')}
            input={<FilledInput name="age" id="filled-age-native-simple" />}
            onChange = {(e) => this.handleChange(e)}
            inputProps={{
              name: 'percent',
              id: 'Percent',
            }}
          >
            <option value=""/>

            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={15}>15%</option>
            <option value={20}>20%</option>
            <option value={25}>25%</option>
            <option value={30}>30%</option>
            <option value={35}>35%</option>
            <option value={40}>40%</option>
            <option value={45}>45%</option>
            <option value={50}>50%</option>
            <option value={55}>55%</option>
            <option value={60}>60%</option>
            <option value={65}>65%</option>
            <option value={70}>70%</option>
            <option value={75}>75%</option>
            <option value={80}>80%</option>
            <option value={85}>85%</option>
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={100}>100%</option>        
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);