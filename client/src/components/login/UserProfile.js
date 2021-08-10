import React, {Component} from 'react';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import './userProfile.css';

class UserProfile extends Component {
  constructor () {
    super()
    this.state = {
        name: '',
        userData: []
        
    }
  }

  // Gets the username of the user 
   getName = async ()=>{
     try {
      const response = await fetch("http://localhost:5000/dashboard",{
        method: "GET",
        headers: {"token": localStorage.token},
      });
      const parseRes = await response.json();
      this.setState({name: parseRes.user_name});
     } 
     catch (error) {
       console.error(error.message);
     } 
   }

   getBooks = async ()=>{
     try {
       const response = await fetch("http://localhost:5000/dashboard/userBooks", {
         method: "GET",
         headers: {"token": localStorage.token},
       });
       const parseRes = await response.json();
      
       this.setState({userData: parseRes});
     } catch (error) {
       console.error(error.message);
     }
   }
  


   deleteBook = async (book_number, user_id)=>{
     try {
       const response = await fetch(`http://localhost:5000/dashboard/userBooks?user_id=${user_id}&book_number=${book_number}`, {
         method: 'DELETE',
         headers: {"token": localStorage.token}
       });
       const parseRes = await response.json();
       if(parseRes.length > 0){
         toast.success("Successfully deleted");
       }
       
       // Set state so that you don't have to refresh to see the changes after deleting the book
       const newData = this.state.userData.filter(data => data.ub_id !== parseRes[0].ub_id);

       this.setState({userData: newData});
       
       
     } catch (error) {
       console.error(error.message);
     }
   }
   

  componentDidMount(){
    this.getName();
    this.getBooks();
  }
  render() {
   
    return (
        <div className = "profile">
          <center>
            <h1>Welcome To Your Dashboard {this.state.name}</h1>
            <div className = 'grid-container'>
           {
             this.state.userData.map(book =>{
               
              return (
               <div key = {book.book_number}>
                 <Link to = {{pathname: "/results", 
                state:{
                  book: book,
                }
              }}><img className = "effects" src={book.link} alt ={book.title} width = "200" height = "250"></img></Link>
                 <button className = 'delete-btn' onClick={()=>this.deleteBook(book.book_number, book.user_id )}>Delete</button>
               </div>
             )
              }
             )
           }
           </div>
          </center>
        </div>
    );
  }
}

export default UserProfile;
