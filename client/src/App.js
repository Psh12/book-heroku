import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserProfile from './components/login/UserProfile';
import LogIn from './components/login/Login';
import Register from './components/login/Register';
import Search from './components/search/Search';
import Toggle from './components/search/Toggle';
import ResultPage from './components/search/ResultPage';
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    }
  }

// To set isAuthenticated to the boolean value provided
setAuth = boolean => {
  this.setState({isAuthenticated: boolean});
}

//Function to check whether the user is authenticated
checkAuth = async ()=>{
  try {
    const response = await fetch('http://localhost:5000/auth/verify',{
      method: 'GET',
      headers: {token: localStorage.token}
    });
    const parseRes = await response.json();
    parseRes === true ? this.setAuth(true) : this.setAuth(false);
  } catch (error) {
    console.error(error.message);
  }
}

componentDidMount(){
  this.checkAuth();
}

  render() {
    
    return (
        <Router>
        <Navbar auth = {this.state.isAuthenticated} setAuth = {this.setAuth}/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/toggle" component={Toggle}/>
            <Route exact path="/userProfile" render={props => (
                this.state.isAuthenticated ? (<UserProfile {...props} setAuth = {this.setAuth}/>) : (
                <Redirect to= "/login"/>
              )
            )}/>
  
            <Route exact path="/login" render={props => (
              !this.state.isAuthenticated ? (<LogIn {...props} setAuth = {this.setAuth}/>) : (
                <Redirect to= "/userProfile"/>
              )
            )}/>
            <Route exact path="/register" render={props => (
              !this.state.isAuthenticated ? (<Register {...props} setAuth = {this.setAuth}/>) : (
                <Redirect to= "/login"/>
              )
            )}/>
            <Route exact path="/results" component={ResultPage}/>
          </Switch>
        </Router>
    );
  }
}

export default App;