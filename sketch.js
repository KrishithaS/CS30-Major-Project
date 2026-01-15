// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025


let startPage;
let homePage;
let gamePage;

let allWords;
let wrongBuzz;
let rightChime;

let screen = "start";
let letters;

let gridSize = 50;
let currentWord = "";
let puzzleWords;

let score = 0;

let minRow = 1;
let maxRow = 5;
let minCol = 3;
let maxCol = 9;

let mouseStartX;
let mouseStartY;
let isSwiping = false;

let levelArray =[];
let highlightedLetters = [];
// let bonus = [];

let grid;

let wordMap = new map();

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");

  allWords = loadStrings("wordlist.10000.txt");

  wrongBuzz = loadSound("incorrect-293358.mp3");
  rightChime = loadSound("chime-sound-7143.mp3");
}

function setup() {
  createCanvas(900, 900);
  angleMode(DEGREES);
}

function draw() {
  if(screen === "start"){
    image(startPage, 0, 0, width, height);
  }

  else if(screen === "home"){
    switchPage();
  }

  else if(screen === "game"){
    image(gamePage, 0, 0, width, height);

    if(grid){
      updateGrid(grid);
    }
    drawLetterCircle();
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
    mouseStartX = mouseX;
    mouseStartY = mouseY;
    isSwiping = true;
  }
}

function mouseDragged(){
  if(screen === "game" && isSwiping){
    fill(0, 255, 0);
    noStroke();
    circle(mouseX, mouseY, 60);;
  }
}
function mouseReleased(){
  if(screen === "game" && isSwiping){
    let dx = mouseX - mouseStartX;
    let dy = mouseY - mouseStartY;
    let minDist = 80;

    for(let i = 0; i < letters.length; i++){
      let dist = dist(mouseStartX, mouseStartY, mouseX, mouseY);
      if(dist < minDist){
        currentWord += letters[i];
        minDist = dist;
      }
    }

    isSwiping = false;
  }
}

function switchPage(){
  createCanvas(600, 900);
  image(homePage, 0, 0, width, height);

  noStroke();
  fill("orange");
  circle(width/2, height/3, 200);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(score, width/2, height/3);

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

  screen = "game";

  letters = ["A", "L", "P", "Y"];
  puzzleWords = ["PLAY", "LAY", "PAY", "LAP"];

  grid = generateGrid();
  generatePuzzleGrid(grid);

}

function drawLetterCircle(){
  push();
  translate(width/2, height - height/4);

  fill(255, 255, 255, 200);
  noStroke();
  circle(0, 0, 400);

  let i = 0;
  for(let angle = 0; angle < 360; angle += 360 / 4){
    let x = cos(angle) * 150;
    let y = sin(angle) * 150;

    
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(0);
    text(letters[i], x, y);
    i ++;
  }

  pop();
  // checkWords();

  // level2();
}


function generateGrid(){
  let rows = Math.floor(height/2 / gridSize);
  let cols = Math.floor(width/gridSize);
  let newGrid = [];

  for(let y = 0; y < rows; y ++){
    newGrid.push([]);
    for(let x = 0; x < cols; x ++){
      newGrid[y].push(1);
    }
  }
  return newGrid;
}

function generatePuzzleGrid(grid){
  let rows = grid.length;
  let cols = grid[0].length;

  for(let word of puzzleWords){

    let y = Math.floor(random(minRow, maxRow));
    let x = Math.floor(random(minCol, maxCol));

    
    if(grid[y][x] === 1){

      if(random(100) > 50){
        if(y + word.length <= rows){ //option one go down

          for(let letters of word){
            grid[y][x] = letters;
            y += 1;
          }
        }
      }

      else{
        if(word.length * gridSize <= width - 50 - x){ //option two go sideways
          
          for(let letters of word){
            grid[y][x] = letters;
            x += 1;
          }
        }
      }
    }
  }
}

function updateGrid(grid){
  for(let y = 50; y < height/2; y += gridSize){
    for(let x = 50; x < width; x += gridSize){

      let row = y/gridSize;
      let col = x/gridSize;

      if(grid[row] && grid[row][col] !== 1){
        fill(255, 255, 255, 220);
        stroke(0);
        square(x, y, gridSize, 5);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(30);
        text(grid[row][col], x, y);
      }
    }
  }
}

// the crossword puzzle grid
// get swiping mechanism working
// check if right or wrong
// switch levels
// score