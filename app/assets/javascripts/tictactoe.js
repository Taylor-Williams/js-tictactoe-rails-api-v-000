// Code your JavaScript / jQuery solution here
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let turn = 0
$(document).ready(function(){
  attachListeners()
})

function player(){
  turn % 2 === 0 ? 'X' : 'O'
}

function updateState(boardSquare){
  $(boardSquare).text(player())
}

function setMessage(message){
  $("div#message").text(message)
}

function checkWinner(){
  var board = {};
  var winner = false;

  $('td').text((index, square) => board[index] = square);

  WINNING_COMBOS.some(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      return winner = true;
    }
  });

  return winner;
}

function doTurn(boardSquare){
  turn++
  updateState(boardSquare)
  checkWinner()
}

function saveGame(){
  $.post("/games", board)
}

function previousGames(){
  $("games").text("")
  $.get("/games", function(games){
    games.data.forEach(function(game){
      $("#games").append(game)
    })
  })
}

function clearGame(){
  $('td').empty();
  turn = 0;
  currentGame = 0;
}

function loadGame(){
}

function attachListeners(){
  $('td').on('click', function() {
    if (!$.text(this) && !checkWinner()) {
      doTurn(this);
    }
  });
  $("button#save").on("click", function(){saveGame()})
  $("button#clear").bind("click", function(){clearGame()})
  $("button#save").bind("click", function(){previousGames()})
}
