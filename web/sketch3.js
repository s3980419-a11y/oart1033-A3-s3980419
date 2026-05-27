let img_whitepaperboat;
let img_purplepaperboat;
let img_brownpaperboat;
let img_yellowpaperboat;
let img_conduong;
let rains = [];
let blueBoat;
let pinkBoat;
let greenBoat;
let yellowBoat;
let puddles = [];
let tip_question_mark;
let img_exit_button;
let tip_saying;
const boatWidth = 600;
const boatHeight = 300;
const contentFont = 'Noto Sans';
let buc_thu_1;
let buc_thu_2;
let buc_thu_3;
let buc_thu_4;
let showBuc1 = false;
let showBuc2 = false;
let showBuc3 = false;
let showBuc4 = false;
let rainsound;
let rainSoundStarted = false;
let showTip = false;

function preload() {
    img_whitepaperboat = loadImage('image/thuyen_giay_trang.png');
    img_purplepaperboat = loadImage('image/thuyen_giay_tim.png');
    img_brownpaperboat = loadImage('image/thuyen_giay_nau_nhat.png');
    img_yellowpaperboat = loadImage('image/thuyen_giay_vang_nhat.png');
    img_conduong = loadImage('image/con duong.png');
    buc_thu_1 = loadImage('image/buc_thu_3d_1.png');
    buc_thu_2 = loadImage('image/buc_thu_3d_2.png');
    buc_thu_3 = loadImage('image/buc_thu_3d_3.png');
    buc_thu_4 = loadImage('image/buc_thu_3d_4.png');
    img_exit_button = loadImage('image/exit_button.png');
    tip_question_mark = loadImage('image/3d_question_mark_or_tip.png');
    rainsound = loadSound('sound/kanematsutei-the-sound-of-raindrops-falling-145347.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    let link = createA('nextpage.html', 'CLICK TO GO BACK THE PREVIOUS PAGE');
    link.position(20, 20);

    let nextLink = createA('secondlyrics.html', 'CLICK TO GO TO THE NEXT PAGE');
    nextLink.position(1600, 20);

    if (rainsound) {
        rainsound.setLoop(true);
        rainsound.setVolume(1.5);
        rainsound.loop();
    }

    blueBoat = {
        x: 200,
        y: height * 0.9,
        vx: 4.2
    };

    pinkBoat = {
        x: 1200,
        y: height * 2,
        vx: -3.7
    };

    greenBoat = {
        x: 900,
        y: height * 0.7,
        vx: -3.5
    };

    yellowBoat = {
        x: 700,
        y: height * 1.2,
        vx: 2.54
    };
}

function draw() {
    background(0, 0, 12);
    image(img_conduong, -1000, -15, width + 1800, height + 320);
    drawRoadFlood();

    // 1. Update boat positions
    blueBoat.x += blueBoat.vx;
    pinkBoat.x += pinkBoat.vx;
    greenBoat.x += greenBoat.vx;
    yellowBoat.x += yellowBoat.vx;
    blueBoat.y = height * 0.7 + sin(frameCount * 0.1) * 4;
    pinkBoat.y = height * 0.7 + sin(frameCount * 0.2) * 4;
    greenBoat.y = height * 0.7 + sin(frameCount * 0.16) * 4;
    yellowBoat.y = height * 0.7 + sin(frameCount * 0.3) * 4;

    if (blueBoat.x > width + boatWidth) {
        blueBoat.x = -boatWidth;
    }
    if (pinkBoat.x < -boatWidth) {
        pinkBoat.x = width + boatWidth;
    }
    if (greenBoat.x < -boatWidth) {
        greenBoat.x = width + boatWidth;
    }
    if (yellowBoat.x > width + boatWidth) {
        yellowBoat.x = -boatWidth;
    }

    // 2. Add puddles/ripples on boats
    if (frameCount % 10 === 0) {
        puddles.push(new Puddle(blueBoat.x + boatWidth / 2, blueBoat.y + boatHeight - 900 / 2));
        puddles.push(new Puddle(pinkBoat.x + boatWidth / 2, pinkBoat.y + boatHeight - 100));
        puddles.push(new Puddle(greenBoat.x + boatWidth / 2, greenBoat.y + boatHeight - 320));
        puddles.push(new Puddle(yellowBoat.x + boatWidth / 2, yellowBoat.y + boatHeight - 1270 / 2));
    }

    // 3. Draw boat ripples/puddles (Moved up so they stay behind letters and rain)
    for (let i = puddles.length - 1; i >= 0; i--) {
        puddles[i].update();
        puddles[i].show();
        if (puddles[i].alpha <= 0) {
            puddles.splice(i, 1);
        }
    }

    // Calculate bounding boxes for checking hover states
    let bx = blueBoat.x - 20;
    let by = blueBoat.y - 370;
    let px = pinkBoat.x;
    let py = pinkBoat.y - 30;
    let gx = greenBoat.x - 45;
    let gy = greenBoat.y - 240;
    let yx = yellowBoat.x - 53;
    let yy = yellowBoat.y - 560;

    // 4. Draw the paper boats
    image(img_whitepaperboat, bx, by, boatWidth, boatHeight);
    image(img_purplepaperboat, px, py, boatWidth, boatHeight);
    image(img_brownpaperboat, gx, gy, boatWidth, boatHeight);
    image(img_yellowpaperboat, yx, yy, boatWidth, boatHeight);

    // --- NEW: HOVER NUMBER OVERLAYS ---
    // Displays order hints directly over the boats when hovered
    textSize(28);
    textAlign(CENTER, CENTER);
    noStroke();
    
    // Yellow Boat (Order #1)
    if (mouseX >= yx && mouseX <= yx + boatWidth && mouseY >= yy && mouseY <= yy + boatHeight) {
        fill(255, 230, 100);
        textFont(contentFont, 38);
        text("1", yx + boatWidth / 2, yy + 200);
    }
    // Blue Boat (Order #2)
    if (mouseX >= bx && mouseX <= bx + boatWidth && mouseY >= by && mouseY <= by + boatHeight) {
        fill(255, 255, 255);
        textFont(contentFont, 38);
        text("2", bx + boatWidth / 2, by + 200);
    }
    // Green Boat (Order #3)
    if (mouseX >= gx && mouseX <= gx + boatWidth && mouseY >= gy && mouseY <= gy + boatHeight) {
        fill(205, 104, 57);
        textFont(contentFont, 38);
        text("3", gx + boatWidth / 2, gy + 200);
    }
    // Pink Boat (Order #4)
    if (mouseX >= px && mouseX <= px + boatWidth && mouseY >= py && mouseY <= py + boatHeight) {
        fill(240, 120, 240);
        textFont(contentFont, 38);
        text("4", px + boatWidth / 2, py + 200);
    }

    // 5. Draw the static 3D question mark icon
    push();
    image(tip_question_mark, -20, 790, 140, 110);
    pop();

    // 6. Draw environmental rain weather layers
    for (let i = rains.length - 1; i >= 0; i--) {
        rains[i].show();
        rains[i].update();
        if (rains[i].pos.y > height - 20) {
            rains.splice(i, 1);
        }
    }

    for (let i = 0; i < 7; i++) {
        rains.push(new Rain(random(width), 0));
    }

    // 7. Draw buc_thu letter images
    let paperW = 1400;
    let paperH = 900;
    let paperX = width / 2 - paperW / 2;
    let paperY = height / 2 - paperH / 2;
    if (showBuc2) image(buc_thu_2, paperX, paperY, paperW, paperH);
    if (showBuc4) image(buc_thu_4, paperX, paperY, paperW, paperH);
    if (showBuc3) image(buc_thu_3, paperX, paperY, paperW, paperH);
    if (showBuc1) image(buc_thu_1, paperX, paperY, paperW, paperH);

    // 8. Draw the hint instruction window (Kept at the absolute top layer)
    if (showTip) {
        drawTipSaying();
    }
}

function drawRoadFlood() {
    noStroke();
    fill(90, 160, 255, 50);
    ellipse(width * 0.5, height - 70, width * 3.95, 280);
    fill(130, 190, 255, 40);
    ellipse(width * 0.5, height - 770, width * 2.48, 320);
    fill(130, 190, 255, 80);
    ellipse(width * 1, height - 520, width * 3.48, 520);
    fill(90, 160, 255, 70);
    ellipse(width * 0.5, height - 220, width * 3.95, 310);
}

class Rain {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, random(9, 50));
        this.len = random(6, 20);
        this.thick = random(255);
    }

    show() {
        stroke(255, this.thick);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.len);
    }

    update() {
        this.pos.add(this.vel);
    }
}

class Puddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.maxRadius = random(30, 60);
        this.alpha = 150;
        this.speed = random(1, 3);
    }

    update() {
        if (this.radius < this.maxRadius) {
            this.radius += this.speed;
        }
        this.alpha -= 2;
    }

    show() {
        noFill();
        stroke(100, 150, 255, this.alpha);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2);
    }
}

function drawTipSaying() {
    push();
    fill(0, 120, 150);
    rect(340, 360, 1230, 120, 520);
    image(img_exit_button, 1540, 340, 50, 60);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(44);
    textFont(contentFont);
    text('Find and click the boats in sequence to see the song lyrics', 955, 420);
    pop();
}

function mouseClicked() {
    // 1. Check if user clicked the 3D question mark box
    if (mouseX >= -20 && mouseX <= -20 + 140 && mouseY >= 790 && mouseY <= 790 + 110) {
        showTip = true;
        return; 
    }

    // 2. Check if user clicked the Exit button box while tip is open
    if (showTip && mouseX >= 1540 && mouseX <= 1540 + 50 && mouseY >= 340 && mouseY <= 340 + 60) {
        showTip = false;
        return; 
    }

    // Determine clickable rectangles for each boat
    let bx = blueBoat.x - 20;
    let by = blueBoat.y - 370;
    let px = pinkBoat.x;
    let py = pinkBoat.y - 30;
    let gx = greenBoat.x - 45;
    let gy = greenBoat.y - 240;
    let yx = yellowBoat.x - 53;
    let yy = yellowBoat.y - 560;

    
    // Check Yellow Boat 
        if (mouseX >= yx && mouseX <= yx + boatWidth && mouseY >= yy && mouseY <= yy + boatHeight) {
            closeAllLetters();
            showBuc1 = true;
    } 

    // Check Blue Boat 
        else if (mouseX >= bx && mouseX <= bx + boatWidth && mouseY >= by && mouseY <= by + boatHeight) {
            closeAllLetters();
            showBuc2 = true;
    } 

    // Check Green Boat 
        else if (mouseX >= gx && mouseX <= gx + boatWidth && mouseY >= gy && mouseY <= gy + boatHeight) {
            closeAllLetters();
            showBuc3 = true;
    } 

    // Check Pink Boat
        else if (mouseX >= px && mouseX <= px + boatWidth && mouseY >= py && mouseY <= py + boatHeight) {
            closeAllLetters();
            showBuc4 = true;
    }
}

function closeAllLetters() {
    showBuc1 = false;
    showBuc2 = false;
    showBuc3 = false;
    showBuc4 = false;
}

function keyPressed() {
    if (key === 'L' || key === 'l' || key === 'O' || key === 'o' || key === 'V' || key === 'v' || key === 'E' || key === 'e') {
        showBuc1 = false;
        showBuc2 = false;
        showBuc3 = false;
        showBuc4 = false;
    }
}