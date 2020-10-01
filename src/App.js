import React,  {Component} from 'react';
import './App.css';
import DATA from './data';


class App extends Component{
  state = {
    item: null,
    found: false,
    iterations: 0,
  }

  handleSubmit (ev) {
    //needs to read num and searchType off the form
    //pass the values to the appropriate handling function
    //update state with item, iterations, found
    ev.preventDefault();
  
    const item = parseInt(ev.target.num.value);
    const searchType = ev.target.searchType.value;
  
    if (searchType === 'linear') {
      this.setState(this.linearSearch(DATA, item))
    }
    if (searchType === 'binary') {
      const data = DATA.sort((a, b) => a - b);
      this.setState(this.binarySearch(data, item))
    }
  }

  linearSearch (arr, item) {
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
      iterations++;
      if (arr[i] === item) {
        return {
          item,
          found: true,
          iterations,
        }
      }
    }
    return {
      item,
      found: false,
      iterations,
    }
  }

  binarySearch (arr, item, start = 0, end = arr.length - 1, iterations = 0) {
    iterations++;
    if (start > end) {
      return {
        item,
        found: false,
        iterations
      }
    }
    const index = Math.floor((start + end) / 2);
    const midVal = arr[index];
    if (item === midVal) {
      return {
        item,
        found: true,
        iterations
      }
    }
    else if (item > midVal) {
      return this.binarySearch(arr, item, index + 1, end, iterations);
    }
    else if (item < midVal) {
      return this.binarySearch(arr, item, start, index - 1, iterations);
    }
  }

  render () {
    return (
      <div className="App">
        <form onSubmit={ev => this.handleSubmit(ev)}>
          <label htmlFor="num">Number:</label>
          <input type="number" id="num" name="num" required></input>
          <label htmlFor="linear">Linear Search</label>
          <input type="radio" name="searchType" id="linear" value="linear"required></input>
          <label htmlFor="binary">Binary Search</label>
          <input type="radio" name="searchType" id="binary" value="binary"></input>
          <button type="submit">Submit</button>
        </form>
        {this.state.item !== null && (<div>
          <p>Searching for item {this.state.item}</p>
          <p>Found? {this.state.found ? "true" : "false"}</p>
          <p>In {this.state.iterations} iterations</p>
        </div>)}
      </div>
    );
  }    
}

export default App;
