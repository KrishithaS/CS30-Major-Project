// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025

// Gobal Variables

// Images/screens/pages
let startPage;
let homePage;
let gamePage;

// All words and sounds
let allWords;
let wrongBuzz;
let rightChime;

let screen = "start";
let puzzleWords;
let grid;
let gridSize = 50;
let levelComplete = false;

// Letters / letter position
let letters;
let letterPositions = [];
let selectedLetters = [];
let currentWord = "";

// Reveal word
let revealed = [];
let solvedWords = [];

// Level text file for the grid
let level1puzzle;

// Swipe
let isSwiping = false;


function preload(){
  // Crossword layour
  level1puzzle = loadStrings("level1.txt");

  // Images
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");

  // Allwords file
  allWords = loadStrings("wordlist.10000.txt");

  // Right and Wrong sounds
  wrongBuzz = loadSound("incorrect-293358.mp3");
  rightChime = loadSound("chime-sound-7143.mp3");
}

function setup() {
  createCanvas(900, 900);
  angleMode(DEGREES);
}

function draw() {
  // start screen
  if(screen === "start"){
    image(startPage, 0, 0, width, height);
  }

  // home screen
  else if(screen === "home"){
    drawHomePage();
  }

  // game screen
  else if(screen === "game"){
    image(gamePage, 0, 0, width, height);

    // crossword grid
    if(grid){
      updateGrid();
    }

    // Lines when swiping
    if(isSwiping && selectedLetters.length > 0){
      stroke("darkgreen");
      strokeWeight(10);

      for(let i = 0; i < selectedLetters.length - 1; i++){
        let one = letterPositions[selectedLetters[i]];
        let two = letterPositions[selectedLetters[i + 1]];
        line(one.x, one.y, two.x, two.y);
      }
    }

    // Letter wheel
    drawLetterCircle();
  }

  // If level complete
  if(levelComplete === true){
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);

    fill("white");
    textAlign(CENTER, CENTER);
    textSize(50);
    text("LEVEL COMPLETE!", width/2, height/2);
  }
  
}

function mousePressed(){
  if(screen === "start"){
    if(mouseX <= 750 && mouseX >= 150 && mouseY >= 0 && mouseY <= height){
      screen = "home";
    }
  }

  else if(screen === "home"){
    if(mouseX <= width/2 + 75 && mouseX >= width/2 - 75 && mouseY <= height - 275 && mouseY >= height - 325){
      level1();
    }
  }

  if(screen === "game"){
    selectedLetters = [];
    currentWord = "";
    isSwiping = true;
  }

  if(screen === "game" && isSwiping){
    fill("green");
    circle(mouseX, mouseY, 60);
  }
}

function mouseDragged(){
  if(screen === "game" && isSwiping){

    highlightedLetters = [];

    for(let i = 0; i < letterPositions.length; i++){
      let pos = letterPositions[i];
      let d = dist(mouseX, mouseY, pos.x, pos.y);

      if(d < 50 && !selectedLetters.includes(i)){
        selectedLetters.push(i);
        currentWord += pos.letter;
      }
    }
  }
}

function mouseReleased(){
  if(screen === "game" && isSwiping){
    checkWord();
    isSwiping = false;

    selectedLetters = [];
    currentWord = "";
  }
}

function drawHomePage(){
  createCanvas(600, 900);
  image(homePage, 0, 0, width, height);

  noStroke();
  fill("orange");
  circle(width/2, height/3, 200);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(0, width/2, height/3);

  textSize(20);
  text("BRILLIANCE", width/2, height/3 + 50);

    
  stroke("black");
  rectMode(CENTER);
  noFill();
  rect(width/2, height - height/3, 150, 50, 50);

  fill("white");
  textAlign(CENTER, CENTER);
  textSize(30);
  text("LEVEL 1", width/2, height - height/3);
}

function level1(){

  letters = ["A", "L", "P", "Y"];
  puzzleWords = ["PLAY", "LAY", "PAY", "LAP"];

  generatePuzzleGrid(level1puzzle);

  screen = "game";
}

