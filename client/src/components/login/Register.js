import React, { Component } from 'react';
import {toast} from 'react-toastify';
import './Login.css';

class Register extends Component {
  constructor () {
    super()
    this.state = {
        email: '',
        password: '',
        name: ''
    }
  }

  handleChange = (e) => {
    /*
    const updatedUser = {...this.state}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue
*/
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {...this.state};
      const response = await fetch("http://localhost:5000/auth/register",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      if(parseRes.token){
        localStorage.setItem("token", parseRes.token);
        this.props.setAuth(true);
        toast.success("Registration Successful");
      }
      else{
        this.props.setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  render () {

    return (
      <div className="body">
        <div className="register">
          <h3 className='headers'>Register</h3>
          <center>
            <form action="" method="" onSubmit={this.handleSubmit}>
              <table id="prompts">
                <tr>
                  <td>
                    <input type="text" name="name" placeholder="Username" onChange={this.handleChange} value={this.state.name} autoComplete = "off" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="email" name="email" placeholder="E-Mail" onChange={this.handleChange} value={this.state.email} autoComplete = "off" required/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="password" name="password" placeholder="Password" onChange = {this.handleChange} value = {this.state.password}/>
                  </td>
                </tr>
              </table>
              <button className="submit">Register</button>
            </form>
          </center>
        </div>
      </div>
    )
  }
}

export default Register