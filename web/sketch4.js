let rains = [];
let img_conduong;
let img_hoa_tim;
let img_hoa_hong_cam;
let img_hoa_xanh;
let img_hoa_hong;
let buc_thu_5;
let buc_thu_6;
let buc_thu_7;
let buc_thu_8;
let tip_question_mark;
let img_exit_button;
let tip_saying;
const contentFont = 'Noto Sans';
let showBuc5 = false;
let showBuc6 = false;
let showBuc7 = false;
let showBuc8 = false;
let showTip = false;

// Defining coordinates and sizes as objects for easy management and hit detection
let flowerPink = { x: 1200, y: 26, w: 400, h: 200 };
let flowerOrange = { x: 190, y: 160, w: 400, h: 200 };
let flowerPurple = { x: 1000, y: 490, w: 400, h: 200 };
let flowerGreen = { x: 370, y: 660, w: 400, h: 200 };

function preload() {
    img_conduong = loadImage('image/con duong.png');
    img_hoa_tim = loadImage('image/3d_purple_flower.png');
    img_hoa_hong_cam = loadImage('image/3d_rose_orange_flower.png');
    img_hoa_xanh = loadImage('image/3d_green_flower.png');
    img_hoa_hong = loadImage('image/3d_pink_flower.png');
    buc_thu_5 = loadImage('image/buc_thu_3d_5.png');
    buc_thu_6 = loadImage('image/buc_thu_3d_6.png');
    buc_thu_7 = loadImage('image/buc_thu_3d_7.png');
    buc_thu_8 = loadImage('image/buc_thu_3d_8.png');
    img_exit_button = loadImage('image/exit_button.png');
    tip_question_mark = loadImage('image/3d_question_mark_or_tip.png');
    rainsound = loadSound('sound/kanematsutei-the-sound-of-raindrops-falling-145347.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    let link = createA('startthelyric.html', 'CLICK TO GO BACK THE PREVIOUS PAGE');
    link.position(20, 20);

    let AnotherLink = createA('thirdlyrics.html', 'CLICK TO GO TO THE NEXT PAGE');
    AnotherLink.position(1600, 20);

    if (rainsound) {
        rainsound.setLoop(true);
        rainsound.setVolume(1.5);
        rainsound.loop();
    }
}

function draw() {
    background(0, 0, 12);
    image(img_conduong, -1000, -16, width + 1800, height + 320);

    // Draw Flowers
    image(img_hoa_hong, flowerPink.x, flowerPink.y, flowerPink.w, flowerPink.h);
    image(img_hoa_hong_cam, flowerOrange.x, flowerOrange.y, flowerOrange.w, flowerOrange.h);
    image(img_hoa_tim, flowerPurple.x, flowerPurple.y, flowerPurple.w, flowerPurple.h);
    image(img_hoa_xanh, flowerGreen.x, flowerGreen.y, flowerGreen.w, flowerGreen.h);
    
    drawPuddles();

    // --- NEW: HOVER NUMBER OVERLAYS ---
    // Displays order hints for each flowers when hovered
    textSize(28);
    textAlign(CENTER, CENTER);
    noStroke();

        // Pink Flower (Order #1)
    if (mouseX >= flowerPink.x && mouseX <= flowerPink.x + flowerPink.w &&
        mouseY >= flowerPink.y && mouseY <= flowerPink.y + flowerPink.h) {
        fill(255, 230, 100);
        textFont(contentFont, 38);
        text("1", flowerPink.x + flowerPink.w / 2, flowerPink.y + 100);
    }

    // Orange Flower (Order #2)
    else if (mouseX >= flowerOrange.x && mouseX <= flowerOrange.x + flowerOrange.w &&
        mouseY >= flowerOrange.y && mouseY <= flowerOrange.y + flowerOrange.h) {
        fill(255, 230, 100);
        textFont(contentFont, 38);
        text("2", flowerOrange.x + flowerOrange.w / 2, flowerOrange.y + 100);
    }

    // Purple Flower (Order #3)
    else if (mouseX >= flowerPurple.x && mouseX <= flowerPurple.x + flowerPurple.w &&
        mouseY >= flowerPurple.y && mouseY <= flowerPurple.y + flowerPurple.h) {
        fill(255, 230, 100);
        textFont(contentFont, 38);
        text("3", flowerPurple.x + flowerPurple.w / 2, flowerPurple.y + 100);
    }

    // Green Flower (Order #4)
    else if (mouseX >= flowerGreen.x && mouseX <= flowerGreen.x + flowerGreen.w &&
        mouseY >= flowerGreen.y && mouseY <= flowerGreen.y + flowerGreen.h) {
        fill(255, 230, 100);
        textFont(contentFont, 38);
        text("4", flowerGreen.x + flowerGreen.w / 2, flowerGreen.y + 100);
    }

    push();
    image(tip_question_mark, -20, 790, 140, 110);
    pop();

    for (let r of rains) {
        r.show();
        r.update();
    }

    for (let i = 0; i < 7; i++) {
        rains.push(new Rain(random(width), 10));
    }

    // --- DISPLAY LETTERS ON TOP ---
    // Centers letters in the middle of the screen
    imageMode(CENTER);
    if (showBuc5) image(buc_thu_5, width / 2, height / 2, 1600, 1000);
    if (showBuc6) image(buc_thu_6, width / 2, height / 2, 1600, 1000);
    if (showBuc7) image(buc_thu_7, width / 2, height / 2, 1600, 1000);
    if (showBuc8) image(buc_thu_8, width / 2, height / 2, 1600, 1000);
    imageMode(CORNER); // Reset to default mode for other elements

    if (showTip) {
        drawTipSaying();
    }
}

class Rain {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.87, random(26, 17));
        this.len = random(6, 20);
        this.thick = random(255);
    }

    show() {
        stroke(255, this.thick);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.len);
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.y > height + 80) {
            rains.shift();
        }
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
    text('Find and click the flowers in sequence to see the song lyrics', 955, 420);
    pop();
}

