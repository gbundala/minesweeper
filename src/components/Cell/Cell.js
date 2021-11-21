import React from "react";
import "./Cell.css";

export default function Cell({ idx, cell, onSmashCell, children, addingFlag }) {
  return (
    <div
      onContextMenu={(e) => {
        // prevent opening of dialog box upon right click
        e.preventDefault();

        addingFlag(cell);
      }}
      onClick={() => {
        onSmashCell(idx, cell);
      }}
      className={`cell-wrapper ${cell.hasBomb && children ? `bomb-grid` : ""} ${
        cell.shown ? `checked-status` : ""
      }`}
    >
      {cell.shown &&
        (cell.countOfAdjacentBombs !== 0 ? cell.countOfAdjacentBombs : "")}
      {children}
      {cell.hasFlag && " 🚩"}
    </div>
  );
}
