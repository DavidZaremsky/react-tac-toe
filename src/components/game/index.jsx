import React from 'react';
import Board from '../board/index.jsx';
import { connect } from 'react-redux';
import { setXIsNext, setStepNumber, setHistory } from '../../redux/game/actions';
import { calculateWinner } from './helpers';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(i) {
    const { setXIsNext, xIsNext, setStepNumber, stepNumber, setHistory, history } = this.props;
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    setXIsNext(!xIsNext);
    setStepNumber(stepNumber + 1);
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      tempHistory.concat([
        {
          squares: squares
        }
      ])
    );
  }
  jumpTo(step) {
    const { setStepNumber, setXIsNext } = this.props;
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }
  render() {
    const { xIsNext, stepNumber, history } = this.props;
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
    stepNumber: state.game.stepNumber,
    history: state.game.history
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setXIsNext: action => dispatch(setXIsNext(action)),
    setStepNumber: action => dispatch(setStepNumber(action)),
    setHistory: action => dispatch(setHistory(action))
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
