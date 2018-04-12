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

  /* ======================================================================
                          Main Code
  ========================================================================= */

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
        console.log("MOUSE OVER");
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
        console.log("MOUSE OUT", target);
        target.style.backgroundImage = "none";
      }
    });
    boxes.addEventListener("click", e => {
      const target = e.target;
      if (target.className === "box") {
        console.log("CLICK", target);
        if (currentPlayer === "x") {
          target.classList.add("box-filled-2");
          currentPlayer = "o";
          showCurrentPlayer();
        } else {
          target.classList.add("box-filled-1");
          currentPlayer = "x";
          showCurrentPlayer();
        }
      }
    });
  });






































};

tickTackToe();
