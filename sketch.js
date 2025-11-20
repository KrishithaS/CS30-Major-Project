// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startPage;
let homePage;

function preload(){
  startPage = loadImage("wordscape_start.png");
  homePage = loadImage("home_page.jpg");
}

function setup() {
  createCanvas(900, 900);
}

function draw() {
  // background(220);
}

function mousePressed(){
  if(mouseX <= width && mouseX >= 0 && mouseY >= 0 && mouseY <= height){
    switchPage();
  }
}

function keyPressed(){
  if(key === " "){
    image(startPage, 0, 0, width, height);
  }
}

function switchPage(){
  background("white");
  image(homePage, 150, 0, 600, height);
  fill("orange");
  circle(width/2, height/2, 300);
  noStroke();
}