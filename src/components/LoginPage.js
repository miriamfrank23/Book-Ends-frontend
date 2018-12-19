import React, { Component } from 'react'

class LoginPage extends Component {

  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
  }

  controlledForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      // // console.log(this.state)
    })
  }

  createNewUser = (e) => {
    // debugger
    e.preventDefault()
    fetch(`http://localhost:3001/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password
        }
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(parsed => {
      // debugger
      if (parsed.user) {
        // debugger
        window.localStorage.setItem('jwt', parsed.jwt)
        // // console.log(window.localStorage)
        this.props.setCurrentUser(parsed.user)
      }
    })
  }

  logUserIn = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3001/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
          // window.alert('Invalid username or password')
       } else {
         return response.json()
       }
     })
    .then(parsed => {
      if (parsed.user) {
        window.localStorage.setItem('jwt', parsed.jwt)
        // // console.log(window.localStorage)
        this.props.setCurrentUser(parsed.user)
      }
    })
    .catch(error => {
      // // console.log(error)
    })
  }

  render () {
    return (
      <div id='formsContainer' onSubmit={this.logUserIn}>
        <div className='loginImage'>
        </div>
      <form id='loginForm'>
      <h2>
        Sign in here!
      </h2>
      <h3>
        Email:
      </h3>
      <input type="text" name="email" onChange={this.controlledForm}/>
      <h3>
        Password:
      </h3>
      <input type="password" name="password" onChange={this.controlledForm}/>
      <br/>
      <input type="submit" value="Sign in" className='loginButtons'/>
      </form>

      <form onSubmit={this.createNewUser} id='signupForm'>
      <h2>
        New here? Create an account!
      </h2>
      <h3>
        First name:
      </h3>
      <input type="text" name="first_name" onChange={this.controlledForm}/>
      <h3>
        Last name:
      </h3>
      <input type="text" name="last_name" onChange={this.controlledForm}/>
      <h3>
        Email:
      </h3>
      <input type="text" name="email" onChange={this.controlledForm}/>
      <h3>
        Password:
      </h3>
      <input type="password" name="password" onChange={this.controlledForm}/>
      <br/>
      <input type="submit" value="Sign up" className='loginButtons'/>
      </form>

      </div>
    )
  }


}

export default LoginPage
