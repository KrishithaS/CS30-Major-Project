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

let currentWord = "";
let puzzleWords;

let score = 0;

let level1Array =[];
let bonus = [];

// let map = new map();

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");
  wordlist = "wordlist.10000.txt";
  allWords = loadStrings(wordlist);
  worngBuzz = loadSound("incorrect-293358.mp3");
  rightChime = loadSound("chime-sound-7143.mp3");
}

function setup() {
  createCanvas(900, 900);
  image(startPage, 0, 0, width, height);
  angleMode(DEGREES);
}

function draw() {
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
  puzzleWords = ["play", "lay", "pay", "lap"];

  image(gamePage, 0, 0, 600, height);

  let grid = generateGrid();
  generatePuzzleGrid(grid);

  // updateGrid(grid);
  

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
  }


  // mouseDragged();
  // checkWords();

  // level2();
}

// function checkWords(){
//   n = 0;
//   for(let word of allWords){
//     n = n + 1;
//     map.set(word, n);
//   }
//   for(let word of puzzleWords){
//     if(map.has(word)){
//       return word;
//     }
//   }
// }


function generateGrid(){

  let newGrid = [];
  for(let y = 0; y < height/2; y ++){
    newGrid.push([]);
    for(let x = 0; x < width; x ++){
      newGrid[y].push(1);
    }
  }
  return newGrid;
}

function generatePuzzleGrid(grid){
  // but have to pick a random spot
  for(let y = 50; y < height/2; y += gridSize){
    for(let x = 50; x < width - 50; x += gridSize){
      if(grid[y][x] === 1){
        for(let word of puzzleWords){
          if(random(100) > 50){
            //option one go down
            for(let letters of word){
              grid[y][x] = letters;

              fill(255, 255, 255, 200);
              square(x, y, gridSize, 5);

              fill(0);
              textAlign(CENTER, CENTER);
              textSize(50);
              text(letters, x, y);

              y += gridSize;
            }
          }
          else{
            //option two go sideways
            for(let letters of word){
              grid[y][x] = letters;

              fill(255, 255, 255, 200);
              square(x, y, gridSize, 5);

              fill(0);
              textAlign(CENTER, CENTER);
              textSize(50);
              text(letters, x, y);

              x += gridSize;
            }
          }
        }
        break;
      }
    }
  }
  //base inprocess code
}

// function updateGrid(grid){
//   for(let y = 50; y < height/2; y += gridSize){
//     for(let x = 50; x < width; x += gridSize){
//       if(grid[y][x] === 1){
//         fill(255, 255, 255, 200);
//       }
//       square(x, y, gridSize, 5);
//     }
//   }
// }


// function guessed(){
//   for(let words of allWords){
//     if(guess === words){
//       rightChime.play(); // correct sound
//       // bonus word
//     }
//     else{
//       worngBuzz.play(); //incorrect sound
//     }
//   }
// }



// function mouseDragged(){
//   for(let i = 0; i < letters.length; i++){
//     let d = dist(mouseX, mouseY, letters[i], letters[i]);
//     currentWord += letters[i];
//     fill(0);
//   }

//   let guess = currentWord;
// }

// the crossword puzzle grid
// get swiping mechanism working
// check if right or wrong
// switch levels
// score