import React, {Component} from 'react';
import Recommendations from './Recom.js';
import {toast} from 'react-toastify';
import './ResultPage.css';

class ResultPage extends Component {
 

    addBook = async (book_number)=>{
      
      const response = await fetch('http://localhost:5000/results', {
        method: "POST",
        headers:{"token": localStorage.token,"Content-Type": "application/json"},
        body: JSON.stringify({book_number})
      })
      const parseRes = await response.json();
      parseRes === "Successfully Added"? toast.success(parseRes) : toast.error(parseRes);
    }

   

  render() {
    return (
        <div>
          <center>
            <div className="book">
              <h1 className="title">
                {this.props.location.state.book.title}
              </h1>
              <table>
                <tr>
                  <th>
                    <img style={{height: 200}} src= {this.props.location.state.book.link} alt="result"/>
                    <button className="add-btn" type="button" onClick = {()=>this.addBook(this.props.location.state.book.book_number)}>Click to Add</button>
                  </th>
                  <td>
                    <div>Author: {this.props.location.state.book.author_name}</div>
                    <div>Genre: {this.props.location.state.book.genre}</div>
                    <div>Target Audience: {this.props.location.state.book.demographic}</div>
                    <br></br>
                    <div>Synopsis: {this.props.location.state.book.synopsis}</div>
                  </td>
                </tr> 
              </table>
            </div> 
          </center>
          <br></br>
          <center>
            <Recommendations bookgen = {this.props.location.state.book.genre} bookdem = {this.props.location.state.book.demographic} booktitle = {this.props.location.state.book.title}/>
          </center>
        </div>
    );
  }
}

export default ResultPage;