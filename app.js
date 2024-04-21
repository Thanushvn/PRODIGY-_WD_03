const GameBoard = (() => {
  const gameBoardObj = {
      gameBoardArr: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }
  return {
      gameBoardObj,
  }
})();

const Player = (name, symbol) => {
  return {name, symbol}
}

let toggleNavBtn = document.getElementById('toggle-nav');
let nav = document.getElementById('navlist');


const toggleNav = () => {
  if (nav.style.display === "") {
      nav.style.display = "block";
  } else {
      nav.style.display = ""
  }
};

const windowResizeHandler = () => {
  if (screen.width > 500) {
      nav.style.display = "";
  }
}

toggleNavBtn.addEventListener('click', toggleNav);
window.addEventListener('resize', windowResizeHandler)

const getPlayerInformationFormBtn = document.getElementById('playerInformationFormBtn');
getPlayerInformationFormBtn.addEventListener('click', () => {
  event.preventDefault();
  const playerInformationForm = document.getElementById('playerInformationForm');
  playerInformationForm.style.display = 'none';
  let playerName1 = document.getElementById('playerName1').value;
  let playerSymbol1 = document.getElementById('playerSymbol1').value;
  let playerName2 = document.getElementById('playerName2').value;
  let playerSymbol2 = document.getElementById('playerSymbol2').value;

  let player1 = Player(playerName1, playerSymbol1);
  let player2 = Player(playerName2, playerSymbol2);

  let playerFlag = player1;

  
  const gameControl = (() => {
      const restartGameBtn = document.getElementById('restartGameBtn');
      const boardContainer = document.querySelector('.boardContainer');
      let playerTurnDisplay = document.getElementById('playerTurn');
      let count = 0;
      let roundWin = false;
      const winningConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];

      const changePlayerTurnDisplay = () => {
          playerTurnDisplay.innerText = `Turn: ${playerFlag.name} Symbol: ${playerFlag.symbol}`
      };

      const renderGameBoard = () => {
          for (let i = 0; i < 9; i++) {
              let cell = document.createElement('div');
              cell.classList.add(`cell`);
              cell.setAttribute('data-index', `${i}`);
              cell.textContent = GameBoard.gameBoardObj.gameBoardArr[i];
              boardContainer.append(cell);
              boardContainer.style.display = 'flex';
              changePlayerTurnDisplay();
              ChangeSymbol();
          };
      };
      
      const ChangeSymbol = () => {
          let cells = document.querySelectorAll('.cell');
          cells.forEach((cell) => {
              cell.addEventListener('click', () => {
                  if (cell.textContent === player1.symbol || cell.textContent === player2.symbol) {
                      cell.textContent = cell.textContent;
                  } else {
                      cell.textContent = playerFlag.symbol;
                      playerFlag = changePlayerFlag(playerFlag);
                      count++;
                  }
                  GameBoard.gameBoardObj.gameBoardArr.splice(cell.dataset.index, 1, cell.textContent);
                  console.log(count);
                  changePlayerTurnDisplay();
                  checkGameEndConditions(GameBoard.gameBoardObj.gameBoardArr);
              });
          });
      };

      const changePlayerFlag = (playerFlag) => {
          return ((playerFlag === player1) ? player2 : player1)
      };

      const restartGame = () => {
          restartGameBtn.addEventListener('click', () => {
              playerFlag = player1;
              while (boardContainer.firstChild) {
                  boardContainer.removeChild(boardContainer.firstChild);
              }
              GameBoard.gameBoardObj.gameBoardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
              playerInformationForm.style.display = 'grid';
              count = 0;
              boardContainer.style.display = 'none';
              playerTurnDisplay.innerText = ``;
              toggleNav();
          });
      };

      const checkGameEndConditions = (arr) => {
          for (let i = 0; i <= 7; i++) {
              const winCondition = winningConditions[i];
              let a = arr[winCondition[0]];
              let b = arr[winCondition[1]];
              let c = arr[winCondition[2]];

              if (a === b && b === c) {
                  roundWin = true;
                  console.log('win');
                  break;
              } else if (count === 9 && roundWin === false) {
                  console.log('tie');
              };
          };
      };
  
      return {
          renderGameBoard,
          ChangeSymbol,
          restartGame    
      }
  })();
  gameControl.renderGameBoard();
  gameControl.ChangeSymbol();
  gameControl.restartGame();
});
