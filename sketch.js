// Crossword wordscape
// Krishitha Saravanakumar
// October 18, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startPage;

function preload(){
  startPage = loadImage("wordscape_start.png");
}

function setup() {
  createCanvas(900, 900);
}

function draw() {
  // background(220);
  image(startPage, 0, 0, width, height);
}
