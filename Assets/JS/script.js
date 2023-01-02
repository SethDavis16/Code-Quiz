// create the first page in html
// list of all questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    title:"String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
     title:"A very useful tool used during development and debugging for printing content to the debugger is:",
     choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
     answer: "console.log"
  }
];

// connect a variable to the button
var startBtn = document.querySelector("#start-button");
//variable for <h2>
var questionTitle = document.querySelector("#question-title");
// variable for <P>
var content = document.querySelector("#content");
// variable for timer
var countDown = document.querySelector("#count-down");
// for timer name 
var timer = document.querySelector("#timer")
// create variables to take over the middle page
var mainTakeOver = document.querySelector("#middle-page");
// create variable for main content
var mainContent = document.querySelector("main-content");
// variable for start page div 
var startPage = document.querySelector("#start-page");
// variable for questions page div 
var questionPage = document.querySelector("#question-page");
// vaiable for end page div 
var endPage = document.querySelector("#end-page");
// variables for choices buttons 
var button01 = document.querySelector("#button01");
var button02 = document.querySelector("#button02");
var button03 = document.querySelector("#button03");
var button04 = document.querySelector("#button04");
// varibale to tell user if they were wrong or not 
var rightWrong = document.querySelector("#right-wrong");
// game over <p> tag
var gameOver = document.querySelector("#game-over");
// end game title
var endTitle = document.querySelector("#end-title");
// telling the score to user 
var tellScore = document.querySelector("#tell-score");
//highscore tab 
var highScoreTab = document.querySelector("#high-score-tab")
// variable to move through our questions in an array
var questionIndex = 0;
// set the timer
var timeLeft = 75;

// create a function that starts a timer/ everything will be based off this function
var start = function () {

  // run the timer 
  time();

  // run the content function
  contentChange();
  
};


var time = function (){
// give the timer a function to count down
  var gameTimer = setInterval(function () {
    if (timeLeft === 0 || questionIndex === 5){
       clearInterval(gameTimer);
      end();
    } else {
      timeLeft--;
      countDown.textContent = timeLeft;
      console.log(questionIndex)
    }
  }, 1000); // timer goes down by 1 second at a time
}

// once button is pressed use java to take over the middle part of the screen with text content
// switches the HTML content with the string information
var contentChange = function () {
  startPage.setAttribute("hidden", true);
  questionPage.removeAttribute("hidden");
  if (questionIndex < 5){
    
    questionTitle.innerHTML = questions[questionIndex].title;
    
    button01.innerHTML = questions[questionIndex].choices[0]
    button02.innerHTML = questions[questionIndex].choices[1]
    button03.innerHTML = questions[questionIndex].choices[2]
    button04.innerHTML = questions[questionIndex].choices[3]
    
    button01.addEventListener("click", answers);
    button02.addEventListener("click", answers);
    button03.addEventListener("click", answers);
    button04.addEventListener("click", answers);
  }
};


var answers = function (event) {
  console.log(event.target);
  console.log(event.target.textContent);
  
  // need to check for wrong and right answers
  if (event.target.textContent === questions[questionIndex].answer){
    rightWrong.removeAttribute("hidden");
    rightWrong.textContent = "Correct!";
  } else {
    rightWrong.removeAttribute("hidden");
    rightWrong.textContent = "Incorrect";
    // if wrong timer loses 10 seconds
    timeLeft = timeLeft - 10;
  }
  
  if (questionIndex < 5){
    
    questionIndex++
    contentChange();
    console.log(questions.length)
    
  } else {
    end();
  }

};

// connect to the set highscore button 
var highScoreBtn = document.querySelector("#high-score-btn");

// end page of quiz 
var end = function (){
  questionPage.setAttribute("hidden", true);
  endPage.removeAttribute("hidden");

  if (timeLeft > 0){
    endTitle.textContent = "Finished!"
  } else {
    endTitle.textContent = "Time is up!"
  };

  tellScore.innerHTML = "Your final score is " + timeLeft;
  highScoreBtn.addEventListener("click", storage);
}


// our empty array for local storage
// need to or thing so that local storage doesnt over write our data already pushed
var scores = JSON.parse(localStorage.getItem("Quiz Score")) || []
var hs = timeLeft;

// sets inputs to storage 
var storage = function (event){
  event.preventDefault();
  var userHsInput = document.querySelector("#high-score-input").value;
  console.log("input",userHsInput)
  //var highScore =[]
  var score = {
    name: userHsInput,
    score: hs
  }
  // push the object to the array 
  scores.push(score)
  
  // take pushed object and save it to local storage
  // stringify is need to turn objects into strings 
  localStorage.setItem("Quiz Score", JSON.stringify(scores));
  
  console.log(scores)
  
  // takes user to the page with high scores
  showHighScores();

}



// takes the user to the page that shows all the high scores 
var showHighScores = function (){
  location.href = "highscore.html"
}

// high score link in top left takes you to where the higscores are 
var highScoreFinalPage = function (){
  location.href = "highscore.html"
}


highScoreTab.addEventListener("click", highScoreFinalPage)
startBtn.addEventListener("click", start);
