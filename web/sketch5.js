let rains = [];
let letters = []; // Array to hold our letter objects
let x = 150;
let y = 150;
const contentFont = 'Noto Sans';
let tip_question_mark;
let img_exit_button;
let tip_saying;
let showTip = false;
let button;

// New and updated tracking variables
let stormTimer = 0; 
let showFailMessage = false; // Tracks whether to display the text warning on screen
let failMessageTimer = 0;     // Keeps the warning on screen for a moment

function preload() {
    // 1. Added a unique sequential ID to each letter (1 to 8) to track their correct order
    letters.push(new Letter(1, 'image/thu_treo_1.png', 810, 624));
    letters.push(new Letter(2, 'image/thu_treo_2.png', 1500, 0));
    letters.push(new Letter(3, 'image/thu_treo_3.png', 550, 10));
    letters.push(new Letter(4, 'image/thu_treo_4.png', 1200, 640));
    letters.push(new Letter(5, 'image/thu_treo_5.png', 50, 610));
    letters.push(new Letter(6, 'image/thu_treo_6.png', 1040, 14));
    letters.push(new Letter(7, 'image/thu_treo_7.png', 410, 600));
    letters.push(new Letter(8, 'image/thu_treo_8.png', 1670, 580));
    
    tip_question_mark = loadImage('image/3d_question_mark_or_tip.png');
    img_exit_button = loadImage('image/exit_button.png');
    rainsound = loadSound('sound/mildrelaxation-rain-by-prabajithk-119000.mp3');
    thundersound = loadSound('sound/universfield-loud-thunder-192165.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    let link = createA('secondlyrics.html', 'CLICK TO GO BACK THE PREVIOUS PAGE');
    link.position(20, 20);

    button = createButton('Complete ♡');
    button.position(860, 840);
    button.style('font-family', 'Noto Sans');
    button.style('font-weight', 'bold');
    button.style('color', 'white');
    button.style('font-size', '35px');
    button.style('background-color', 'rgb(0, 12, 100)');
    button.style('border-color', 'blue');
    button.style('border-width', '3px');
    
    // 2. Attach click event to the button
    button.mousePressed(checkOrder);

    if (rainsound) {
        rainsound.setLoop(true);
        rainsound.setVolume(1.88);
        rainsound.loop();
    }
}

function draw() {
    background(0, 0, 12);

    drawClothesline();

    // Update and show rain (Keeps going perfectly regardless of state)
    for (let r of rains) {
        r.show();
        r.update();
    }

    // Keep rain generation stable
    if (rains.length < 350) {
        for (let i = 0; i < 10; i++) {
            rains.push(new Rain(random(width), random(-20, 0)));
        }
    }

    // Update and display all letters
    for (let i = letters.length - 1; i >= 0; i--) {
        letters[i].update();
    }
    
    for (let letter of letters) {
        letter.show();
    }

    push();
    image(tip_question_mark, 1770, 20, 140, 110);
    pop();

    if (showTip) {
        drawTipSaying();
    }

    // FIXED & UPGRADED: Handle the dramatic incorrect order animation sequence
    if (stormTimer > 0) {
        // 1. Force rapid lightning strikes constantly during the storm window
        if (random() < 0.7) { 
            drawLightning(random(width), 0, random(width), height - 20, 100);
        }

        // 2. Create the white blinking overlay effect randomly frame-by-frame
        if (random() < 0.5) {
            push();
            fill(255, 255, 255, random(150, 240)); // Random brightness flash
            rect(0, 0, width, height);
            pop();
        }

        // NEW EFFECT: Make the letters shake and scramble violently over the screen while stormTimer ticks down
        for (let letter of letters) {
            letter.x += random(-25, 25);
            letter.y += random(-25, 25);
            
            // Constrain them so they don't jump entirely off screen boundaries
            letter.x = constrain(letter.x, 50, width - 250);
            letter.y = constrain(letter.y, 50, height - 350);
        }

        stormTimer--; // Count down the frames
    } else {
        // Natural ambient background lightning continues as normal every 30 frames when not in a storm
        if (frameCount % 30 === 0) {
            drawLightning(width/2, 0, random(width), height - 20, 100);
        }
    }

    // Render non-blocking error UI if user failed the order
    if (showFailMessage) {
        push();
        fill(200, 0, 0, 220); // Dark red alert box background
        rect(width/2 - 300, 100, 600, 80, 10);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(28);
        textFont(contentFont);
        text("The order is incorrect! Please try again!", width/2, 140);
        pop();

        failMessageTimer--;
        if (failMessageTimer <= 0) {
            showFailMessage = false;
        }
    }

    if (thundersound) {
        thundersound.setVolume(1.1);
    }
}

// 3. Logic to check the position order
function checkOrder() {
    // Create a copy of the array and sort it based on current physical X positions on screen
    let sortedByX = [...letters];
    sortedByX.sort((a, b) => a.x - b.x);

    // Check if the order matches their baseline numeric sequence (1, 2, 3...)
    let isCorrect = true;
    for (let i = 0; i < sortedByX.length; i++) {
        if (sortedByX[i].id !== i + 1) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        alert("Correct! You finally completed the lyrics challenge!");
        // Redirect seamlessly to the final message HTML page
        window.location.href = "finalmessage.html";
    } else {
        // TRIGGER AUDIO: Sound plays instantly without blocking code execution
        if (thundersound && thundersound.isLoaded()) {
            thundersound.play();
        }

        // TRIGGER ANIMATION: Set up longer storm window (e.g., 45 frames ≈ 1.5 seconds)
        stormTimer = 45; 

        // DISPLAY MESSAGE: Activates the smooth canvas-drawn error banner instead of browser window popup
        showFailMessage = true;
        failMessageTimer = 90; // Stays visible for 3 seconds at 30fps
        
        // Initial chaotic scattering push across screen space before shaking begins
        for (let letter of letters) {
            letter.x = random(100, width - 300);
            letter.y = random(100, height - 400);
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
    textSize(35);
    textFont(contentFont);
    text('Drag the lyric pieces onto the hanger in the correct song order.', 955, 400);
    text('Then click: "Complete"!', 955, 450);
    pop();
}

function drawClothesline() {
    stroke(255);
    strokeWeight(2.4);
    noFill();
    bezier(-700, 10, 400, 210, 600, 500, 2000, 200);
}

// --- Letter Class ---
class Letter {
    constructor(id, imgPath, x, y) {
        this.id = id; 
        this.img = loadImage(imgPath);
        this.x = x;
        this.y = y;
        this.w = 200;
        this.h = 270;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    isHovered() {
        return mouseX > this.x && mouseX < this.x + this.w &&
               mouseY > this.y && mouseY < this.y + this.h;
    }

    pressed() {
        if (this.isHovered()) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
            return true;
        }
        return false;
    }

    released() {
        this.dragging = false;
    }

    update() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    show() {
        noStroke();
        image(this.img, this.x, this.y, this.w, this.h);
    }
}

// --- Rain Class ---
class Rain {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.2, random(23, 26));
        this.len = random(12, 20);
        this.thick = random(100, 255);
    }

    show() {
        stroke(255, this.thick);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.len);
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.y > height + 80 || this.pos.x > width + 20) {
            let index = rains.indexOf(this);
            if (index > -1) {
                rains.splice(index, 1);
            }
        }
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

function mouseClicked() {
    if (mouseX >= 1770 && mouseX <= 1770 + 140 && mouseY >= 20 && mouseY <= 20 + 110) {
        showTip = true;
        return; 
    }

    if (showTip && mouseX >= 1540 && mouseX <= 1540 + 50 && mouseY >= 340 && mouseY <= 340 + 60) {
        showTip = false;
        return; 
    }
}

function mousePressed() {
    for (let i = letters.length - 1; i >= 0; i--) {
        if (letters[i].pressed()) {
            break;
        }
    }
}

function mouseReleased() {
    for (let letter of letters) {
        letter.released();
    }
}