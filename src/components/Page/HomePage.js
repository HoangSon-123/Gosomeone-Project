import React from "react";
// import { withRouter } from "react-router";
// import ReactDOM from 'react-dom'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Log_flag: false,
      Sign_flag: false,
      username: "",
      password: ""
    };
  }
  
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div className = "Input-Username">
          <p>Username:  
            <input value = {this.state.username} type = "text"
            onChange = {(event) => this.handleOnChangeUsername(event)}
            />
          </p>
        </div>

        <div className = "Input-Password">
          <p>Password: 
            <input value = {this.state.password} type = "text"
            onChange = {(event) => this.handleOnChangePassword(event)}
            />
          </p>
        </div>

        <div className = "Login-button">
          <button onClick={() => this.setState({ Log_flag: true })}>
            Login
          </button>
        </div>
        
        <div className = "Signin-button">
          <button onClick={() => this.setState({ Sign_flag: true })}>
            Sign in
          </button>
        </div>
      </div>
    );
  }
 }

export default HomePage;
