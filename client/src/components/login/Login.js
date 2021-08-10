import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify';
import "./Login.css";

class LogIn extends Component {
  constructor () {
    super()
    this.state = {
        email: '',
        password: ''
      }
  }


// Updates the state if on change in the text field
  handleChange = (e) => {
    
    this.setState({[e.target.name]: e.target.value})
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {...this.state};
   
      const response = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      if(parseRes.token){
        localStorage.setItem("token", parseRes.token);
        this.props.setAuth(true);
        toast.success("Logged In Successfully");
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
  		    <h3 className='headers'>Login</h3>
          <center>
            <form action="" method="" onSubmit={this.handleSubmit}>
              <table id="prompts">
                <tr>
                  <td>
                    <input type="email" name="email" placeholder="E-Mail" onChange={this.handleChange} value={this.state.email} autoComplete = "off" required/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="password" name="password" placeholder="Password" value = {this.state.password} onChange={this.handleChange}/>
                  </td>
                </tr>
              </table>
              <button className="submit">Login</button>
            </form>
            <Link to='/register'>
              <button className="submit">Register</button>
            </Link>
          </center>
        </div>
      </div>
    )
  }
}

export default LogIn
