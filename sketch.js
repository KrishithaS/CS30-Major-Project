// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startPage;
let homePage;
let gamePage;

let start = false;

let gridSize = 50;
let newBlock = [];

let score = 0;

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");
}

class Shapes{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
  }

  display(){
    fill(this.color);
  }
}

class Circle extends Shapes{
  constructor(x, y, color, radius){
    super(x, y, color);
    this.radius = radius * 2;
  }

  display(){
    super.display();
    circle(this.x, this.y, this.radius);
  }
}

function setup() {
  createCanvas(900, 900);
  image(startPage, 0, 0, width, height);
}

function draw() {
  // background(220);
}

function mousePressed(){
  if(start === false){
    if(mouseX <= 750 && mouseX >= 150 && mouseY >= 0 && mouseY <= height){
      switchPage();
    }
  }

  if(start === true){
    if(mouseX <= width/2 + 75 && mouseX >= width/2 - 75 && mouseY <= height - 275 && mouseY >= height - 325){
      puzzle();
    }
  }
}

function switchPage(){
  createCanvas(600, 900);
  image(homePage, 0, 0, 600, height);

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
  text("PLAY", width/2, height - height/3);

  start = true;
}

function puzzle(){
  image(gamePage, 0, 0, 600, height);

  fill(255, 255, 255, 200);
  noStroke();
  circle(width/2, height - height/4, 400);
  letterInWord();
  generateGrid();
}

function generateGrid(){
  let counter = 0;
  for(let block of newBlock){
    counter ++;
  }

  for(let x = 50; x < counter * gridSize; x += gridSize){
    for(let y = 50; y < counter * gridSize; y += gridSize){
      // generateSquares(x, y);
      stroke(0);
      square(x, y, gridSize);
    }
  }
}

// function generateSquares(x, y){
//   for(let block of newBlock){
//     stroke(0);
//     square(x, y, gridSize);
//   }
// }

function letterInWord(){
  let words = ["cat", "bat"];
  for(let word of words){
    // newBlock.push([]);
    for(let letter of word){
      newBlock.push(letter);
    }
  }
  return newBlock;
}