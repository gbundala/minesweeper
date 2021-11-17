import React, { useEffect, useState } from "react";
import "./Cell.css";

export default function Cell({ idx, cell, onSmashBomb, reveal }) {
  //  TODO: see to it the relevance of this state variable
  const [show, setShow] = useState(false);

  console.log("what is the new value of reveal", reveal);

  useEffect(() => {
    console.log("USEEFFFECT RUN");
    if (reveal) {
      setShow(true);
    }
  }, [reveal]);

  // FIXME: We do not need to handle here, lets handle in the parent
  // function handleClick(cell) {
  //   // TODO: Where does this logic go (here or the parent)?
  //   if (cell.hasBomb) {
  //     console.log("Game over!");
  //   }

  //   if (cell.countOfAdjacentBombs !== 0) {
  //     // TODO: do something here (CHECKED STATE AND FLAG STATE)
  //     setShow(true);
  //   }
  // }
  return (
    <div
      onClick={() => {
        setShow(true);
        onSmashBomb(idx, cell);
      }}
      className={`cell-wrapper ${cell.hasBomb ? `bomb-grid` : ""} ${
        show ? `checked-status` : ""
      }`}
    >
      {show && cell.countOfAdjacentBombs}
    </div>
  );
}
