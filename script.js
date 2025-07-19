const choices = document.querySelectorAll("[data-choice]");
const userResult = document.getElementById("userResult");
const compResult = document.getElementById("compResult");
const messageEl = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const totalMoveEl = document.getElementById("totalMove");

let userScore = 0;
let compScore = 0;
let moveCount = 0;
let minCount = 10;
const maxCount = 10; 

choices.forEach((button) => {
  button.addEventListener('click', () => {
    if(moveCount >= maxCount) return;

    const userChoice = button.dataset.choice;
    // console.log(userChoice);
    const compChoice = getCompChoice();
    moveCount++;
    const result = getScore(userChoice,compChoice);
    getResult(result,userChoice,compChoice);
    checkGameOver();
  })
})


function getCompChoice(){
  const options = ["rock","paper","scissors"];
  return options[Math.floor(Math.random() * 3)];
}

function getScore(user, comp){
  if(user === comp) return "draw";
  if(user === "rock" && comp === "scissors" || user === "paper" && comp === "rock" || user === "scissors" && comp === "paper") return "win";
  return "lose";
}

function getResult(result, user, comp){
  if(result === "draw"){
    messageEl.innerHTML = `Both chose ${user}. It's a draw`;
  }
  else if(result === "win"){
    userScore++;
    messageEl.innerHTML = `You chose ${user}, Computer chose ${comp}, You Win !`;

  }
  else{
    compScore++;
    messageEl.innerHTML =  `You chose ${user}, Computer chose ${comp}, You Lose !`
  }

  compResult.textContent = compScore;
  userResult.textContent = userScore;
}

resetBtn.addEventListener('click', () => {
  compResult.textContent = 0;
  userResult.textContent = 0;
  messageEl.innerHTML = "";
  compScore = 0;
  userScore = 0;
  totalMoveEl.innerHTML = 10;

  choices.forEach(btn => btn.disabled = false);
  resetBtn.style.display = "none";
})

function checkGameOver(){
  totalMoveEl.innerHTML = minCount-1;
  minCount--;
  if(moveCount === maxCount){
    let finalMessage = "";
    if(userScore > compScore){
      finalMessage = "Game Over ! You Won !";
    }
    else if(userScore < compScore){
      finalMessage = "Game Over ! Computer Won !";
    }
    else{
      finalMessage = "Game Over ! It's a Draw !";
    }

    messageEl.innerHTML = `${finalMessage} <br> Moves : ${maxCount}`;
    choices.forEach(btn => btn.disabled = true);
    resetBtn.style.display = "inline-block";
  }
}