import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Search.css';


class Toggle extends Component {
  constructor(props){
    super(props);

    this.state = {
      books: [],
      resultBooks: [],
      check: "",
      dem: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleDemChange = this.handleDemChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event) {
    this.setState({ check: event.target.value });
  }

  handleDemChange(event) {
    this.setState({ dem: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    var results = [];
    var userGenre = this.state.check;
    var userDemographic = this.state.dem;
    var criteria = (userGenre !== "") + (userDemographic !== "");

    // Set all book match values to 0
    var matchValues = [];

    for (let i = 0; i < this.state.books.length; i++) {
      matchValues.push(0);
    };

    // Run through database list and if genre and demographics match, increase match value

    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i]["genre"] === userGenre) {
        matchValues[i] += 1;
      };
      if (this.state.books[i]["demographic"] === userDemographic) {
        matchValues[i] += 1;
      };
      results.push(this.state.books[i]);
    };

    // Quick sort

    function swap(arr, i, j){
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      var temp2 = results[i];
      results[i] = results[j];
      results[j] = temp2;
    }

    function partition(arr, pivot, left, right){
      var pivotValue = arr[pivot],
          partitionIndex = left;

      for(let i = left; i < right; i++){
        if(arr[i] > pivotValue){
          swap(arr, i, partitionIndex);
          partitionIndex++;
        }
      }
      swap(arr, right, partitionIndex);
      return partitionIndex;
    }
      
    function quickSort(arr, left, right){
      var len = arr.length, 
      pivot, 
      partitionIndex;


      if(left < right){
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right);
    
       //sort left and right
      quickSort(arr, left, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, right);
      }
      return arr;
    }

    // Sort
    quickSort(matchValues, 0, matchValues.length - 1);
    
    // Clear elements that don't match by running through the list from the last element

    for (let i = results.length - 1; i >= 0; i--) {
      // Delete last element if its value is less than the number of inputs or it's equal to 0
      if (matchValues[i] < criteria || matchValues[i] === 0) {
          matchValues.pop()
          results.pop()
      }
    }
    this.setState({ resultBooks: results });
  }

  render() {
    const {resultBooks} = this.state;

    return (
      <div className="App">
        <div className="top">
          <h1>Filtered Search</h1>
            <div className="toggle-comp">
              <Link to='/search'>
                <button className='btns'>Normal Search</button>
              </Link>
            </div>
          <center>
            <form action="" method="" onSubmit={this.handleSubmit}>
              <table id="filters">
                <tbody>
                <tr>
                  <td>
                    <label for="genre">Genre: </label>
                    <select id="genre" name="genre" value={this.state.check} onChange={this.handleChange}>
                      <option value=""></option>
                      <option value="Action">Action</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Historical Fiction">Historical Fiction</option>
                      <option value="Horror">Horror</option>
                      <option value="Romance">Romance</option>
                      <option value="Satire">Satire</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Speculative">Speculative</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Western">Western</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="demo">Age Demographic: </label>
                    <select id="demo" name="demo" value={this.state.dem} onChange={this.handleDemChange}>
                      <option value=""></option>
                      <option value="Children">Children</option>
                      <option value="Teenagers">Teenagers</option>
                      <option value="Young Adult">Young Adult</option>
                      <option value="Adult">Adult</option>
                    </select>
                  </td>
                </tr>
                </tbody>
              </table>
              <div className="toggle-submit">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </center>
        </div>
       <center>
      { resultBooks.map(book => 
          <div key={book.book_number}>
            <Link to={{pathname: "/results", state: {book: book,} }} className="falseh1">
              <center>
                <div className="results">
                  <table>
                    <tbody>
                    <tr>
                      <th rowspan="2">
                        <img src={book.link} alt="book cover"/>
                      </th>
                      <td>
                          <div><h3>{book.title}</h3></div>
                          <div><p>{book.author}</p></div>
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

export default Toggle;