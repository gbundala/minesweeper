import React, { useEffect, useRef, useState } from "react";
import { createBoard } from "../../utils/createBoard";
import Cell from "../Cell/Cell";
import "./Board.css";

export default function Board({
  gridWidth,
  quantityOfBombs,
  restartGame,
  setWinStatus,
  winStatus,
  gameover,
  setGameover,
}) {
  const [grid, setGrid] = useState([]);
  const [arrayOfCellsWithBomb, setArrayOfCellsWithBomb] = useState([]);
  const [flagShowTrigger, setFlagShowTrigger] = useState(false);

  // the state variable is not used hence the pattern below
  const [, setArrayOfCellsToUnveil] = useState([]);

  // We store the countof Flags in the current property of object
  // returned by useRef as we don't want the value to be reset
  // in between re-renders (hence can't use a 'let' or 'const')
  // also we don't want it to be a state variable as well
  // hence useRef provides this escape hatch as per the docs
  // https://beta.reactjs.org/learn/referencing-values-with-refs
  const countOfFlagsRef = useRef(0);

  // In line with the above comments, we also store the count of
  // matched flags with the bombs to avoid the data being
  // lost on re-renders as we want to track the number
  // of matches in order to determine whether the user
  // has WON the game or not!
  const countOfMatchedFlagsWithBombsRef = useRef(0);

  // we define the array to store the cells that will be touched
  // as a result of the recursion. we will push the indices of the cells
  // that we want to be revealed
  // This is an acceptable pattern in accordance with the react docs
  // as all the mutation is done within a single render cycle
  // it is called local mutation, refer to the react docs below
  // https://beta.reactjs.org/learn/keeping-components-pure#local-mutation-your-components-little-secret
  let indicesOfRecursedCells = [];

  // Cells with Bombs array
  let cellsWithBomb = [];

  /**
   *
   * KEY: We need to include the these handler functions in the body
   * of the component here instead of a separate file in utils in
   * order to take advantage of useState hooks
   * Alternatively we would have needed to use some other advanced
   * state management patterns/libraries such as redux
   *
   */

  /** START OF THE RECURSIVE CHECK OF ADJACENT CELLS */

  // We define the recursive checking of cells below
  // this function will only be called when the user clicks
  // on a cell with zero surrounding adjacent bombs
  // so that it recursively checks whether there other similar
  // cells with zero bombs until it breaks out of the recursion
  // as per the conditions set in the handleClickCell function
  function recursivelyCheckAdjacentCells(currentCellIdx, gridWidth, grid) {
    // check whether the index is divisible by setting the variable
    // to the result of the modulus operator of index and the width
    const isIndexDivisibleByWidth = currentCellIdx % gridWidth;

    // store the value of whether the left side or right side divisible
    // to determine the left and right edges of the grid
    const isCellOnLeftEdge = isIndexDivisibleByWidth === 0;
    const isCellOnRightEdge = isIndexDivisibleByWidth === gridWidth - 1;

    // The recursion needs to run after a certain time after
    // all the checks in the handleCellClick function happen
    // basically, we delegate this task to the event loop by
    // wrapping it around the asynchronous setTimeout call
    // we therefore conduct the same check as with the createBoard()
    // function by checking around the adjacent cells in a
    // systematic manner
    setTimeout(() => {
      // left cell except the first one
      if (currentCellIdx > 0 && !isCellOnLeftEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) - 1;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // north-east adjacent cell
      if (currentCellIdx > 9 && !isCellOnRightEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) + 1 - gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // checking the cell above the current one
      if (currentCellIdx > 10) {
        const nextNewCellIdx = parseInt(currentCellIdx) - gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // north west cell
      if (currentCellIdx > 11 && !isCellOnLeftEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) - 1 - gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // adjacent right side cell
      if (currentCellIdx < 98 && !isCellOnRightEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) + 1;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // south- west cell
      if (currentCellIdx < 90 && !isCellOnLeftEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) - 1 + gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // south- east cell
      if (currentCellIdx < 88 && !isCellOnRightEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) + 1 + gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // cell below
      if (currentCellIdx < 89) {
        const nextNewCellIdx = parseInt(currentCellIdx) + gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }
    }, 150);
  }

  /******  END OF RECURSIVE CHECK OF ADJADCENT CELLS *****/

  /**
   *
   * START OF THE HANDLE CELL CLICK FUNCTION
   *
   * */
  function handleCellClick(idx, cell) {
    const currentCellIdx = idx;

    if (gameover) return;

    if (winStatus) return;

    if (cell.shown || cell.flag) return;

    if (cell.hasBomb) {
      //alert to notify user of the fact that they have lost the game
      alert("BOOOOOOM!!! YOU LOST");
      gameOverTrigger(currentCellIdx, grid);
      return;
    }

    if (cell.countOfAdjacentBombs === 0) {
      recursivelyCheckAdjacentCells(currentCellIdx, gridWidth, grid);
      // we then set the value of the shown property to true
      cell.shown = true;

      // We use the flagShowTrigger here as well to trigger a re-render
      // in order to allow the child to re-render as well to show
      // the changes in the affected cells
      // Refer to the HACK comments below for more details on this
      // pattern
      setFlagShowTrigger(!flagShowTrigger);
    } else {
      cell.shown = true;

      // We also use the flagShowTrigger as above
      setFlagShowTrigger(!flagShowTrigger);

      setArrayOfCellsToUnveil(indicesOfRecursedCells);
      indicesOfRecursedCells = [];
    }
  }

  /****** END OF THE HANDLE CLICK FUNCTION  */

  // GameOver Handler
  function gameOverTrigger(cellIdx, grid) {
    setGameover(true);

    for (let idx = 0; idx < grid.length; idx++) {
      if (grid[idx].hasBomb) {
        cellsWithBomb.push(idx);
      }
    }

    setArrayOfCellsWithBomb(cellsWithBomb);
  }

  // Adding a Flag
  function addingFlag(cell) {
    if (gameover) return;

    // we want to limit the number of flags that a user can put
    // in the grid to the total number of bombs, no further
    // also we only want to proceed in adding a flag if cell the is not
    // yet shown, as we don't want to add flags to cells that have
    // already been revealed.
    // The code inside the if statement will only be read if the
    // condition inside the if statement is met. Also a key
    // feature here is that if the user exhausts all the flags
    // they will not be able to remove them, hence they have to
    // use the flags with causing and not just be making random
    // guesses. This condition also allows for this key feature!
    if (!cell.shown && countOfFlagsRef.current < quantityOfBombs) {
      if (cell.hasFlag) {
        cell.hasFlag = false;
        countOfFlagsRef.current--;
      } else {
        cell.hasFlag = true;
        countOfFlagsRef.current++;
        checkingForWinStatus();
      }
    }

    // HACK:  The only aim of this state variable and the setting
    // of it is to trigger a re-render that will culminate to re-render
    // the child component hence the respective child component (Cell)
    // that has changed (change in this case mean flag added or
    // removed) will be added re-rendered as well to allow for showing
    // the change otherwise react would not know to re-render and the
    // adding flag action won't be shown or reacted with on the screen!
    // Hence basically we are just going to be flipping back & forth
    // the flagShowTrigger variable
    setFlagShowTrigger(!flagShowTrigger);
  }

  //Checking for A WIN
  function checkingForWinStatus() {
    for (let idx = 0; idx < grid.length; idx++) {
      if (grid[idx].hasBomb && grid[idx].hasFlag) {
        countOfMatchedFlagsWithBombsRef.current++;
      }
    }

    // we parseInt on the quantityOfBombs to ensure we are comparing
    // integers. This is because the quantityOfBombs are passing
    // into this function/component hence may come in a string
    // instead of an integer thereby causing some complicated bugs
    if (countOfMatchedFlagsWithBombsRef.current === parseInt(quantityOfBombs)) {
      alert("CONGRATULATIONS YOU HAVE WON!!! 🎉");

      setWinStatus(true);
    }

    // we reset the counter after the checking in order
    // not to have the count of matches to be accumulative
    // that is higher than than the actual count of bombs
    countOfMatchedFlagsWithBombsRef.current = 0;
  }

  /**
   * CREATING the Board and setting the Grid array;
   *
   * After the initial render we immediately invoke the
   * createBoard function (and pass in the arguments)
   * to create the board that includes the grid and all the cells
   * Then we set the Grid state variable
   */
  useEffect(() => {
    const gridArray = createBoard(gridWidth, quantityOfBombs);
    setGrid(gridArray);

    // we set the below most importantly when we restart the Game
    setArrayOfCellsWithBomb([]);
    setGameover(false);
    setWinStatus(false);

    // we also want to reset the current property of count of flags
    // as well as the countOfMatchedFlagsWithBombs
    // back to zero to avoid re-starting with some flags or matches
    countOfFlagsRef.current = 0;
    countOfMatchedFlagsWithBombsRef.current = 0;
  }, [restartGame, gridWidth, quantityOfBombs, setWinStatus, setGameover]);

  return (
    <div className="board-wrapper">
      <p>🚩 {quantityOfBombs - countOfFlagsRef.current}</p>
      <div className="grid-wrapper">
        {grid.map((currentCell, idx) => {
          // we check if the cell is included in the arrayOfCellsWithBomb
          // we then pass the bomb Emoji if the currenCell is included
          // in the array. The array is created when the user clicks
          // on one of the bombs and hence all the cells with a bomb
          // (i.e. hasBomb property set to true) are added to the
          // arrayOfCellsWithBomb and are hence display in the next
          // render cycle
          const isCellHavingBomb = arrayOfCellsWithBomb.includes(idx);

          // we return the Cell component with the respective props
          // and children
          return (
            <Cell
              idx={idx}
              key={currentCell.id}
              cell={currentCell}
              addingFlag={addingFlag}
              onSmashCell={(idx, cell) => {
                handleCellClick(idx, cell);
              }}
            >
              {isCellHavingBomb && "💣"}
            </Cell>
          );
        })}
      </div>
    </div>
  );
}
