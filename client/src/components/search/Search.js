import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './Search.css';



function searchingFor(term){
  return function(x){
    return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      books: [],
      term: "",
    }

    this.searchHandler = this.searchHandler.bind(this);
  }

  getBooks = async()=>{
    const response = await fetch('http://localhost:5000/books',{
      method: "GET",
    });

    const parseRes = await response.json();
   
    this.setState({books: parseRes});
   
  }

  componentDidMount(){
    this.getBooks();
  }

  searchHandler(event){
    this.setState({ term: event.target.value })
  }


  render() {
    const {term, books} = this.state;
    const isTermBlank = term;

    return (
      <div className="App">
        <div className="top">
          <h1>Book Search</h1>
          <div className="search-comp">
            <Link to='/toggle'>
              <button type="button">Toggle</button>
            </Link>
            <form action="" method="">
              <input type="text" name="search" placeholder="🔍 Search" onChange={this.searchHandler} value={term} autoComplete = 'off'/>
            </form>
          </div>
          <br/>
        </div>
       <center>
      { isTermBlank.length > 1 &&
        books.filter(searchingFor(term)).map(book => 
          <div key={book.book_number}>
            <Link to={{pathname: "/results", state: {book: book,} }} className="falseh1">
              <center>
                <div className="results">
                  <table>
                    <tbody>
                    <tr>
                      
                      <th rowSpan="2">
                        <img src={book.link} alt="book cover"/>
                      </th>
                      <td>
                          <div><h3>{book.title}</h3></div>
                          <div><p>{book.author_name}</p></div>
                      </td>
                      
                    </tr>
                    </tbody>
                  </table>
                </div>
              </center>
            </Link>
          </div>
        )
      }
      </center>
      </div>
    );
  }
}

export default Search;