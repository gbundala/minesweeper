import React from "react";
import "./Help.css";

export default function Help() {
  return (
    <div className="help-wrapper">
      <h2>Rules of Minesweepers Game</h2>

      <p>
        1. Put a flag in all the cells that you think there is a bomb for you to
        win. Once you put the flags in all the correct cells (i.e. all the cells
        with a Bomb) you will win the Game! To put a flag on a cell "right click
        on that cell". You can also hold "control" and click/left click to do
        the same. You can also remove a flag in a cell by right clicking on that
        cell with a flag **BUT** only if you have not exhausted all the Flags,
        otherwise you will not be able to remove a flag if you exhaust all of
        them (Refer to Rule No. 6 below for further details)
      </p>

      <p>
        2. **Do not click on a cell with a bomb** (if you a using trackpad it is
        a click, whereas if you are using a mouse, do not left click on a cell
        with bomb). You would need to guess correctly to only click on cells
        with no bombs in them. Once you click on a cell with no bomb, it will
        show the number of surrounding cells with bombs to give you some hint
        and guidance. A further bonus is where you click a cell with no
        surrounding cells with a bomb, it will recursively unveil all the
        surrounding cells up to the point where there it hits cells with
        surrounding bombs (see Rule No. 4 below for further details on this).
      </p>

      <p>
        3. Once you click on a cell with Bomb, the game will be over and all the
        cells with Bombs will be displayed. You will no longer be able to
        continue playing the game. You may restart the game to play again!
      </p>

      <p>
        4. If you click on a cell with no surrounding bombs, all the surrounding
        cells will unveil (in a recursive manner) until it reaches the edges of
        cells with at least one surrounding bomb, then it will stop. This will
        give you an advantage in progressing to identify the cells with bombs as
        it will significantly reduce the number of cells that you will have to
        guess upon and also give you some idea of where the bombs are.
      </p>

      <p>
        5. The number of flags you have is stated at the top of the grid. Use
        these flags carefully since you don't have any other flags to use.
      </p>

      <p>
        6. Note: if you exaust all the flag and you have not won the game you
        can no longer remove them from where you have placed them hence you will
        only resort to restarting the game. Hence be careful in putting the
        flags, don't just place them randomly.
      </p>
    </div>
  );
}
