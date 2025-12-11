// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startPage;
let homePage;
let gamePage;
let allWords;
let wordlist;

let start = false;
let letters;

let gridSize = 50;
let newBlock = [];

let score = 0;

let level1Array =[];

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");
  wordlist = "wordlist.10000.txt";
  allWords = loadStrings(wordlist);
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
  angleMode(DEGREES);
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
      level1();
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
  text("LEVEL 1", width/2, height - height/3);

  start = true;
}

function level1(){
  letters = ["A", "L", "P", "Y"];

  image(gamePage, 0, 0, 600, height);

  generateGrid();

  fill(255, 255, 255, 200);
  noStroke();
  translate(width/2, height - height/4);
  circle(0, 0, 400);

  for(let angle = 0; angle < 360; angle += 360 / 4){
    fill(0);
    circle(cos(angle) * 150, sin(angle) * 150, 30);
  }
  level2();
}

function generateGrid(){
  let x = 50;
  let size = letters.length * gridSize + 50;
  for(let y = 50; y < size; y += gridSize){
    letterInWord(x, y);
  }
}

function letterInWord(x, y){
  for(let letter of letters){
    fill(255, 255, 255, 50);
    square(x, y, gridSize);
  }
}

function guess(){
  // answer = "play";
  // level1Array.push(answer);
  // answer2 = "lay";
  // level1Array.push(answer2);
  // answer3 = "pay";
  // level1Array.push(answer3);

  for(let words of allWords){
    if(guessed === words){
      // correct sound
      // bonus word
    }
    else{
      //incorrect sound
    }
  }
}

function level2(){
}

function mouseDragged(){
}