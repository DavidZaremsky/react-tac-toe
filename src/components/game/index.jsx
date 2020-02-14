import React from 'react';
import { Board } from '../board/index.jsx';
import { connect } from 'react-redux';
import { setXIsNext, setStepNumber } from '../../redux/game/actions';

// import { calculateWinner } from './index';
//const store = createStore(combineReducers)
//export default store;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  //consturctor will not be needed once squares is removed
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ]
      //stepNumber: 0,
      //xIsNext: true
    };
  }
  handleClick(i) {
    const { setXIsNext, xIsNext, setStepNumber, stepNumber } = this.props;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    setXIsNext(!xIsNext);
    setStepNumber(stepNumber + 1);
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  render() {
    const { xIsNext, stepNumber } = this.props;
    const history = this.state.history;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (<li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>);
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }
    else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return (<div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => this.handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => (
  {
    xIsNext: state.game.xIsNext,
    stepNumber: state.game.stepNumber
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setXIsNext: action => dispatch(setXIsNext(action)),
    setStepNumber: action => dispatch(setStepNumber(action))
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
