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

const victoryMessage = <p>You won! How nice</p>;

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5
  };

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = { board: this.createBoard() };
  }

  createBoard() {
    // Make a board. Make it random
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      board.push([]);
      for (let x = 0; x < this.props.ncols; x++) {
        board[y].push(false);
      }
    }

    return Board.randomizeBoard(board);
  }

  static randomizeBoard(board) {
    // To guarantee a solvable board, click randomly for awhile
    // Number of random clicks equals the number of squares on the board
    const maxX = board[0].length;
    const maxY = board.length;
    const clicks = maxX * maxY;
    for (let i = 0; i < clicks; i++) {
      Board.flipCellsAround(board, [
        Math.floor(Math.random() * maxY),
        Math.floor(Math.random() * maxX)
      ]);
    }
    return board;
  }

  static flipCellsAround(board, coord) {
    // Flip cell and all adjacent cells
    const y = coord[0];
    const x = coord[1];

    let flipToDo = [[y, x], [y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
    flipToDo.forEach(coords => {
      Board.flipCell(coords[0], coords[1], board);
    });

    return board;
  }

  static flipCell(y, x, board) {
    // if this coord is actually on board, flip it
    if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
      board[y][x] = !board[y][x];
    }
  }

  click(coord) {
    // coord is an array of length two, [y x]
    // Toggle appropriate cells and check for a win
    const board = Board.flipCellsAround(this.state.board, coord);
    const hasWon = Board.checkWin(this.state.board);

    this.setState({ board, hasWon });
  }

  static checkWin(board) {
    // See if every cell in the logical board is true
    return board.every(row => row.every(bool => bool));
  }

  renderBoard() {
    // Create an array of tr's which contain Cells. The Cells render as td
    const board = this.state.board.map((row, y) => (
      <tr key={y}>
        {row.map((cell, x) => (
          <Cell
            key={`${y}-${x}`}
            id={`${y}-${x}`}
            isLit={cell}
            click={this.click}
          />
        ))}
      </tr>
    ));
    // The board, being made of tr's, must be under a tbody under a table
    return (
      <table>
        <tbody>{board}</tbody>
      </table>
    );
  }

  render() {
    return Board.checkWin(this.state.board)
      ? victoryMessage
      : this.renderBoard();
  }
}

export default Board;
