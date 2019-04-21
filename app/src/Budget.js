import React, { Component } from 'react';
import Questions from './Questions';
import SimpleSelect from './SimpleSelect';
import TextFile from './TextFile';
import Progress from './Progress';
import Button from '@material-ui/core/Button';
    
class Budget extends Component {
    //updateItem = (item) => {
        //this.salary=item
    //}
    state = {
    salary: 0,
    header: true,
    nameTextField: true,
    graphs: true,
    questions: false
    }
  render() {
    return (
      <div>

        {!this.state.questions ?
            (
            
            <div style = {styles.header}>
              <Progress  /**salary=this.state.now**//>
              <Button variant="contained" style={styles.button2} onClick={()=> {this.setState({graphs: true,questions: true,nameTextField: false,header: false})}}
              >Create!</Button>
              <Button disabled style = {styles.inBut}>

                </Button>
                <Button variant="contained" id = 'Edit' >
                    Edit
                </Button>   
            </div>
          )
            :
            (
            <div>
              <Questions updateItem={(item) => this.select(item)}/>
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
},
    button2:{
        margin: 'lem'
    }
}

export default Budget;
