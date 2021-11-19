export function createBoard() {
  // definition of the width and quantity of bombs variables
  let gridWidth = 10;
  let quantityOfBombs = 15;

  // Array of bombs created with the array literal method []
  // then populate the array with the cell objects
  // same is replicated for the arrayofvalidcells
  //   the we concatenate the two array and sort them randomly
  // we use the Math.random() method to randomize the sort

  const arrayOfBombs = [];
  for (let idx = 0; idx < quantityOfBombs; idx++) {
    const cellObj = {
      id: idx,
      hasBomb: true,
      countOfAdjacentBombs: null,
      shown: false,
      hasFlag: false,
    };

    arrayOfBombs.push(cellObj);
  }

  //   KEY: We start the index count after the index count for the arrayOfBombs
  const arrayOfValidCells = [];
  for (let idx = quantityOfBombs; idx < gridWidth * gridWidth; idx++) {
    const cellObj = {
      id: idx,
      hasBomb: false,
      countOfAdjacentBombs: null,
    };

    arrayOfValidCells.push(cellObj);
  }

  // the gridArray which will be returned below
  // we concatenate the two arrays and randomly sort the elements
  const gridArray = arrayOfValidCells
    .concat(arrayOfBombs)
    .sort(() => Math.random() - 0.5);

  /**
   * ADDING THE COUNT BOMBS
   *
   * Looping through the array and adding bombs to the valid cells
   * that don't have a bomb by counting the number of bombs in
   * the adjacent cells. A total of 8 cell are adjacent to
   * / around each cell.
   *
   */
  for (let idx = 0; idx < gridArray.length; idx++) {
    //   initial quatity of bombs is assigned to zero
    let numberOfAdjacentBombs = 0;

    // check whether the index is divisible by setting the variable
    // to the result of the modulus operator of index and the width
    const isIndexDivisibleByWidth = idx % gridWidth;

    // store the value of whether the left side or right side divisible
    // to determine the left and right edges of the grid
    const isCellOnLeftEdge = isIndexDivisibleByWidth === 0;
    const isCellOnRightEdge = isIndexDivisibleByWidth === gridWidth - 1;

    // iterate and only add the bombs to the cells with no bombs
    if (!gridArray[idx].hasBomb) {
      // check each row but not the first cell, add one to
      // the number of bombs if the left adjacent cell has a bomb
      if (idx > 0 && !isCellOnLeftEdge && gridArray[idx - 1].hasBomb)
        numberOfAdjacentBombs++;

      //check the north-east adjacent cell of the second row and below cells
      // add one to the number of bombs if that adjacent row contains one
      if (
        idx > 9 &&
        !isCellOnRightEdge &&
        gridArray[idx + 1 - gridWidth].hasBomb
      )
        numberOfAdjacentBombs++;

      // check the adjacent cell on top of the current cell
      // in this iteration and add one to the bombs if it has one
      //   KEY: we don't have to check whether it is on either edge
      // since we are just looking for the top adjacent cell
      if (idx > 10 && gridArray[idx - gridWidth].hasBomb)
        numberOfAdjacentBombs++;

      // check the adjacent cell on the north-west side
      // of the current cell and add to the bombs if found
      if (
        idx > 11 &&
        !isCellOnLeftEdge &&
        gridArray[idx - 1 - gridWidth].hasBomb
      )
        numberOfAdjacentBombs++;

      // check the adjacent cell on the right side of the
      // current cell and add to the bombs if found
      // we now evaluate from the below up
      if (idx < 98 && !isCellOnRightEdge && gridArray[idx + 1].hasBomb)
        numberOfAdjacentBombs++;

      // check the adjacent south-west cell and add a bomb if any
      if (
        idx < 90 &&
        !isCellOnLeftEdge &&
        gridArray[idx - 1 + gridWidth].hasBomb
      )
        numberOfAdjacentBombs++;

      // check the adjacent sout-east cell and add a bomb if any
      if (
        idx < 88 &&
        !isCellOnRightEdge &&
        gridArray[idx + 1 + gridWidth].hasBomb
      )
        numberOfAdjacentBombs++;

      // check the adjacent cell below and add a bomb if any
      if (idx < 89 && gridArray[idx + gridWidth].hasBomb)
        numberOfAdjacentBombs++;

      //   reassign the value of countOfAdjacentBombs property to
      // the totoal number of bombs found adjacent to the current cell
      gridArray[idx].countOfAdjacentBombs = numberOfAdjacentBombs;
    }
  }

  return gridArray;
}
