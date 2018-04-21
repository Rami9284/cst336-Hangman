var selectedWord = "";
var selectedHint = "";
var board = [];
var allWords = [];
var remainingGuesses = 6;
var words = [{word: "snake",hint: "It's a reptile"},
            {word:"monkey", hint: "It's a mammal"},
            {word:"beetle", hint:"It's an insect"},
            {word:"horse", hint: "It's a mammal"},
            {word:"whale",hint:"It's a sea creature"}];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//Listen of event
window.onload = startGame();

$(".letter").click(function(){
  checkLetter($(this).attr("id"));
  disableButton($(this));
})

$(".replayBtn").on("click",function(){
  location.reload();
})

$(".hintBtn").click(function(){
  remainingGuesses -=1;
  $(".hint").show();
  updateMan();
  $(".hintBtn").hide();
})


function startGame(){
  pickWord();
  initBoard();
  createLetters();
  updateBoard();
}

function endGame(win){
  $("#letters").hide();
  
  if(win){
    allWords.push(selectedWord);
    $('#won').show();
  }else{
    $('#lost').show();
  }
}

function pickWord(){
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].word.toUpperCase();
  selectedHint = words[randomInt].hint;
}

function createLetters(){
  for(var letter of alphabet){
    $("#letters").append("<button class = 'letter' id = '" + letter + "' >" + letter + "</button>");
  }
}

function checkLetter(letter){
  var positions = new Array();
  
  for (var i =0; i < selectedWord.length;i++){
    if(letter == selectedWord[i]){
      positions.push(i);
    }
  }
  
  if(positions.length > 0){
      updateWord(positions,letter);
      
      if(!board.includes('_')){
        endGame(true);
      }
    }
    else{
      remainingGuesses -=1;
      updateMan();
    }
    
    if(remainingGuesses <= 0){
      endGame(false);
    }
}

function updateWord(positions,letter){
  for(var pos of positions){
    board[pos] = letter;
  }
  
  updateBoard();
}

function updateBoard(){
  $("#word").empty();
  
  for(var i =0; i< board.length;i++){
    $("#word").append(board[i] + " ");
  }
   $("#word").append("<br/> ");
   $("#word").append("<span class='hint'> Hint: " +selectedHint + "</span>");
}
//fill the board with underscores
function initBoard(){
  for(var letter in selectedWord){
      board.push("_");
  }
}

function updateMan(){
  $("#hangImg").attr("src","img/stick_"+ (6 - remainingGuesses) + ".png");
}

function disableButton(btn) {
  btn.prop("disabled",true);
  btn.attr("class","btn btn-danger");
}



