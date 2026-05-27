let denduongtatImg;
let img_hover_nuacotdenbat_nuacotdentat_1;
let img_hover_nuacotdenbat_nuacotdentat_2;
let rains = [];
let rainsound;
let rainSoundStarted = false;
const headingFont = 'Imperial Script';
const contentFont = "Noto Sans";

function preload() {
    denduongtatImg = loadImage('image/hai_cot_den_duong_tat.png');
    img_hover_nuacotdenbat_nuacotdentat_1 = loadImage('image/nua_cot_den_tat_nua_cot_den_bat_con_duong_1.png');
    img_hover_nuacotdenbat_nuacotdentat_2 = loadImage('image/nua_cot_den_tat_nua_cot_den_bat_con_duong_2.png');
    rainsound = loadSound('sound/eryliaa-light-rain-on-umbrella-with-birds-singing-339960.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    let link = createA('index.html', 'CLICK TO GO BACK THE MAIN PAGE');
    link.position(20, 20);

    let nextLink = createA('startthelyric.html', 'CLICK TO GO TO THE NEXT PAGE');
    nextLink.position(1600, 20);

    if (rainsound) {
        rainsound.setLoop(true);
        rainsound.setVolume(1.5);
        rainsound.loop();
    }
}

function draw() {
    background(0, 0, 12);
    image(denduongtatImg, 0, 8);

    drawContentText();
    drawWaveText();

    if (isMouseOverLeftLamp()) {
        image(img_hover_nuacotdenbat_nuacotdentat_1, 0, 8);
    }
    else if (isMouseOverRightLamp()) {
        image(img_hover_nuacotdenbat_nuacotdentat_2, 0, 8);
    }

    for (let i = rains.length - 1; i >= 0; i--) {
        rains[i].show();
        rains[i].update();
        if (rains[i].pos.y > height) {
            rains.splice(i, 1);
        }
    }

    for (let i = 0; i < 7; i ++) {
        rains.push(new Rain(random(width), 0));
    }

    if (frameCount % 30 === 0) {
        drawLightning(width/2, 0, random(width), height - 20, 100);
    }
}

function drawWaveText() {
    let message = "Introduction";
    let font = 'Imperial Script';
    let speed = 0.1;
    let amplitude = 25;
    let frequency = 0.3;


    for (let i = 0; i < message.length; i++) {
        let x = 720 + i * 45;
        let yOffset = sin(frameCount * speed + i * frequency) * amplitude;
        textFont(font, 130);
        text(message.charAt(i), x, 40 + yOffset);
    }
}

function drawContentText() {
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);

    textAlign(CENTER, TOP);
    textFont(contentFont);
    textLeading(70);
    textSize(28);
    text('This interactive media project is inspired by the Vietnamese song “Cơn Mưa Hạ” (Summer Rain) by Trúc Hồ. The project contains six interactive pages, each representing different lyrics, emotions, and scenes from the song.', 360, 260, 1200, 400);
    text('Users can click and interact with objects on each page to explore the story and atmosphere of the music. Through visuals, sound, and interaction, the project aims to create an emotional and immersive experience for the audience.', 360, 500, 1200, 400);
}

function isMouseOverLeftLamp() {
    const leftX = 0;
    const leftWidth = 320;
    const topY = 8;
    const lampHeight = 520;
    return mouseX >= leftX && mouseX <= leftX + leftWidth && mouseY >= topY && mouseY <= topY + lampHeight;
}

function isMouseOverRightLamp() {
    const rightWidth = 320;
    const rightX = width - rightWidth;
    const topY = 8;
    const lampHeight = 520;
    return mouseX >= rightX && mouseX <= rightX + rightWidth && mouseY >= topY && mouseY <= topY + lampHeight;
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
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.len)
    }

    update() {
        this.pos.add(this.vel);
    }
}

function drawLightning(x1, y1, x2, y2, displacement) {
    stroke(200, 255, 255);
    strokeWeight(random(1, 4));
    if (displacement < 2) {
        line(x1, y1, x2, y2);
    } else {
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;
        midX += random(-displacement, displacement);
        midY += random(-displacement, displacement);
        drawLightning(x1, y1, midX, midY, displacement / 2);
        drawLightning(midX, midY, x2, y2, displacement / 2);
        if (random() < 0.1) {
            let branchEndX = midX + random(-50, 50);
            let branchEndY = midY + random(0, 50);
            drawLightning(midX, midY, branchEndX, branchEndY, displacement / 2);
        }
    }
}