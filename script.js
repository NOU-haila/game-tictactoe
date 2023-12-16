
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    resetButton.addEventListener('click', resetGame);
  
    function handleCellClick(e) {
      const index = e.target.dataset.index;
  
      if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
      }
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
  
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          announceWinner(gameBoard[a]);
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        announceDraw();
      }
    }
  
    function announceWinner(winner) {
      status.textContent = `Player ${winner} wins!`;
      gameActive = false;
    }
  
    function announceDraw() {
      status.textContent = 'It\'s a draw!';
      gameActive = false;
    }
  
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => {
        cell.textContent = '';
      });
      status.textContent = '';
      currentPlayer = 'X';
      gameActive = true;
    }
  });
  
