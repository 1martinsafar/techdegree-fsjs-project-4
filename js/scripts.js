const tickTackToe = () => {
  "use strict";

  /* ======================================================================
                          FUNCTIONS
  ========================================================================= */

  // Highlighting the user who begins
  const showCurrentPlayer = (currentPlayer, player1, player2) => {
    const playerHighlight1 = document.querySelector("#player1-highlight");
    const playerHighlight2 = document.querySelector("#player2-highlight");
    if (currentPlayer.symbol === player1.symbol) {
      playerHighlight1.classList.add("active");
      playerHighlight2.classList.remove("active");
    } else {
      playerHighlight1.classList.remove("active");
      playerHighlight2.classList.add("active");
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
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    const rows = [];
    for (let i = 0; i < allBoxes.length; i += 3) {
      const row = allBoxes.slice(i, i+3);
      rows.push(row);
    }
    return rows;
  };

  // could take rowLength as a parameter for more reusability
  const getColumns = () => {
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
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    const diagonals = [[],[]];
    const length = allBoxes.length;

    for (let i = 0; i < length; i++) {
      // 0 4 8
      if (i % 4 === 0) {
        diagonals[0].push(allBoxes[i]);
      }
      // 2 4 6
      if (i === 2 || i === 4 || i === 6) {
        diagonals[1].push(allBoxes[i]);
      }
    }
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
          winner = boxStatus(direction[0]);
        }
      }
    });
    return winner;
  };

  const checkWinRows = rows => {
    return checkEnd(rows);
  };

  const checkWinColumns = columns => {
    return checkEnd(columns);
  };

  const checkWinDiagonals = diagonals => {
    return checkEnd(diagonals);
  };

  const checkWin = (rows, columns, diagonals) => {
    const winner = checkWinRows(rows) || checkWinColumns(columns) || checkWinDiagonals(diagonals);
    return winner;
  };

  const isDraw = () => {
    const allBoxes = Array.from(document.querySelectorAll(".box"));
    for (let i = 0; i < allBoxes.length; i++) {
      if (allBoxes[i].className === "box") {
        return false;
      }
    }
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

    // constructor({  } = {}) {
    constructor() {
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

  /* ======================================================================
                          Main Code
  ========================================================================= */

  let board = new Board({});
  board.showStart();

  // players
  const startTitle = document.querySelector("#start h1");
  const askNames = `<input class="player" id="player1" type="text" placeholder="Player 1 name:">
                    <input class="player" id="player2" type="text" placeholder="Player 2 name:">`;
  startTitle.insertAdjacentHTML("afterend", askNames);

  const startScreen = document.querySelector("#start");
  let playerName1 = "player1";
  let playerName2 = "player2";
  startScreen.addEventListener("input", e => {
    if (e.target.id === "player1") {
      playerName1 = e.target.value;
    } else {
      playerName2 = e.target.value;
    }
  });

  const startButton = document.querySelector(".screen-start .button");
  startButton.addEventListener("click", e => {
    board.showBoard();

    // Create player objects with the specified name
    const player1 = new Player({name: playerName1, symbol: "X"});
    const player2 = new Player({name: playerName2, symbol: "O"});
    let currentPlayer = player1;

    // Display the players' names at the top
    const playerName1HTML = document.querySelector("#player-name-1");
    const playerName2HTML = document.querySelector("#player-name-2");
    playerName1HTML.textContent = player1.name;
    playerName2HTML.textContent = player2.name;

    // Highlighting the user who begins
    showCurrentPlayer(currentPlayer, player1, player2);

    // Handling mouse events: click, over, out
    const boxes = document.querySelector(".boxes");
    boxes.addEventListener("mouseover", e => {
      const target = e.target;
      const validMouseover = target.className === "box";
      if (validMouseover) {
        if (currentPlayer.symbol === "X") {
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
        target.style.backgroundImage = "none";
      }
    });
    boxes.addEventListener("click", e => {
      const target = e.target;
      if (target.className === "box") {
        if (currentPlayer.symbol === player1.symbol) {
          target.classList.add("box-filled-2");
          currentPlayer = player2;
          showCurrentPlayer(currentPlayer, player1, player2);
        } else {
          target.classList.add("box-filled-1");
          currentPlayer = player1;
          showCurrentPlayer(currentPlayer, player1, player2);
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
          let resultText = "";
          if (winner) {
            let resultClass = "";
            if (winner === "X") {
              resultClass = "screen-win-one";
              resultText = player1.name;
            } else {
              resultClass = "screen-win-two";
              resultText = player2.name;
            }
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
