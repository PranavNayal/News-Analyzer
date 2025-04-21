const choices = ["rock", "paper", "scissors"]
const playerDisp = document.getElementById("playerDisp")
const compDisp = document.getElementById("compDisp")
const resultDisp = document.getElementById("Result")
function playgame(playerChoice) {
  const cc = choices[Math.floor(Math.random() * 3)]

  let Result = "";
  if (playerChoice === cc) {
    Result = "ITS A TIE!"
  }
  else {
    switch (playerChoice) {
      case "rock":
        Result = (cc === "scissors") ? "You Win!" : "YOU LOSE!"
        break
      case "paper":
        Result = (cc === "rock") ? "You Win!" : "YOU LOSE!"
        break
      case "scissors":
        Result = (cc === "paper") ? "You Win!" : "YOU LOSE!"
        break
    }

  }
  playerDisp.textContent = `Player:${playerChoice}`
  compDisp.textContent = `Computer:${cc}`
  resultDisp.textContent = Result;
}