function drawLetterCircle(){
  letterPositions = [];
  push();
  translate(width/2, height - height/4);

  // Background Circled
  fill(255, 255, 255, 200);
  noStroke();
  circle(0, 0, 400);

  // Letter placement
  let i = 0;
  for(let angle = 0; angle < 360; angle += 360 / 4){
    let x = cos(angle) * 150;
    let y = sin(angle) * 150;

    letterPositions.push({x: width/2 + x, y: height - height/4 + y, letter: letters[i]});
    
    // Letter highlight
    if(selectedLetters.includes(i)){
      fill("lightgreen");
      circle(x, y, 70);
      fill("white");
    }
    else{
      fill(0);
    }

    textAlign(CENTER, CENTER);
    textSize(50);
    text(letters[i], x, y);
    i ++;
  }

  pop();
}


function generatePuzzleGrid(level1puzzle){
  revealed = [];
  let newGrid = [];

  // Convert text file into a grid
  for(let y = 0; y < level1puzzle.length; y ++){
    newGrid.push([]);
    revealed.push([]);

    for(let x = 0; x < level1puzzle[y].length; x ++){
      let place = level1puzzle[y][x];

      if(place === "."){
        newGrid[y][x] = "";
        revealed[y][x] = false;
      }

      else{
        newGrid[y][x] = place;
        revealed[y][x] = false;
      }
    }
  }
  grid = newGrid;
}


function updateGrid(){
  noFill();
  textAlign(CENTER, CENTER);
  textSize(30);
  rectMode(CORNER);

  for(let y = 0; y < grid.length; y ++){
    for(let x = 0; x < grid[y].length; x ++){

      if(grid[y][x] !== ""){

        let Y = y * gridSize;
        let X = x * gridSize;

        // Draw squares
        fill(255, 255, 255, 220);
        stroke(0);
        strokeWeight(1);
        rect(X, Y, gridSize, gridSize, 5);

        // show letters if revealed
        fill(0);
        if(revealed[y][x]){
          text(grid[y][x], X + gridSize/2, Y + gridSize/2);
        }
      }
    }
  }
}

function revealGuessedWord(word){
  for(let y = 0; y < grid.length; y ++){
    for(let x = 0; x < grid[y].length; x ++){

      let guess = true; // right
      for(let i = 0; i < word.length; i++){
        if(grid[y][x + i] !== word[i]){
          guess = false;
        }
      }

      if(guess === true){
        for(let i = 0; i < word.length; i++){
          revealed[y][x + i] = true;
        }
      }

      guess = true; // down
      for(let i = 0; i < word.length; i++){
        if(!grid[y + i] || grid[y + i][x] !== word[i]){
          guess = false;
        }
      }

      if(guess === true){
        for(let i = 0; i < word.length; i++){
          revealed[y + i][x] = true;
        }
      }

      guess = true; // up
      for(let i = 0; i < word.length; i++){
        if(!grid[y - i] || grid[y - i][x] !== word[i]){
          guess = false;
        }
      }

      if(guess === true){
        for(let i = 0; i < word.length; i++){
          revealed[y - i][x] = true;
        }
      }
    }
  }
}

function checkWord(){
  let word = currentWord;

  let onGrid = false;
  for(let i = 0; i < puzzleWords.length; i++){
    if(word === puzzleWords[i]){
      onGrid = true;
    }
  }

  let inAllWords = false;
  for(let i = 0; i < allWords.length; i++){
    if(word === allWords[i]){
      inAllWords = true;
    }
  }

  // Word is right
  if(onGrid === true){
    if(!solvedWords.includes(word)){ // .includes() is (if the array has "word") instead of using map(map.has))
      solvedWords.push(word);
    }

    revealGuessedWord(word);
    rightChime.play();

    // Check if level complete
    if(solvedWords.length === puzzleWords.length){
      levelComplete = true;
    }
  }

  else if(inAllWords === true){
    rightChime.play();
  }

  // word is worng
  else{
    wrongBuzz.play();
  }
}