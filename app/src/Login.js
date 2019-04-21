import React, { Component } from 'react';
import {TextField, Button, Card} from '@material-ui/core';

//Firebase Configuration
const firebase = require('firebase/app');
require('firebase/auth');

class Login extends Component {
  state = {
    header: true,
    nameTextField: true,
    login: true,
    signup: false,
    userInfo: {
      name: '',
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    let userInfo = this.state.userInfo;
    userInfo[event.target.name] = event.target.value;
    this.setState({userInfo: userInfo});
  }

  submit = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.userInfo.email, this.state.userInfo.password)
    .then((res) => {
      this.props.setUid(res.user.uid);
    })
    .catch(function(err) {
      if(err){alert(err.message)}
    });
  }

  createUser = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.userInfo.email, this.state.userInfo.password)
    .then((res) => {
      this.setState({userInfo: {email: '', password: '', name: ''}})
      this.goBack();
    })
    .catch(function(err) {
      if(err){alert(err.message)}
    });
  }

  goBack = () => {
    this.setState({signup: false,login: true, nameTextField: true, header: true})
  }

  render() {

    return (
      <div className="App">
      <Card style={styles.card}>
        {this.state.header ?
          (<h1 style={styles.header}>SimpliFi Login</h1>)
          :
          (<h1 style={styles.header}>SimpliFi SignUp</h1>)
        }

        <div style={styles.body}>
          {!this.state.nameTextField ?
            (<TextField
              label="Name"
              value = {this.state.userInfo.name}
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              style={styles.input}
              name="name"
            />)
            :
            null
          }
          <div>
            <TextField
              label="Email Address"
              value = {this.state.userInfo.email}
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              style={styles.input}
              name="email"
            />
          </div>
          <div>
            <TextField
              label="Password"
              value= {this.state.userInfo.password}
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              style={styles.input}
              type='password'
              name="password"
            />
          </div>
          {this.state.login ?
            (<Button variant="contained" style={styles.button1} onClick={()=> this.submit()}
          >Login</Button>)
          :
          null
          }

          {!this.state.signup ?
            (
            <div>
              <br/>
              <p> Don't have an account?</p>
              <Button variant="contained" style={styles.button2} onClick={()=> {this.setState({signup: true,login: false,nameTextField: false,header: false})}}
              >Sign Up!</Button>
            </div>)
            :
            (
            <div>
              <Button variant="contained" style={styles.button1} onClick={()=> {this.createUser()}}
              >Create</Button>
            <Button variant="contained" style={styles.button2} onClick={()=> {this.goBack()}}
              >Go Back</Button>
            </div>)
          }

        </div>
        </Card>
      </div>
    );
  }
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '1em'
  },
  body: {
    textAlign: 'center'
  },
  input: {
    width: '90%'
  },
  button1: {
    margin: '1em',
    backgroundColor: '#1fcd81'
  },
  button2: {
    margin: '1em'
  },
  card: {
    margin: '7em 2em 2em ',
    paddingBottom: '1em'
  }
}

export default Login;
