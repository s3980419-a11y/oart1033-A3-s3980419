let angle;
let rains = [];
let extraTrunk = 250;
let sunAngle = 0;
let fadeAmount = 2;
let alpha = 0;
const contentFont = "Sofia";

// Sound variables
let SummerRainoriginalsound;
let rainingspringsound;
let audioStarted = false; // Tracks if user has unlocked audio yet

// Variables for preload images
let img_thuyengiayhong, img_thuyengiaynaunhat, img_thuyengiaytim, img_thuyengiaytrang, img_thuyengiayvangnhat, img_thuyengiayxanh;
let img_bonghoaxanh, img_bonghoahong, img_bonghoatim, img_bonghoahongcam, img_3d_con_duong_sang;

function preload() {
    img_thuyengiayhong = loadImage('image/thuyen_giay_hong.png');
    img_thuyengiaynaunhat = loadImage('image/thuyen_giay_nau_nhat.png');
    img_thuyengiaytim = loadImage('image/thuyen_giay_tim.png');
    img_thuyengiaytrang = loadImage('image/thuyen_giay_trang.png');
    img_thuyengiayvangnhat = loadImage('image/thuyen_giay_vang_nhat.png');
    img_thuyengiayxanh = loadImage('image/thuyen_giay_xanh.png');
    img_bonghoaxanh = loadImage('image/3d_green_flower.png');
    img_bonghoahong = loadImage('image/3d_pink_flower.png');
    img_bonghoatim = loadImage('image/3d_purple_flower.png');
    img_bonghoahongcam = loadImage('image/3d_rose_orange_flower.png');
    img_3d_con_duong_sang = loadImage('image/con_duong_sang.png');
    
    // Loaded correctly here
    SummerRainoriginalsound = loadSound('sound/Con mua ha beat.mp3');
    rainingspringsound = loadSound('sound/49656682-light-spring-rain-nature-sounds-331710.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    let link = createA('thirdlyrics.html', 'CLICK TO GO BACK THE PREVIOUS PAGE');
    link.position(20, 20);
    link.style('color', 'black');

    angle = PI/4;

    // Initialize rain system up front to prevent frame drops later
    for (let i = 0; i < 200; i++) {
        rains.push(new Rain(random(width), random(-height, height)));
    }
}

function draw() {
    background(191, 239, 255);
    image(img_3d_con_duong_sang, -420, -260, width/2 + 1800, height/2 + 1000);

    // 1. DRAW PUDDLES FIRST
    drawPuddleLess();

    // 2. DRAW PAPER BOATS
    image(img_thuyengiayhong, width/2 - 470, height/2 + 40, 200, 130);
    image(img_thuyengiaynaunhat, width/2 - 220, height/2 + 130, 200, 130);
    image(img_thuyengiaytim, width/2 + 230, height/2 + 220, 200, 130);
    image(img_thuyengiaytrang, width/2 - 480, height/2 + 195, 200, 130);
    image(img_thuyengiayvangnhat, width/2 + 300, height/2 + 20, 200, 130);
    image(img_thuyengiayxanh, width/2 + 300, height/2 - 90, 200, 130);

    // 3. DRAW FLOWERS
    image(img_bonghoaxanh, width/2 + 580, height/2 + 315, 150, 90);
    image(img_bonghoahong, width/2 - 160, height/2 + 295, 150, 90);
    image(img_bonghoatim, width/2 - 120, height/2 - 50, 150, 90);
    image(img_bonghoahongcam, width/2 + 500, height/2 + 190, 150, 90);

    // 4. DRAW BACKGROUND & SYSTEM ELEMENTS
    drawRainbow();
    draw2dTree();
    drawSunshine(); 
    drawFinalMessages();

    // 5. RENDER THE LIGHT RAIN ANIMATION (Optimized loop)
    for (let r of rains) {
        r.update();
        r.show();
    }

    // Audio helper hint overlay (Browsers require user click to play sound)
    if (!audioStarted) {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Tap anywhere on the screen to start the music!", width/2, height/2);
    }
}

// Triggers audio safely ONCE after a user interaction
function mousePressed() {
    if (!audioStarted) {
        userStartAudio(); // Safety trigger for modern browsers

        if (SummerRainoriginalsound && SummerRainoriginalsound.isLoaded()) {
            SummerRainoriginalsound.setVolume(1.24);
            SummerRainoriginalsound.loop();
        }

        if (rainingspringsound && rainingspringsound.isLoaded()) {
            rainingspringsound.setVolume(1.7);
            rainingspringsound.loop();
        }
        
        audioStarted = true;
    }
}

function draw2dTree() {
    push();
    stroke(139, 90, 43);
    strokeWeight(15);
    translate(390, 1100);
    line(0, 0, 0, -extraTrunk);
    translate(0, -extraTrunk);
    branch(300);
    pop();
}

function branch(len) {
    line(0, -2, 0, -len);
    stroke(0, 100, 0);
    translate(0, -len);

    if (len > 4) {
        push();
        rotate(angle);
        branch(len * 0.6);
        pop();

        push();
        rotate(-angle);
        branch(len * 0.6);
        pop();
    }
}

function drawPuddleLess() {
    noStroke();
    fill(90, 160, 255, 60);
    ellipse(width/2 - 380, height/2 + 270, 190, 90);
    ellipse(width/2 - 80, height/2 + 340, 200, 80);
    ellipse(width/2 + 660, height/2 + 360, 190, 86);
    ellipse(width/2 + 320, height/2 + 290, 200, 80);

    fill(90, 210, 255, 60);
    ellipse(width/2 + 580, height/2 + 235, 200, 70);
    ellipse(width/2 + 406, height/2 - 10, 200, 50);
    ellipse(width/2 + 401, height/2 + 99, 200, 50);
    ellipse(width/2 - 50, height/2 - 6, 200, 70);
    ellipse(width/2 - 369, height/2 + 120, 200, 50);
    ellipse(width/2 - 119, height/2 + 210, 200, 50);
}

function drawSunshine() {
    push();
    translate(width/2 + 920, height/2 - 460); 
    noStroke();
    fill(255, 185, 2);
    drawRays(12, 120, 55);

    fill(255, 204, 0);
    circle(0, 0, 150);

    fill(255, 255, 0, 50);
    circle(0, 0, 200);
    pop();

    sunAngle += 0.03;
}

function drawRays(numRays, distance, raySize) {
    fill(205, 155, 0);
    for (let i = 0; i < numRays; i++) {
        let angleVal = TWO_PI / numRays * i + sunAngle;
        let x = cos(angleVal) * distance;
        let y = sin(angleVal) * distance;

        push();
        translate(x, y);
        rotate(angleVal + HALF_PI);
        triangle(-raySize/2, raySize, raySize/2, raySize, 0, -raySize/2);
        pop();
    }
}

function drawRainbow() {
    strokeWeight(20);
    noFill();
    stroke(255, 0, 0); arc(width/2, 470, 2500, 660, PI, 0);
    stroke(255, 127, 0); arc(width/2, 500, 2500, 690, PI, 0);
    stroke(255, 255, 0); arc(width/2, 515, 2500, 680, PI, 0);
    stroke(0, 236, 0); arc(width/2, 535, 2500, 680, PI, 0);
    stroke(0, 0, 255); arc(width/2, 555, 2500, 680, PI, 0);
    stroke(105, 89, 205); arc(width/2, 573, 2500, 680, PI, 0);
    stroke(238, 0, 238); arc(width/2, 593, 2500, 680, PI, 0);
}

function drawFinalMessages() {
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0, 0, 0, alpha);

    textAlign(CENTER, TOP);
    textFont(contentFont);
    textLeading(70);
    textSize(28);

    text('Some memories stay. Some fade like rain.', width/2 - 600, height/2 - 420, 1200, 100);
    text('But every trace shaped who we are!', width/2 - 600, height/2 - 380, 1200, 100);

    alpha += fadeAmount;
    if (alpha <= 0 || alpha >= 255) {
        fadeAmount *= -1;
    }
}

// HIGHLY OPTIMIZED RAIN CLASS
class Rain {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(2, random(6, 35)); // Scaled top velocity slightly down for smoother rendering
        this.len = random(16, 20);
        this.opacity = random(120, 150); 
    }

    show() {
        strokeWeight(2.1); 
        stroke(255, 255, 255, this.opacity);
        line(this.pos.x, this.pos.y, this.pos.x + 1, this.pos.y - this.len);
    }

    update() {
        this.pos.add(this.vel);
        
        // Instead of breaking down performance with array splicing, 
        // we instantly recycle the drop back to the top when it leaves boundaries!
        if (this.pos.y > height + 30 || this.pos.x > width + 20) {
            this.pos.y = random(-50, -10);
            this.pos.x = random(width);
            this.vel.y = random(6, 35);
        }
    }
}