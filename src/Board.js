import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5
  };

  constructor(props) {
    super(props);
    // this.state = {};
    // for (let y = 0; y < this.props.height; y++) {
    //   for (let x = 0; x < this.props.width; x++) {
    //     this.state[`${x}_${y}`] = Math.floor(Math.random() * 2)
    //   }
    // }
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.state = { board: this.createBoard() };
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      board.push([]);
      for (let x = 0; x < this.props.ncols; x++) {
        board[y].push(false);
      }
    }

    // TODO: create array-of-arrays of true/false values
    return Board.randomizeBoard(board);
  }

  /** handle changing a cell: update board & determine if winner */
  flipCell(y, x, board) {
    // if this coord is actually on board, flip it
    if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
      board[y][x] = !board[y][x];
    }
  }

  static randomizeBoard(board) {
    const maxX = board[0].length;
    const maxY = board.length;
    const clicks = maxX * maxY;
    for (let i = 0; i < clicks; i++) {
      // this.flipCellsAround(
      //   `${Math.floor(Math.random() * maxY)}-${Math.floor(
      //     Math.random() * maxX
      //   )}`,
      //   board
      // );
    }
    return board;
  }

  flipCellsAround(coord) {
    // coords is in the form of 'y-x'
    const board = this.state.board;
    let [y, x] = coord.split('-').map(Number);
    [y, x] = [+y, +x];

    let flipToDo = [[y, x], [y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
    flipToDo.forEach(coords => {
      this.flipCell(coords[0], coords[1], board);
    });

    // TODO: flip this cell and the cells around it

    const hasWon = this.checkWin();
    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({ board, hasWon });
  }

  checkWin() {
    return this.state.board.every(row => row.every(bool => bool));
  }

  renderBoard() {
    const board = this.state.board.map((row, y) => (
      <tr key={y}>
        {row.map((cell, x) => (
          <Cell
            key={`${y}-${x}`}
            id={`${y}-${x}`}
            isLit={cell}
            flipCellsAroundMe={this.flipCellsAround}
          />
        ))}
      </tr>
    ));
    return (
      <table>
        <tbody>{board}</tbody>
      </table>
    );
  }
  /** Render game board or winning message. */

  render() {
    return this.checkWin() ? <p>"You won! How nice"</p> : this.renderBoard();

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}

export default Board;
