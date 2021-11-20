import React, { useEffect, useState } from "react";
import { createBoard } from "../../utils/createBoard";
import Cell from "../Cell/Cell";
import "./Board.css";

// FIXME: Hey hey ,revisit this, even if the React.StrictMode does not
// cause any errors, we dont want to have import functions here!!!!
// initializing the count of flags
let countOfFlags = 0;

export default function Board({ restartGame }) {
  const [grid, setGrid] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [arrayOfCellsToUnveil, setArrayOfCellsToUnveil] = useState([]);
  const [arrayOfCellsWithBomb, setArrayOfCellsWithBomb] = useState([]);
  const [flagShowTrigger, setFlagShowTrigger] = useState(false);

  // FIXME: Revisit this, we should not hard code this number
  const countOfBombs = 15;

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
      //
      if (currentCellIdx > 0 && !isCellOnLeftEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) - 1;
        const nextNewRecursiveCell = grid[nextNewCellIdx];

        //  FIXME: Remove log printing
        console.log("The next new recursive cell", nextNewRecursiveCell);

        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      //
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

      //
      if (currentCellIdx > 11 && !isCellOnLeftEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) - 1 - gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      //
      if (currentCellIdx < 98 && !isCellOnRightEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) + 1;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      //
      if (currentCellIdx < 90 && !isCellOnLeftEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) - 1 + gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      //
      if (currentCellIdx < 88 && !isCellOnRightEdge) {
        const nextNewCellIdx = parseInt(currentCellIdx) + 1 + gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      //
      if (currentCellIdx < 89) {
        const nextNewCellIdx = parseInt(currentCellIdx) + gridWidth;
        const nextNewRecursiveCell = grid[nextNewCellIdx];
        handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
      }

      // TODO: REVISIT
      // if (currentCellIdx === 0 || currentCellIdx === 99) {
      //   console.log("HELLOQ WORLD");
      //   const currentCellValue = grid[currentCellIdx];
      //   handleCellClick(currentCellIdx, currentCellValue, grid);
      //   indicesOfRecursedCells.push(currentCellIdx);
      // }
    }, 150);
  }

  /******  END OF RECURSIVE CHECK OF ADJADCENT CELLS *****/

  /**
   *
   * START OF THE HANDLE CELL CLICK FUNCTION
   *
   * */
  function handleCellClick(idx, cell, grid) {
    // TODO: Revisit here just to be clear it is fine!!
    const currentCellIdx = idx;

    //   FIXME: refactor this to pull data here instead of redefininig the value of gridWith, we already have it somewhere in the code

    // FIXME: Also check in the createBoard function, there is the same sort of hard coded value of gridWidth
    const gridWidth = 10;

    //   FIXME: Remove console prints
    console.log("we pass the idx careful here!", idx);
    // push to the array
    indicesOfRecursedCells.push(currentCellIdx);

    if (gameover) return;

    if (cell.shown || cell.flag) return;

    if (cell.hasBomb) {
      // FIXME: Replace console with alert here to notify user of
      // the fact that they have lost the game and also show something on the screen
      console.log("BOOOOOOM!!! YOU LOST", cell);
      gameOverTrigger(currentCellIdx, grid);
      return;
    }

    // FIXME: Fix the bug in cell zero acting really weird
    // it gets revelead when there is a bomb
    // and it doesn't respond when clicked when there is no bomb
    if (cell.countOfAdjacentBombs === 0) {
      recursivelyCheckAdjacentCells(currentCellIdx, gridWidth, grid);
      //TODO:  revisit this part to explain it
      cell.shown = true;
      setFlagShowTrigger(!flagShowTrigger);
    } else {
      cell.shown = true;
      setFlagShowTrigger(!flagShowTrigger);

      console.log("WE HAVE STOPPED THE RECURSION", indicesOfRecursedCells);
      setArrayOfCellsToUnveil(indicesOfRecursedCells);
      indicesOfRecursedCells = [];

      // then we call the setState to send the array to the child
      // the array contains only the indexes of those cells that
      // have been touched in the recursion
    }
  }

  /****** END OF THE HANDLE CLICK FUNCTION  */

  // GameOver Handler
  function gameOverTrigger(cellIdx, grid) {
    console.log("Consoled from Gameover", cellsWithBomb);
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
    console.log(cell);
    if (gameover) return;

    // we want to limit the number of flags that a user can put
    // in the grid to the total number of bombs, no further
    // also we only want to proceed in adding a flag if cell is not
    // yet shown, as we don't want to add flags to cells that have
    // already been revealed
    // TODO: complete the shown part
    // FIXME: Fix the bug where it reaches 15 flags it no longer can be lowered
    // it is a result of the below conditional not being met hence the code
    // inside it is no longer being read
    if (!cell.shown && countOfFlags < countOfBombs) {
      if (cell.hasFlag) {
        cell.hasFlag = false;
        countOfFlags--;
      } else {
        cell.hasFlag = true;
        countOfFlags++;
        checkingForWinStatus();
      }
    }

    console.log(cell);
    console.log(countOfFlags);

    // HACK:  The only aim of this state variable and the setting
    // of it is to trigger a re-render that will culminate to re-render
    // the child component hence the respective child component (Cell)
    // that has changed (change in this case mean flag added or removed)
    // will be added re-rendered as well to allow for showing the change
    // otherwise react would not know to re-render and the adding flag
    // action won't be shown or reacted with on the screen!
    // Hence basically we are just going to be flipping back & forth
    // the flagShowTrigger variable
    setFlagShowTrigger(!flagShowTrigger);
  }

  //Checking for A WIN
  function checkingForWinStatus() {
    let countOfMatchedFlagsWithBombs = 0;

    for (let idx = 0; idx < grid.length; idx++) {
      if (grid[idx].hasBomb && grid[idx].hasFlag) {
        countOfMatchedFlagsWithBombs++;
      }
    }

    if (countOfMatchedFlagsWithBombs === countOfBombs) {
      console.log("CONGRATULATIONS YOU HAVE WON!!!");

      // TODO: Revisit this if there is any confusion with the loosing
      // action
      setGameover(true);
    }
  }

  /**
   * Creating the Board and setting the Grid array;
   * After the initial render we immediately invoke the createBoard function
   * to create the board that includes the grid and all the cells
   * Then we set the Grid state variable
   */
  useEffect(() => {
    const gridArray = createBoard();
    console.log(gridArray);

    setGrid(gridArray);
    setArrayOfCellsToUnveil([]);
    setArrayOfCellsWithBomb([]);
  }, [restartGame]);

  // FIXME: this ultimately becomes redundant, lets keep the handleClick above
  function handleSmashCell(idx, cell) {
    if (gameover) return;

    //TODO: check if it is checked or if it is flagged and return early

    console.log("handled here in parent!", cell);
    handleCellClick(idx, cell, grid);

    // FIXME: Find were to put this in a conditional
    // setting the game over should be in a condition where
    // the user clicks on a bomb
    // setGameover(true);
  }

  // FIXME: delete the below console
  console.log("cells with ");

  return (
    <div className="grid-wrapper">
      {grid.map((currentCell, idx) => {
        const isCellToBeRevealed = arrayOfCellsToUnveil.includes(idx);
        const isCellHavingBomb = arrayOfCellsWithBomb.includes(idx);

        /* FIXME: Remove both the below */
        /* console.log(`cell index ${idx} is ${isCellToBeRevealed}`); */

        if (arrayOfCellsToUnveil.includes(idx)) {
          console.log("does not include", idx);
        }

        if (isCellHavingBomb) {
          console.log(`this cell has a bomb ${idx}`, arrayOfCellsWithBomb);
        }

        // we return the Cell component and dynamically reveal those that
        // cells that are included in the array to be revealed
        return (
          <Cell
            reveal={isCellToBeRevealed && idx}
            idx={idx}
            key={currentCell.id}
            cell={currentCell}
            addingFlag={addingFlag}
            onSmashCell={(idx, cell) => {
              handleSmashCell(idx, cell);

              // FIXME: REMOVE
              if (currentCell === cell) {
                console.log(`clicked ${currentCell.id} and ${cell.id}`);
              }
            }}
          >
            {isCellHavingBomb && "💣"}
          </Cell>
        );
      })}
    </div>
  );
}
