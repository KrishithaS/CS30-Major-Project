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
let worngBuzz;
let rightChime;

let start = false;
let letters;

let gridSize = 50;
let newBlock = [];

let currentWord = "";

let score = 0;

let level1Array =[];
let bonus = [];

let myMap = new map();

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");
  wordlist = "wordlist.10000.txt";
  allWords = loadStrings(wordlist);
  worngBuzz = loadSound("incorrect-293358.mp3");
  rightChime = loadSound("chime-sound-7143.mp3");
}

// class Circle{
//   constructor(x, y, color, radius){
//     this.x = x;
//     this.y = y;
//     this.color = color;
//     this.radius = radius;
//   }

//   display(){
//     fill(this.color);
//     circle(this.x, this.y, this.radius * 2);
//   }
// }

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
  let puzzleWords = ["play", "lay", "pay", "lap"];

  image(gamePage, 0, 0, 600, height);

  // generateGrid();
  updateGrid();

  fill(255, 255, 255, 200);
  noStroke();
  translate(width/2, height - height/4);
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

    // circle(cos(angle) * 150, sin(angle) * 150, 30);
  }


  mouseDragged();
  checkWords();

  // level2();
}

function checkWords(){
  n = 0;
  for(let word of allWords){
    n = n + 1;
    map.set(word, n);
  }
  for(let word of puzzleWords){
    if(map.has(word)){
      return word;
    }
  }
}

// function level2(){
//   letters = [];
// }

// function generateGrid(){
//   for(let y = 50; y < height/2; y += gridSize){
//     newBlock.push([]);
//     for(let x = 50; x < width; x += gridSize){
//       if()
//     }
//   }
// }

function updateGrid(){
  for(let y = 50; y < height/2; y += gridSize){
    for(let x = 50; x < width; x += gridSize){
      // noStroke();
      fill(255, 255, 255, 200);
      square(x, y, gridSize, 5);
    }
  }
}


function guess(){
  for(let words of allWords){
    if(guessed === words){
      // correct sound
      rightChime.play();

      // bonus word
    }
    else{
      //incorrect sound
      worngBuzz.play();
    }
  }
}



function mouseDragged(){
  for(let i = 0; i < letters.length; i++){
    let d = dist(mouseX, mouseY, letters[i], letters[i]);
  }
}

// the crossword puzzle grid
// get swiping mechanism working
// check if right or wrong
// switch levels
// score