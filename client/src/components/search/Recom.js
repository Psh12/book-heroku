import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

class Recom extends Component {
  constructor(props){
    super(props);

    this.state = {
      books: [],
      resultBooks: [],
      title_ : this.props.booktitle,
      demographic_ : this.props.bookdem,
      genre_ : this.props.bookgenre };
  }

  fixBook() {
    if (this.state.title_ !== this.props.booktitle) {
      this.setState({ title_: this.props.booktitle });
      this.recomList();
    }
   
  }

  getBooks = async()=>{
    const response = await fetch('http://localhost:5000/books',{
      method: "GET",
    });

    const parseRes = await response.json();
   
    this.setState({books: parseRes});
   
  }

  async componentDidMount() {

    await this.getBooks();
    this.recomList();
  }

  recomList() {
    var results = [];

    // Ask player for genre and demographic
    var userGenre = this.props.bookgen;

    var userDemographic = this.props.bookdem;

    var userTitle = this.props.booktitle;

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
  
    // Clear elements that don't match

    results.splice(matchValues.indexOf(0), results.length);
    matchValues.splice(matchValues.indexOf(0), matchValues.length);

    for (let i = 0; i < results.length; i++) {
      if (results[i]["title"] === userTitle) {
        matchValues.splice(i, 1)
        results.splice(i, 1)
        break
      }
    }
    
    this.setState({ resultBooks: results });
  }

  render() {
    const {resultBooks} = this.state;

    return (
      <div className="App">
      <h3>Recommendations</h3>
       <center>
      { resultBooks.map(book => 
          <div key={book.book_number}>
            <Link onClick={this.fixBook()} to={{pathname: "/results", state: {book: book,} }} className="falseh1"> 
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

export default Recom;
