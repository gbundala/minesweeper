import React, { useEffect, useState } from "react";
import "./Cell.css";

export default function Cell({
  idx,
  cell,
  onSmashCell,
  reveal,
  children,
  addingFlag,
}) {
  //  we define the state for showing the cell upon click
  const [show, setShow] = useState(false);

  // FIXME: console.log("what is the new value of reveal", reveal);

  // Since we are managing the showing state locally
  // we therefore useEffect to set the show state variable
  // to true when it receives a different reveal value

  // TODO: Consider implementing the same approach as for show flag instead of having a useEffect
  useEffect(() => {
    if (reveal) {
      setShow(true);
    }
  }, [reveal]);

  // useEffect(() => {
  //   if (cell.showFlag) {
  //     console.log("flag is successfully shown!");
  //     setShowFlag(true);
  //   }
  // }, [cell]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        addingFlag(cell);
      }}
      onClick={() => {
        // setShow(true);
        onSmashCell(idx, cell);
      }}
      className={`cell-wrapper ${cell.hasBomb ? `bomb-grid` : ""} ${
        show ? `checked-status` : ""
      }`}
    >
      {show && cell.countOfAdjacentBombs}
      {children && "💣"}
      {cell.hasFlag && " 🚩"}
    </div>
  );
}