function drawPuddles() {
    noStroke();
    fill(90, 160, 255, 50);
    ellipse(570, 760, 700, 250);
    fill(90, 160, 255, 50);
    ellipse(410, 260, 700, 250);
    fill(90, 160, 255, 50);
    ellipse(1410, 130, 700, 250);
    fill(90, 160, 255, 50);
    ellipse(1210, 600, 700, 250);
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

    // 1. Pink Flower -> Letter 5
    if (mouseX >= flowerPink.x && mouseX <= flowerPink.x + flowerPink.w &&
        mouseY >= flowerPink.y && mouseY <= flowerPink.y + flowerPink.h) {
        closeAllLetters();
        showBuc5 = true;
    }
    
    // 2. Orange Flower -> Letter 6
    if (mouseX >= flowerOrange.x && mouseX <= flowerOrange.x + flowerOrange.w &&
        mouseY >= flowerOrange.y && mouseY <= flowerOrange.y + flowerOrange.h) {
        closeAllLetters();
        showBuc6 = true;
    }

    // 3. Purple Flower -> Letter 7
    if (mouseX >= flowerPurple.x && mouseX <= flowerPurple.x + flowerPurple.w &&
        mouseY >= flowerPurple.y && mouseY <= flowerPurple.y + flowerPurple.h) {
        closeAllLetters();
        showBuc7 = true;
    }

    // 4. Green Flower -> Letter 8
    if (mouseX >= flowerGreen.x && mouseX <= flowerGreen.x + flowerGreen.w &&
        mouseY >= flowerGreen.y && mouseY <= flowerGreen.y + flowerGreen.h) {
        closeAllLetters();
        showBuc8 = true;
    }
}

// Helper function to make sure only one letter shows at a time when clicked
function closeAllLetters() {
    showBuc5 = false;
    showBuc6 = false;
    showBuc7 = false;
    showBuc8 = false;
}

function keyPressed() {
    if (key === 'L' || key === 'l' || key === 'O' || key === 'o' || key === 'V' || key === 'v' || key === 'E' || key === 'e') {
        closeAllLetters();
    }
}