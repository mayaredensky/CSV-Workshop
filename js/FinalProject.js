
let screen = "start";  
let cartoonImg, tiktokImg;

let showTabs = false;  
let activeTab = "";   

let scrollY = 0 
let scrolling = false

let chatScrollY = 0;
let chatScrolling = false;


let tiktokImg1
let tiktokImg2
let tiktokImg3
let tiktokImg4
let tiktokImg5
let tiktokImg6

function preload() {
  cartoonImg = loadImage("images/cartoon.png");
  tiktokImg = loadImage("images/tiktok.png");
  tiktokImg1 = loadImage("images/tiktok1.png");
  tiktokImg2 = loadImage("images/tiktok2.png");
  tiktokImg3 = loadImage("images/tiktok3.png");
  tiktokImg4 = loadImage("images/tiktok4.png");
  tiktokImg5 = loadImage("images/tiktok5.png");
  tiktokImg6 = loadImage("images/tiktok6.png");
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

// MAIN SCREEN 

function drawMainScreen() {
  background(247, 156, 183);

  stroke(0);
  strokeWeight(2);
  line(width - 200, 100, width - 150, 100);
  triangle(width - 150, 100, width - 160, 90, width - 160, 110);



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

    // SIMPLE SCROLLING CONTENT WHEN RECOMMENDED TAB IS OPEN
  if (activeTab === "Recommended" && scrolling) {

    fill(0);
    textSize(16);
    image(tiktokImg1, width - 850, windowHeight + 60 + scrollY)
    image(tiktokImg2, width - 850, windowHeight + 390 + scrollY)
    image(tiktokImg3, width - 850, windowHeight + 750 + scrollY)
    image(tiktokImg4, width - 550, windowHeight + 60 + scrollY, 150, 310)
    image(tiktokImg5, width - 550, windowHeight + 400 + scrollY, 150, 310)
    image(tiktokImg6, width - 550, windowHeight + 750 + scrollY, 150, 310)

  

    scrollY -= 2;

    if (scrollY < -windowHeight - 1100) {
      scrollY = 0;  
    }
  }

// SCROLLING TEXT WHEN MY CHATS TAB IS OPEN
if (activeTab === "My Chats" && chatScrolling) {

  fill(0);
  textSize(16);

 // FIRST BLOCK 

// LEFT COLUMN
  text("OMG THIS IS US", width - 850, windowHeight + 50 + chatScrollY);
  text("WE HAVE TO GO HERE", width - 850, windowHeight + 100 + chatScrollY);
  text("I NEED THIS", width - 850, windowHeight + 150 + chatScrollY);
  text("WOWWWW", width - 850, windowHeight + 200 + chatScrollY);

// RIGHT COLUMN
  text("THIS RESTAURANT LOOKS AMAZING", width - 550, windowHeight + 50 + chatScrollY);
  text("UNREAL", width - 550, windowHeight + 100 + chatScrollY);
  text("WERE DOING THIS HIKE", width - 550, windowHeight + 150 + chatScrollY);
  text("THE ICED VANILLA LATTE LOOKS INCREDIBLE", width - 550, windowHeight + 200 + chatScrollY);


// SECOND BLOCK (REPEATED) 

let offset = 400;  // moves the second block down

// LEFT COLUMN
  text("OMG THIS IS US", width - 850, windowHeight + 50 + offset + chatScrollY);
  text("WE HAVE TO GO HERE", width - 850, windowHeight + 100 + offset + chatScrollY);
  text("I NEED THIS", width - 850, windowHeight + 150 + offset + chatScrollY);
  text("WOWWWW", width - 850, windowHeight + 200 + offset + chatScrollY);

// RIGHT COLUMN
  text("THIS RESTAURANT LOOKS AMAZING", width - 550, windowHeight + 50 + offset + chatScrollY);
  text("UNREAL", width - 550, windowHeight + 100 + offset + chatScrollY);
  text("WERE DOING THIS HIKE", width - 550, windowHeight + 150 + offset + chatScrollY);
  text("THE ICED VANILLA LATTE LOOKS INCREDIBLE", width - 550, windowHeight + 200 + offset + chatScrollY);



  // move upward
  chatScrollY -= 2;

  // reset when off screen
  if (chatScrollY < -1200) {
    chatScrollY = 0;
  }
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
        if (mouseY > 175 && mouseY < 210) {
          activeTab = "Recommended";
          scrolling = true
          chatScrolling = false    
}

        if (mouseY > 225 && mouseY < 260) {
        activeTab = "My Chats";
        scrolling = false;      // stop Recommended scrolling
        chatScrolling = true;   // start My Chats scrolling
        chatScrollY = 0;        // reset for clean start
}

}

      }
    }
  }

