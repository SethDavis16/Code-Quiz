var goBack = document.querySelector("#HS-goback")
var clearScore = document.querySelector("#HS-clear")
var displayHS = document.querySelector("#displayHs")
var storedScores = JSON.parse(localStorage.getItem("Quiz Score"));

// go back button 
var goBackButton = function (){
    location.href = "index.html"
    start();
}


// clear button
var clearHighScore = function (){
  localStorage.clear("Quiz Score");
}


// show highscores in order
function displayScores() {
    console.log(storedScores)
    for ( var i = 0; i < storedScores.length; i++){
        console.log(storedScores[i].name)
        console.log(storedScores[i].score)
        var scoreEntry = document.createElement("li");
        scoreEntry.textContent = storedScores[i].name + storedScores[i].score;

        displayHS.appendChild(scoreEntry);
      }

};

displayScores();
// to listen to button clicks
goBack.addEventListener("click", goBackButton);
clearScore.addEventListener("click", clearHighScore);