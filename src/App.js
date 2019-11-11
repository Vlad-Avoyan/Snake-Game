import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
     const grid = []

    for (let row = 0; row < 10; row++) {

      //this Array for columns and rows
      const cols = []
      for (let col = 0; col < 10; col++) {

        //here we push column and row where snake is that moment
        cols.push({
          row,
          col
        })
      }
      grid.push(cols);
    }
  }
  render() {
    return (
      <div className="App">
        <section className="grid">

        </section>
      </div>
    );
  }
}

export default App;
