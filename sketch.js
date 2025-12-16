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

let score = 0;

let level1Array =[];
let bonus = [];

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");
  wordlist = "wordlist.10000.txt";
  allWords = loadStrings(wordlist);
  worngBuzz = loadSound("incorrect-293358.mp3");
  rightChime = loadSound("chime-sound-7143.mp3");
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
  updateGrid();
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
  //play
  //lay
  //pay
  //lap
  let puzzleWords = ["play", "lay", "pay", "lap"];

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

  mouseDragged();
  checkWords();

  // level2();
}

// function checkWords(){
//   let myMap = new map();
//   n = 0;
//   for(let word of allWords){
//     n = n + 1;
//     myMap.set(word, n);
//   }
//   for(let word of puzzleWords){
//     if(myMap.has(word)){
//       return word;
//     }
//   }
//   console.log;
// }

// function level2(){
//   letters = [];
// }

function generateGrid(){
  for(let y = 50; y < height/2; y += gridSize){
    // newBlock.push([]);
    for(let x = 50; x < width; x += gridSize){
      // newBlock[y].push(0);
      square(x, y, gridSize);
    }
  }
}

function updateGrid(){
  for(let y = 50; y < height/2; y += gridSize){
    for(let x = 50; y < width; x += gridSize){
      for(let word of puzzleWords){
        for(let letter of word){
          newBlock[y] = 1;
          
        }
      }
    }
  }
}


// function guess(){
//   for(let words of allWords){
//     if(guessed === words){
//       // correct sound
//       rightChime.play();

//       // bonus word
//     }
//     else{
//       //incorrect sound
//       worngBuzz.play();
//     }
//   }
// }



function mouseDragged(){
  for(let angle = 0; angle < 360; angle += 360 / 4){
    if(mouseX === cos(angle) * 150, mouseY === sin(angle) * 150){
      fill(255, 255, 255);
      circle(mouseX, mouseY, 50);
    }
  }
}

// the crossword puzzle grid
// get swiping mechanism working
// check if right or wrong
// switch levels
// score
// letters options in play instead of circles (will creating a map work?? has to be a loop)