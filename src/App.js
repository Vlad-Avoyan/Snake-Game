import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    const grid = []

    for (let row = 0; row < 20; row++) {

      //this Array for columns and rows
      const cols = []
      for (let col = 0; col < 20; col++) {

        //here we push column and row where snake is that moment
        cols.push({
          row,
          col
        })
      }
      grid.push(cols);
    }
    this.state = {
      grid,
      apple: {

        // apple shood be somwhere in rows and columns
        row: Math.floor(Math.random() * 20),
        col: Math.floor(Math.random() * 20)
      },
      snake: {
        head: {

          //this is so that the snake is in the center of the game
          row: 9,
          col: 9
        }
      }
    }
  }

  isApple(cell) {
    const { apple } = this.state
    return apple.row === cell.row
    && apple.col === cell.col
  }

  isHead(cell) {
    const { snake } = this.state
    return snake.head.row === cell.row
    && snake.head.col === cell.col
  }

  render() {
    const { grid, apple } = this.state

    return (
      <div className="App">
        <section className="grid">
          {

            // paint rows and columns
            this.state.grid.map((row, i) => {
              return row.map(cell => (
                <div className={`cell 
                ${
                  this.isApple(cell)
                    ? 'apple' : ''}`} >

                </div>
              ))
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
