import React, { Component } from 'react';
import {MenuItem, TextField, Button, Card} from '@material-ui/core';


class Login extends Component {
  state = {
    header: true,
    nameTextField: true,
    login: true,
    signup: false
  }
  userInfo = {
    name: '',
    email: '',
    password: ''
  }



  handleNameChange(event) {
    this.setState({name: event.target.value})
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }
  handlePassChange(event) {
    this.setState({password: event.target.value})
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

        <body style={styles.body}>
          {!this.state.nameTextField ?
            (<TextField
              id="standard-name"
              label="Name"
              value = {this.state.name}
              onChange={this.handleNameChange.bind(this)}
              margin="normal"
              style={styles.input}
            />)
            :
            null
          }
          <div>
            <TextField
              id="standard-name"
              label="Email Address"
              value = {this.state.email}
              onChange={this.handleEmailChange.bind(this)}
              margin="normal"
              style={styles.input}
            />
          </div>
          <div>
            <TextField
              id="standard-name"
              label="Password"
              value= {this.state.password}
              onChange={this.handlePassChange.bind(this)}
              margin="normal"
              style={styles.input}
              type='password'
            />
          </div>
          {this.state.login ?
            (<Button variant="contained" style={styles.button1} onClick={()=> {console.log({email: this.state.email, password: this.state.password})}}
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
              <Button variant="contained" style={styles.button1} onClick={()=> {console.log({name: this.state.name, email: this.state.email, password: this.state.password})}}
              >Create</Button>
              <Button variant="contained" style={styles.button2} onClick={()=> {this.setState({signup: false,login: true,nameTextField: true,header: true})}}
              >Go Back</Button>
            </div>)
          }

        </body>
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
    width: '50%'
  },
  button1: {
    margin: '1em',
    backgroundColor: '#1fcd81'
  },
  button2: {
    margin: '1em'
  },
  card: {
    margin: '15em 2em 2em '
  }
}

export default Login;
