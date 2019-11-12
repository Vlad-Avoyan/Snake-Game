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
      apple: this.getRandomApple(),
      snake: {
        head: {

          //this is so that the snake is in the center of the game
          row: 9,
          col: 9
        },
        velocity: {
          x: 1,
          y: 0
        },
        tail: []
      }
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.gameLoop()
    }, 1000);
  }

  getRandomApple = () => ({

    // apple shood be somwhere in rows and columns
    row: Math.floor(Math.random() * 20),
    col: Math.floor(Math.random() * 20)
  })

  gameLoop = () => {
    if (this.state.gameOver) return;

    this.setState(({ snake , apple}) => {
      const collidesWithApple = this.collidesWithApple()
      const nexState = {
        snake: {
          ...snake,
          head: {
            row: snake.head.row + snake.velocity.y,
            col: snake.head.col + snake.velocity.x
          },
          tail: [snake.head, ...snake.tail]
        },
        apple: collidesWithApple ? this.getRandomApple() : apple
      }
      if(!collidesWithApple) nexState.snake.tail.pop()

      return nexState;
    }, () => {
      if (this.isOffEdge()) {
        this.setState({
          gameOver: true,
        });
        return;
      }
      
      setTimeout(() => {
        this.gameLoop()
      }, 1000);
    })  
  }

  isOffEdge = () => {
    const { snake } = this.state;

    if (snake.head.col > 19
      || snake.head.col < 0
      || snake.head.row > 19
      || snake.head.row < 0) {
      return true
    }
  }

  collidesWithApple = () => {
    const { apple, snake } = this.state
    return apple.row === snake.head.row
      && apple.col === snake.head.col
  }

  isApple = (cell) => {
    const { apple } = this.state
    return apple.row === cell.row
      && apple.col === cell.col;
  }

  isHead = (cell) => {
    const { snake } = this.state
    return snake.head.row === cell.row
      && snake.head.col === cell.col
  }

  isTail = (cell) => {
    const { snake } = this.state
    return snake.tail.find(inTail => inTail.row === cell.row && inTail.col === cell.col)
  }

  setVelocity = (event) => {
    if (event.keyCode === 38) { // up
      this.setState((prevState) => ({
        snake: {
          velocity: {
            x: 0,
            y: -1
          }
        }
      }))
    } else if (event.keyCode === 40) { //down
      this.setState((prevState) => ({
        snake: {
          velocity: {
            x: 0,
            y: +1
          }
        }
      }))
    } else if (event.keyCode === 39) { // right
      this.setState((prevState) => ({
        snake: {
          velocity: {
            x: 1,
            y: 0
          }
        }
      }))
    } else if (event.keyCode === 37) { //left
      this.setState((prevState) => ({
        snake: {
          velocity: {
            x: -1,
            y: 0
          }
        }
      }))
    }
  }

  render() {
    const { grid, snake, gameOver } = this.state

    return (
      <div onKeyPress={this.setVelocity} className="App">
        {
          gameOver
            ? <h1>Game Over! You Scored {snake.tail.length + 1}!</h1>
            : <section className="grid">
              {

                // paint rows and columns
                grid.map((row, i) => (
                  row.map(cell => (
                    <div key={`${cell.row} ${cell.col}`} className={`cell 
                  ${
                    this.isHead(cell)
                    ? 'head' : this.isApple(cell)
                    ? 'apple' : this.isTail(cell)
                    ? 'tail' : ''
                      }`
                    } >

                    </div>
                  ))
                ))
              }
            </section>
        }

      </div>
    );
  }
}

export default App;
