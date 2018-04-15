const tickTackToe = () => {
  "use strict";

  /* ======================================================================
                          FUNCTIONS
  ========================================================================= */

  // Highlighting the user who begins
  const showCurrentPlayer = () => {
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    if (currentPlayer === "x") {
      player1.classList.add("active");
      player2.classList.remove("active");
    } else {
      player1.classList.remove("active");
      player2.classList.add("active");
    }
  };

  const boxStatus = box => {
    if (box.className === "box box-filled-2") {
      return "X";
    }
    else if (box.className === "box box-filled-1") {
      return "O";
    }
    else {
      return null;
    }
  };

  const getRows = () => {
    // console.log(">>> getRows");
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    const rows = [];
    for (let i = 0; i < allBoxes.length; i += 3) {
      const row = allBoxes.slice(i, i+3);
      rows.push(row);
    }
    return rows;
  }

  // could take rowLength as a parameter for more reusability
  const getColumns = () => {
    // console.log(">>> getColumns");
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    const columns = [];

    const totalLength = allBoxes.length;
    const rowLength = 3;
    const columnCount = totalLength / rowLength;
    // creating 1 column array element for each row
    for (let i = 0; i < columnCount; i++) {
      columns.push([]);
    }
    // adding boxes to the appropriate columns
    for (let i = 0; i < totalLength; i++) {
      if (i % rowLength === 0) {
        columns[0].push(allBoxes[i]);
      }
      else if (i % rowLength === 1) {
        columns[1].push(allBoxes[i]);
      }
      else {
        columns[2].push(allBoxes[i]);
      }
    }
    return columns;
  };

  // Assuming the board is a square
  const getDiagonals = () => {
    // console.log(">>> getDiagonals");
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    const diagonals = [[],[]];

    const length = allBoxes.length;

    for (let i = 0; i < length; i++) {
      // 0 4 8
      if (i % 4 === 0) {
        diagonals[0].push(allBoxes[i])
      }
      // 2 4 6
      if (i === 2 || i === 4 || i === 6) {
        diagonals[1].push(allBoxes[i])
      }
    }
    console.log(diagonals);
    return diagonals;
  };

  const checkEnd = directions => {
    let winner = false;
    directions.forEach(direction => {
      const length = direction.length;
      let same = 0;
      for (let i = 0; i < length; i++) {
        if (direction[0].className === "box") {
          break;
        }
        else if (direction[0].className === direction[i].className) {
          same++;
        } else {
          break;
        }
        if (same === 3) {
          console.log("\n\n\n\nGAME OVER!");
          winner = boxStatus(direction[0]);
          console.log("winner:", winner);
        }
      }
    });
    return winner;
  };

  const checkWinRows = rows => {
    console.log(">>> checkWinRows");
    return checkEnd(rows);
  };

  const checkWinColumns = columns => {
    console.log(">>> checkWinColumns");
    return checkEnd(columns);
  };

  const checkWinDiagonals = diagonals => {
    console.log(">>> checkWinDiagonals");
    return checkEnd(diagonals);
  };

  const checkWin = (rows, columns, diagonals) => {
    const winner = checkWinRows(rows) || checkWinColumns(columns) || checkWinDiagonals(diagonals);
    console.log("CHECK WINNER:", winner);
    return winner;
  };

  const isDraw = () => {
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    for (let i = 0; i < allBoxes.length; i++) {
      if (allBoxes[i].className === "box") {
        return false;
      }
    }
    console.log("<<< DRAW >>>");
    return true;
  };

  /* ======================================================================
                          OBJECTS
  ========================================================================= */

  // Board Object
  class Board {
    showStart() {
      this.startScreen.style.display = "block";
      this.endScreen.style.display = "none";
    }
    showBoard(reset) {
      if (reset) {
        const boxes = Array.from(document.querySelectorAll(".box"));
        boxes.forEach(box => {
          box.className = "box";
          box.removeAttribute("style");
        });
      }
      this.boardScreen.style.display = "block";
      this.startScreen.style.display = "none";
      this.endScreen.style.display = "none";
    }
    showEnd(resultClass, resultText) {
      this.endScreen.style.display = "block";
      this.boardScreen.style.display = "none";

      this.endScreen.className = "screen screen-win";
      this.endScreen.classList.add(resultClass);
      const message = document.querySelector("#finish .message");
      message.textContent = resultText;
    }

    constructor({  } = {}) {
      this.startScreen = document.querySelector("#start");
      this.boardScreen = document.querySelector("#board");
      this.endScreen = document.querySelector("#finish");

      this.startScreen.style.display = "none";
      this.boardScreen.style.display = "none";
      this.endScreen.style.display = "none";
    }
  }

  // Player Object
  class Player {
    constructor({ name = "unknown", symbol } = {}) {
      this.name = name;
      this.symbol = symbol;
    }
  }

  // let player1 = new Player({name: "Wield", symbol: "X"});
  // let player2 = new Player({symbol: "O"});

  // console.log(player1);
  // console.log(player2);

  /* ======================================================================
                          Main Code
  ========================================================================= */

  let currentPlayer = "x";

  // const screen = document.querySelector("#board");
  let board = new Board({});
  board.showStart();



  // players
  const startTitle = document.querySelector("#start h1");
  const askNames = `<input id="player1" type="text" placeholder="Player 1 name:">
                    <input id="player2" type="text" placeholder="Player 2 name:">`;
  startTitle.insertAdjacentHTML("afterend", askNames);




  const startButton = document.querySelector(".screen-start .button");
  startButton.addEventListener("click", e => {
    board.showBoard();

    // Highlighting the user who begins
    showCurrentPlayer();

    // Handling mouse events: click, over, out
    const boxes = document.querySelector(".boxes");
    boxes.addEventListener("mouseover", e => {
      const target = e.target;
      const validMouseover = target.className === "box";
      if (validMouseover) {
        // console.log("MOUSE OVER");
        if (currentPlayer === "x") {
          target.style.backgroundImage = "url('img/x.svg')";
        } else {
          target.style.backgroundImage = "url('img/o.svg')";
        }
      }
    });
    boxes.addEventListener("mouseout", e => {
      const target = e.target;
      const validMouseout = target.className === "box";
      if (validMouseout) {
        // console.log("MOUSE OUT", target);
        target.style.backgroundImage = "none";
      }
    });
    boxes.addEventListener("click", e => {
      const target = e.target;
      if (target.className === "box") {
        // console.log("CLICK", target);
        if (currentPlayer === "x") {
          target.classList.add("box-filled-2");
          currentPlayer = "o";
          showCurrentPlayer();
        } else {
          target.classList.add("box-filled-1");
          currentPlayer = "x";
          showCurrentPlayer();
        }

        // test winning
        if (isDraw()) {
          const resultText = "It's a Draw!";
          const resultClass = "screen-win-tie";
          board.showEnd(resultClass, resultText);
          // Restart the game
          const restartButton = document.querySelector("#finish .button");
          restartButton.addEventListener("click", e => {
            board.showBoard(true);
          });
        } else {
          const rows = getRows();
          const columns = getColumns();
          const diagonals = getDiagonals();
          const winner = checkWin(rows, columns, diagonals);
          if (winner) {
            let resultClass = "";
            if (winner === "X") {
              resultClass = "screen-win-one";
            } else {
              resultClass = "screen-win-two";
            }
            const resultText = "Winner";
            board.showEnd(resultClass, resultText);
            // Restart the game
            const restartButton = document.querySelector("#finish .button");
            restartButton.addEventListener("click", e => {
              board.showBoard(true);
            });
          }
        }
      }
    });
  });
};

tickTackToe();





//
