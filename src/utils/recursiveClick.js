// export function handleCellClick(idx, cell, grid) {
//   // TODO: Revisit here just to be clear it is fine!!
//   const currentCellIdx = idx;

//   //   FIXME: refactor this to pull data here instead of redefininig the value of gridWith, we already have it somewhere in the code
//   const gridWidth = 10;

//   //   FIXME: Remove console prints
//   console.log("we pass the idx careful here!", idx);

//   if (cell.hasBomb) {
//     console.log("BOOOOOOM!!! YOU LOST", cell);
//   }

//   if (cell.countOfAdjacentBombs === 0) {
//     recursivelyCheckAdjacentCells(cell, currentCellIdx, gridWidth, grid);
//     //TODO:  cell.show = true; revisit this part
//     // cell.show = true;
//   }
// }

// We define the recursive checking of cell below
// this function will only be called when the user clicks
// on a cell with zero surrounding adjacent bombs
// so that it recursively checks whether there other similar
// cells with zero bombs until it breaks out of the recursion
// as per the conditions set in the handleClickCell above

// function recursivelyCheckAdjacentCells(cell, currentCellIdx, gridWidth, grid) {
//   // check whether the index is divisible by setting the variable
//   // to the result of the modulus operator of index and the width
//   const isIndexDivisibleByWidth = currentCellIdx % gridWidth;

//   // store the value of whether the left side or right side divisible
//   // to determine the left and right edges of the grid
//   const isCellOnLeftEdge = isIndexDivisibleByWidth === 0;
//   const isCellOnRightEdge = isIndexDivisibleByWidth === gridWidth - 1;

//   // The recursion needs to run after a certain time after
//   // all the checks in the above handleCellClick function happen
//   // basically, we delegate this task to the event loop by
//   // wrapping it around the asynchronous setTimeout call
//   // we therefore conduct the same check as with the createBoard
//   // function by checking around the adjacent cells in a
//   // systematic manner
//   setTimeout(() => {
//     if (currentCellIdx > 0 && !isCellOnLeftEdge) {
//       const nextNewCellIdx = parseInt(currentCellIdx) - 1;
//       const nextNewRecursiveCell = grid[nextNewCellIdx];

//       //  FIXME: Remove log printing
//       console.log("The next new recursive cell", nextNewRecursiveCell);

//       handleCellClick(nextNewCellIdx, nextNewRecursiveCell, grid);
//     }
//   }, 200);
// }
