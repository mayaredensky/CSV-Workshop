
let screen = "start";  
let cartoonImg, tiktokImg;

let showTabs = false;  
let activeTab = "";    

function preload() {
  cartoonImg = loadImage("images/cartoon.png");
  tiktokImg = loadImage("images/tiktok.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(245);

  if (screen === "start") {
    drawStartScreen();
  } else if (screen === "main") {
    drawMainScreen();
  }
}

// START SCREEN 

function drawStartScreen() {
  background(247, 156, 183);

  fill(0);
  textAlign(CENTER);
  textSize(22);
  text("The purpose of this project is to visually show the way that my social media use and interactions are not private,\nand my data is being taken out of hand.\n\nI am being fed recommended videos based on my texts,\nsearches, etc. This representation will show you\nwhat I am talking about.",
       width/2, height/2 - 40);

  // Start Button
  fill(255);
  stroke(0);
  rect(width/2 - 75, height/3.5 + 60, 150, 50, 50);

  fill(0);
  noStroke();
  textSize(20);
  text("Start", width/2, height/3.5 + 93);
}

// ---------------- MAIN SCREEN -------------------

function drawMainScreen() {
  background(247, 156, 183);

  // Draw cartoon on LEFT half
  image(cartoonImg, 50, 150, 500, 500);

  // TikTok icon TOP RIGHT
  image(tiktokImg, width - 120, 20, 100, 100);

  // If TikTok icon opened -> show simple tabs
  if (showTabs) {
    drawTabs();
  }
}

function drawTabs() {
  fill(255);
  stroke(0);
  rect(width - 260, 140, 240, 300, 10);

  fill(0);
  noStroke();
  textSize(18);

  text("TikTok Data Tabs", width - 140, 170);

  // Tab Buttons
  drawTabButton("Recommended", width - 240, 200);
  drawTabButton("My Chats", width - 240, 250);

  // Tab Content
  textSize(16);
  fill(50);

  if (activeTab === "Recommended") {
    text("Videos recommended to you\nbased on your messages,\nsearches, and activity.",
         width - 140, 310);
  }

  if (activeTab === "My Chats") {
    text("Private DMs analyzed to\ninfluence your feed.",
         width - 140, 310);
  }
}

function drawTabButton(label, x, y) {
  stroke(0);
  fill(255);
  rect(x, y - 25, 200, 35, 8);

  noStroke();
  fill(0);
  text(label, x + 100, y);
}

// MOUSE CLICKS 

function mousePressed() {

  /// CLICK START BUTTON
if (screen === "start") {
  if (mouseX > width/2 - 75 &&
      mouseX < width/2 + 75 &&
      mouseY > height/3.5 + 60 &&
      mouseY < height/3.5 + 110) {
    screen = "main";
  }
}


  // CLICK TIKTOK ICON
  if (screen === "main") {
    if (mouseX > width - 120 && mouseX < width - 20 &&
        mouseY > 20 && mouseY < 120) {
      showTabs = !showTabs;
    }

    // CLICK TABS
    if (showTabs) {
      if (mouseX > width - 240 && mouseX < width - 40) {
        if (mouseY > 175 && mouseY < 210) activeTab = "Recommended";
        if (mouseY > 225 && mouseY < 260) activeTab = "My Chats";
      }
    }
  }
}
