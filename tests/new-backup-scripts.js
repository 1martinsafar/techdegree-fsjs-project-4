const tickTackToe = () => {
  "use strict";

  /* ======================================================================
                          Functions
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
      // console.log("Selected: X");
      return "X";
    }
    else if (box.className === "box box-filled-1") {
      // console.log("Selected: O");
      return "O";
    }
    else {
      // console.log("empty");
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
    // console.log(columns);
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
      // console.log("allBoxes[i].className:", allBoxes[i].className);
      if (allBoxes[i].className === "box") {
        // console.log("___not a draw___");
        return false;
      }
    }
    console.log("<<< DRAW >>>");
    return true;
  };

  /* ======================================================================
                          Main Code
  ========================================================================= */







  /* ======================================================================
                          Objects
  ========================================================================= */

  class Board {
    const screen = document.querySelector("#board");

    const startScreenHTML = `<div class="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
      </header>
    </div>`;

    // changed player1 to id instead of class
    const boardScreenHTML = `<div class="board" id="board">
      <header>
        <h1>Tic Tac Toe</h1>
        <ul>
          <li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
          <li class="players player2" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
        </ul>
      </header>
      <ul class="boxes">
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
        <li class="box"></li>
      </ul>
    </div>`;

    let currentPlayer = "x";

    // Displaying the start screen
    screen.innerHTML = startScreenHTML;

    const startButton = document.querySelector(".screen-start .button");
    startButton.addEventListener("click", e => {
      // Displaying the board sreen
      screen.innerHTML = boardScreenHTML;

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
            const endScreenHTML = `<div class="screen screen-win ${resultClass}" id="finish">
              <header>
                <h1>Tic Tac Toe</h1>
                <p class="message">${resultText}</p>
                <a href="#" class="button">New game</a>
              </header>
            </div>`;
            screen.innerHTML = endScreenHTML;
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
              const endScreenHTML = `<div class="screen screen-win ${resultClass}" id="finish">
                <header>
                  <h1>Tic Tac Toe</h1>
                  <p class="message">${resultText}</p>
                  <a href="#" class="button">New game</a>
                </header>
              </div>`;
              screen.innerHTML = endScreenHTML;
            }
          }

          // Restart the game
          const restartButton = document.querySelector("#finish .button");
          restartButton.addEventListener("click", e => {
            screen.innerHTML = boardScreenHTML;
          });
        }
      });
    });

    displayBoard(newScreen) {
      const screen = document.querySelector("#board");
      screen.innerHTML = newScreen;
    }
    constructor({ screenHTML } = {}) {
      this.screenHTML = screenHTML;
    }
  }

  class Player {
    constructor({ name = "unknown", symbol } = {}) {
      this.name = name;
      this.symbol = symbol;
    }
  }

  let player1 = new Player({name: "Wield", symbol: "X"});
  let player2 = new Player({symbol: "O"});

  console.log(player1);
  console.log(player2);

  let board = new Board({screenHTML: boardScreenHTML});

  console.log(board);

  // board.displayBoard();

  console.log(board);




































};

tickTackToe();
