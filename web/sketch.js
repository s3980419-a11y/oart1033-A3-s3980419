let rains = [];
let waterDrops = [];
let rainsound;
let rainSoundStarted = false;
const headingFont = 'Fredericka the Great';
const nameFont = "Fredericka the Great";
const contenttoStartpage = "Noto Sans";
let cotDenImg;
let cotDenkhongsangImg;

function preload() {
  cotDenImg = loadImage('image/cot_Den_sang.png');
  cotDenkhongsangImg = loadImage('image/cot_Den_chua_sang.png');
  rainsound = loadSound('sound/dragon-studio-relaxing-rain-444802.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  textFont(contenttoStartpage);

  if (rainsound) {
    rainsound.setLoop(true);
    rainsound.setVolume(1.5);
    rainsound.loop();
  }

  let link = createA('nextpage.html', 'CLICK TO GO TO THE NEXT PAGE');
  link.position(1600, 20);
  
}

function draw() {
  drawRain();
  drawHeadingText();
  drawCotDenkhongSangimg();
}

function drawHeadingText() {
  push();
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  textFont(headingFont);
  textSize(184);
  text('Summer Rain', width / 2, height / 2);

  textFont(nameFont);
  textSize(50);
  text('Inspired by song: "Con Mua Ha" - composed by: Truc Ho', width / 2 + 10, height / 2 + 150);

  textSize(32);
  text('Made by: Phi Hai Dang (Andrew) - S3980419', width/2 + 320, height/2 + 260);
  pop();
}

function drawCotDenImage() {
  if (cotDenImg) {
    imageMode(CENTER);
    image(cotDenImg, width - 900, height - 400);
  }
}


function drawCotDenkhongSangimg() {
  imageMode(CENTER);
  if (frameCount % 60 < 30) {
    image(cotDenImg, width - 900, height - 400);
  } else {
    image(cotDenkhongsangImg, width - 900, height - 400);
  }
}

function drawRain() {
  background(0, 0, 5);

  for (let i = rains.length - 1; i >= 0; i--) {
    rains[i].show();
    rains[i].update();
    if (rains[i].pos.y > height + 90) {
      waterDrops.push(new WaterDrop(rains[i].pos.x, height));
      rains.splice(i, 1);
    }
  }

  for (let i = waterDrops.length - 1; i >= 0; i--) {
    waterDrops[i].show();
    waterDrops[i].update();
    if (waterDrops[i].alpha <= 0) {
      waterDrops.splice(i, 1);
    }
  }

  rains.push(new Rain(random(width), 0));
}


class Rain{
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, random(55, 80))
    this.len = random(66, 90)
    this.thick = random(255)
  }

  show() {
    stroke(255, this.thick)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.len)
  }

  update() {
    this.pos.add(this.vel)
  }
}

class WaterDrop {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radius = 30, 20;
    this.maxRadius = random(20, 50);
    this.alpha = 255;
    this.speed = random(2, 5);
  }

  show() {
    noFill();
    stroke(100, 150, 255, this.alpha);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }

  update() {
    if (this.radius < this.maxRadius) {
      this.radius += this.speed;
    }
    this.alpha -= 5;
    if (this.alpha <= 0) {
      // mark for removal
    }
  }
}