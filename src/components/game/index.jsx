import React, { Fragment } from 'react';
import Board from '../board/index.jsx';
import { connect } from 'react-redux';
import { setXIsNext, setStepNumber, setHistory } from '../../redux/game/actions';
import { calculateWinner } from './helpers';
import Button from '@material-ui/core/Button';
import { Grid, Typography, List, Collapse, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import styles from './styles';

const useStyles = makeStyles(styles);

const Game = props => {
  const classes = useStyles();
  const handleClick = i => {
    const { setXIsNext, xIsNext, setStepNumber, stepNumber, setHistory, history } = props;
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
  const [open, setOpen] = React.useState(true);
  const handleHistoryClick = () =>{
    setOpen(!open);
  };
  const jumpTo = step => {
    const { setStepNumber, setXIsNext } = props;
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }
  const { xIsNext, stepNumber, history } = props;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move ' + move :
      'Game Start';
    return (<li key={move}>
      <Button
        variant="outlined"
        size="small"
        fullWidth="true"
        onClick={() => jumpTo(move)}>
        {desc}
      </Button>
    </li>);
  });
  let status;
  if (winner) {
    status = winner + " Wins!";
  }
  else {
    status = (xIsNext ? "X" : "O") + "'s Turn";
  }
  return (
  <Fragment>
  <Grid container spacing={3} 
  direction='column'
  alignItems="center"
  justify="flex-start"
  >
    <Grid item xs={12}>
      <Typography variant={'h4'}>
        {status}
      </Typography>
    </Grid>
      <Grid item xs={12}>
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </Grid>
      <ListItem button onClick={handleHistoryClick}>
        <ListItemText primary="History" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
              {moves}
          </ListItem>
        </List>
      </Collapse>
    </Grid>
  </Fragment>
  );
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
