// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startPage;
let homePage;
let gamePage;

let score = 0;

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
  gamePage = loadImage("game_page.jpg");
}

function setup() {
  createCanvas(900, 900);
  image(startPage, 0, 0, width, height);
}

function draw() {
  // background(220);
}

function mousePressed(){
  if(mouseX <= 750 && mouseX >= 150 && mouseY >= 0 && mouseY <= height){
    switchPage();
  }

  if(mouseX <= width/2 + 75 && mouseX >= width/2 - 75 && mouseY <= height - 275 && mouseY >= height - 325){
    puzzle();
  }
}

// function keyPressed(){
//   if(key === " "){
//     image(startPage, 0, 0, width, height);
//   }
// }

function switchPage(){
  background("white");
  image(homePage, 150, 0, 600, height);

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
}

function puzzle(){
  background("white");
  image(gamePage, 150, 0, 600, height);
}