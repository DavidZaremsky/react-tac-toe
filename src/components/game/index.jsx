import React, { Fragment } from "react";
import Board from "../board/index.jsx";
import { connect } from "react-redux";
import {
  setXIsNext,
  setStepNumber,
  setHistory,
} from "../../redux/game/actions";
import { calculateWinner } from "./helpers";
import Button from "@material-ui/core/Button";
import {
  Grid,
  Typography,
  List,
  Collapse,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Game = (props) => {
  let currentStatus = React.useState();
  const classes = useStyles();
  const handleClick = (i) => {
    const { stepNumber, history } = props;
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(current.squares);

    switch (calculateWinner(current.squares)) {
      case "X":
        console.log("X wins");
        break;
      case "O":
        console.log("O Wins!");
        break;
      case "Draw":
        console.log("It's a Draw");
        break;
      default:
    }

    if (winner) {
      return;
    }

    // if square is full, alert 'Square is Taken', end
    // if square is empty, continue
    if (squares[i]) {
      console.log("Sorry Buster, That Square is Taken");
      return;
    }

    turnHandler(i);
  };

  function turnHandler(turn) {
    const {
      setXIsNext,
      xIsNext,
      setStepNumber,
      stepNumber,
      setHistory,
      history,
    } = props;
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();

    setXIsNext(!xIsNext);
    setStepNumber(stepNumber + 1);
    squares[turn] = xIsNext ? "X" : "O";
    setHistory(
      tempHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    console.log(squares);
    return;
  }

  const [open, setOpen] = React.useState(true);
  const handleHistoryClick = () => {
    setOpen(!open);
  };

  const jumpTo = (step) => {
    const { setStepNumber, setXIsNext } = props;
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // const History = () => {
  //   // input: history, stepNumber
  //   // output: a dropdown list containing jumpTo history buttons

  //   const { stepNumber, history } = props;
  //   const current = history[stepNumber];
  //   const moves = history.map((step, move) => {
  //     const desc = move ? "Go to move " + move : "Game Start";
  //     return (
  //       <div>
  //         <List key={move}>
  //           <Button
  //             className={classes.button}
  //             variant="outlined"
  //             size="small"
  //             fullWidth="true"
  //             onClick={() => jumpTo(step)}
  //           >
  //             {desc}
  //           </Button>
  //         </List>
  //       </div>
  //     );
  //   });
  //   return;
  // };

  const { xIsNext, stepNumber, history } = props;
  const current = history[stepNumber];
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move " + move : "Game Start";
    return (
      <List key={move}>
        <Button
          className={classes.button}
          variant="outlined"
          size="small"
          fullWidth={true}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </Button>
      </List>
    );
  });

  const Status = () => {
    const winner = calculateWinner(current.squares);
    if (winner === "Draw") {
      currentStatus = "It's a Draw! Refresh to Play Again";
    } else if (winner) {
      currentStatus = winner + " Wins! Refresh to Play Again";
    } else {
      currentStatus = (xIsNext ? "X" : "O") + "'s Turn";
    }
    return (
      <div>
        <Typography variant={"h4"}>{currentStatus}</Typography>
      </div>
    );
  };

  return (
    <Fragment>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item xs={12}>
          <Status />
        </Grid>
        <Grid item xs={12}>
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </Grid>
        {/* <History /> */}
        <ListItem button onClick={handleHistoryClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
          <ListItemText align="center" primary="History" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="flex-start"
            >
              {moves}
            </Grid>
          </List>
        </Collapse>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  xIsNext: state.game.xIsNext,
  stepNumber: state.game.stepNumber,
  history: state.game.history,
});

const mapDispatchToProps = (dispatch) => ({
  setXIsNext: (action) => dispatch(setXIsNext(action)),
  setStepNumber: (action) => dispatch(setStepNumber(action)),
  setHistory: (action) => dispatch(setHistory(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
