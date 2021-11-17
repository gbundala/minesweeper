import React, { useEffect, useRef, useState } from "react";
import { createBoard } from "../../utils/createBoard";
import { handleCellClick } from "../../utils/recursiveClick";
import Cell from "../Cell/Cell";
import "./Board.css";

let indicesOfRecursedCells = [];
export default function Board() {
  const [grid, setGrid] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [clickedCellIdx, setClickedCellIdx] = useState(null);
  const currentIDXClickedReturned = useRef(null);
  const [arrayOfCellsToUnveil, setArrayOfCellsToUnveil] = useState([]);

  /**
   *
   * KEY: We need to include the these handler functions in the body
   * of the component here instead of a separate file in utils in
   * order to take advantage of useState hooks
   * Alternatively we would have needed to use some other advanced
   * state management patterns/libraries such as redux
   */

  /** START OF TESTING */
  function recursivelyCheckAdjacentCells(
    cell,
    currentCellIdx,
    gridWidth,
    grid
  ) {
    // check whether the index is divisible by setting the variable
    // to the result of the modulus operator of index and the width
    const isIndexDivisibleByWidth = currentCellIdx % gridWidth;

    // store the value of whether the left side or right side divisible
    // to determine the left and right edges of the grid
    const isCellOnLeftEdge = isIndexDivisibleByWidth === 0;
    const isCellOnRightEdge = isIndexDivisibleByWidth === gridWidth - 1;

    // The recursion needs to run after a certain time after
    // all the checks in the above handleCellClick function happen
    // basically, we delegate this task to the event loop by
    // wrapping it around the asynchronous setTimeout call
    // we therefore conduct the same check as with the createBoard
    // function by checking around the adjacent cells in a
    // systematic manner
    setTimeout(() => {
      //
      if (currentCellIdx >= 0 && !isCellOnLeftEdge) {
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
      if (currentCellIdx <= 98 && !isCellOnRightEdge) {
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
      if (currentCellIdx === 0 || currentCellIdx === 99) {
        console.log("HELLOQ WORLD");
        const currentCellValue = grid[currentCellIdx];
        handleCellClick(currentCellIdx, currentCellValue, grid);
        indicesOfRecursedCells.push(currentCellIdx);
      }
    }, 200);
  }

  /** END OF TESTING */

  // TODO: Remove this; it has been replaced with UseRef
  // this is used to trigger a re-render in the respective
  // child component, and not all components
  // let currentIDXClickedReturned;

  /** START OF TESTING */
  function handleCellClick(idx, cell, grid) {
    // TODO: Revisit here just to be clear it is fine!!
    const currentCellIdx = idx;

    //   FIXME: refactor this to pull data here instead of redefininig the value of gridWith, we already have it somewhere in the code
    const gridWidth = 10;

    //   FIXME: Remove console prints
    console.log("we pass the idx careful here!", idx);
    // push to the array
    indicesOfRecursedCells.push(currentCellIdx);

    if (gameover) return;

    if (cell.show || cell.flag) return;

    if (cell.hasBomb) {
      console.log("BOOOOOOM!!! YOU LOST", cell);
    }

    if (cell.countOfAdjacentBombs === 0) {
      recursivelyCheckAdjacentCells(cell, currentCellIdx, gridWidth, grid);
      //TODO:  cell.show = true; revisit this part
      cell.show = true;
    } else {
      cell.show = true;

      console.log("WE HAVE STOPPED THE RECURSION", indicesOfRecursedCells);
      setArrayOfCellsToUnveil(indicesOfRecursedCells);
      indicesOfRecursedCells = [];

      // then we call the setState to send the array to the child
      // the array contains only the indexes of those cells that
      // have been touched in the recursion
    }

    // TODO: Consider if we need to reinstate the below
    // console.log(
    //   "WE HAVE STOPPED THE RECURSION OUTSIDE",
    //   indicesOfRecursedCells
    // );

    // setReveal(!reveal);
    // console.log("how many times is revealed called", reveal);

    // setClickedCellIdx(currentCellIdx);
    // console.log("what is currently clicked index", clickedCellIdx);

    // currentIDXClickedReturned.current = currentCellIdx;
    // // return currentCellIdx;
    // console.log("in the handleSmashBomb", currentIDXClickedReturned);
  }

  /** END OF TESTING */

  useEffect(() => {
    const gridArray = createBoard();
    console.log(gridArray);
    setGrid(gridArray);
  }, []);

  function handleSmashBomb(idx, cell) {
    if (gameover) return;

    //TODO: check if it is checked or if it is flagged and return early

    console.log("handled here in parent!", cell);
    handleCellClick(idx, cell, grid);

    // FIXME: Find were to put this in a conditional
    // setting the game over should be in a condition where
    // the user clicks on a bomb
    // setGameover(true);
  }

  return (
    <div className="grid-wrapper">
      {grid.map((currentCell, idx) => {
        if (arrayOfCellsToUnveil.includes(idx)) {
          console.log("does not include", idx);

          return (
            <Cell
              reveal={idx}
              idx={idx}
              key={currentCell.id}
              cell={currentCell}
              onSmashBomb={(idx, cell) => {
                handleSmashBomb(idx, cell);

                // FIXME: REMOVE
                if (currentCell === cell) {
                  console.log(`clicked ${currentCell.id} and ${cell.id}`);
                }
              }}
            />
          );
        }

        console.log("whati is index in map", idx);

        /* console.log(
          "what is the currentIDXCLICKED RETURNED IN MAP",
          clickedCellIdx
        ); */

        return (
          <Cell
            reveal={null}
            idx={idx}
            key={currentCell.id}
            cell={currentCell}
            onSmashBomb={(idx, cell) => {
              handleSmashBomb(idx, cell);

              // FIXME: REMOVE
              if (currentCell === cell) {
                console.log(`clicked ${currentCell.id} and ${cell.id}`);
              }
            }}
          />
        );
      })}
    </div>
  );
}
