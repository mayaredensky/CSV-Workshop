// Full integrated sketch
// Click the TikTok BOX (the image that appears next to the cartoon) to open the DM feed.

// ----------------------------
// CONFIG / GLOBALS
// ----------------------------
const BOX_W = 150;
const BOX_H = 150;

let data = [
  { company: "Text", date: "10/1/25", location: "mobile", service: "Communication", image: "text.png", position: "top-left" },
  { company: "TikTok", date: "10/2/25", location: "mobile", service: "SocialMedia", image: "tiktok.png", position: "top-right" },
  { company: "Instagram", date: "10/3/25", location: "mobile", service: "SocialMedia", image: "instagram.png", position: "bottom-right" },
  { company: "GroupMe", date: "10/4/25", location: "mobile", service: "Communication", image: "groupme.png", position: "bottom-left" }
];

let imagesByCompany = {};
let activeImages = {}; // currently toggled boxes

let cartoonImg;
let tiktokScreens = []; // three screenshots for the TikTok feed
let tiktokCaptions = [
  "omg we have to go here",
  "literally us",
  "every tulane guy"
];

// Panel state
let panelOpen = false;
let panelProgress = 0;     // 0..1 for opening animation
let feedItems = [];        // mixed items (image/text) for feed
let feedStartY = 0;        // starting Y for feed items (below screen)
let feedSpeed = 1.0;       // upward speed (px/frame)
let feedGraphics = null;   // createGraphics buffer for clipping

function preload() {
  // cartoon and small icons
  cartoonImg = loadImage("images/cartoon.png",
    () => console.log("cartoon loaded"),
    () => console.error("cartoon failed to load")
  );

  for (let i = 0; i < data.length; i++) {
    let c = data[i].company;
    imagesByCompany[c] = loadImage("images/" + data[i].image,
      () => console.log(c + " icon loaded"),
      () => console.error("failed to load icon for", c)
    );
  }

  // load TikTok screenshots - make sure these filenames match your folder
  tiktokScreens[0] = loadImage("images/tiktok1.png",
    () => console.log("tiktok1 loaded"),
    () => console.error("tiktok1 failed")
  );
  tiktokScreens[1] = loadImage("images/tiktok2.png",
    () => console.log("tiktok2 loaded"),
    () => console.error("tiktok2 failed")
  );
  tiktokScreens[2] = loadImage("images/tiktok3.png",
    () => console.log("tiktok3 loaded"),
    () => console.error("tiktok3 failed")
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
  textSize(16);
  rectMode(CORNER);

  // Buttons to toggle boxes
  for (let i = 0; i < data.length; i++) {
    let company = data[i].company;
    let btn = createButton(company);
    btn.position(30 + i * 120, 18);
    btn.mousePressed(() => {
      if (activeImages[company]) delete activeImages[company];
      else activeImages[company] = data[i];
    });
  }

  // Prepare feed items (mixed order: img,text,img,text,img,text)
  buildFeedItems();

  // create graphics buffer for clipping feed content (will resize in draw)
  feedGraphics = createGraphics(800, 400);
}

function draw() {
  background(245);

  // Center the cartoon in the middle of the screen
  drawCartoonCentered();

  // Draw active boxes around the cartoon
  for (let key in activeImages) {
    drawBoxFor(activeImages[key]);
  }

  // If the panel is open, draw dim background + panel on top
  if (panelOpen) {
    // animate panelProgress toward 1
    panelProgress = lerp(panelProgress, 1, 0.12);
    drawDimmedBackground();
    drawTikTokPanel();
  }
}

// ----------------------------
// Helpers: cartoon + boxes
// ----------------------------
function drawCartoonCentered() {
  let w = min(500, width * 0.35);
  let h = w;
  let x = width/2 - w/2;
  let y = height/2 - h/2;
  if (cartoonImg) image(cartoonImg, x, y, w, h);
}

function drawBoxFor(info) {
  // calculate x,y based on position labels relative to canvas & cartoon center
  let margin = 50;
  let x, y;
  switch (info.position) {
    case "top-left":
      x = margin;
      y = margin + 80;
      break;
    case "top-right":
      x = width - BOX_W - margin;
      y = margin + 80;
      break;
    case "bottom-left":
      x = margin;
      y = height - BOX_H - margin - 40;
      break;
    case "bottom-right":
      x = width - BOX_W - margin;
      y = height - BOX_H - margin - 40;
      break;
    default:
      x = margin; y = margin;
  }

  // box background + border
  push();
  stroke(60);
  strokeWeight(2);
  fill(255);
  rect(x, y, BOX_W, BOX_H, 12);

  // draw company's icon
  let img = imagesByCompany[info.company];
  if (img) {
    imageMode(CENTER);
    image(img, x + BOX_W/2, y + BOX_H/2, BOX_W * 0.8, BOX_H * 0.8);
  }

  // label below
  noStroke();
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  text(info.company, x, y + BOX_H + 6);
  pop();
}

// ----------------------------
// MOUSE: clicking boxes (open panel when clicking the TikTok BOX)
// ----------------------------
function mousePressed() {
  // If panel is open, check close button (click handled inside panel drawing) OR ignore underlying
  if (panelOpen) {
    // check close button area (we'll compute inside drawTikTokPanel).
    // We'll just let drawTikTokPanel handle close clicks — so do nothing here.
    return;
  }

  // Not in panel: check each active box
  for (let key in activeImages) {
    let info = activeImages[key];
    let x, y;
    let margin = 50;
    switch (info.position) {
      case "top-left":
        x = margin;
        y = margin + 80;
        break;
      case "top-right":
        x = width - BOX_W - margin;
        y = margin + 80;
        break;
      case "bottom-left":
        x = margin;
        y = height - BOX_H - margin - 40;
        break;
      case "bottom-right":
        x = width - BOX_W - margin;
        y = height - BOX_H - margin - 40;
        break;
      default:
        x = margin; y = margin;
    }

    if (mouseX > x && mouseX < x + BOX_W && mouseY > y && mouseY < y + BOX_H) {
      // clicked this box
      if (info.company === "TikTok") {
        // open the panel and reset feed positions
        openTikTokPanel();
      } else {
        // default small behavior for other apps
        alert(info.company + " clicked");
      }
      break; // stop after first hit
    }
  }
}

// ----------------------------
// BUILD FEED ITEMS (mixed order image/text)
// ----------------------------
function buildFeedItems() {
  feedItems = [];

  // push in the mixed order: image1 -> text1 -> image2 -> text2 -> image3 -> text3
  for (let i = 0; i < 3; i++) {
    feedItems.push({ type: "img", img: tiktokScreens[i] || null });
    feedItems.push({ type: "text", text: tiktokCaptions[i] || "" });
  }

  // initial placement: all start below the visible feed area; actual Y will be set when opening panel
}

// ----------------------------
// OPEN / CLOSE PANEL
// ----------------------------
function openTikTokPanel() {
  panelOpen = true;
  panelProgress = 0;

  // set up feed initial Y positions: start all below the panel content area.
  // compute content area size similarly to drawTikTokPanel
  let panelW = min(900, width - 60);
  let panelH = min(600, height - 120);
  let contentW = panelW - 40;
  let screenW = contentW - 40;
  let screenH = round(screenW * (9/16));

  // compute total content height
  let gap = 18;
  let totalContentHeight = 0;
  for (let it of feedItems) {
    if (it.type === "img") totalContentHeight += screenH + gap;
    else totalContentHeight += 50 + gap; // text box height approximation
  }

  // start feed Y so that the first element begins off-screen at bottom of panel's content box
  // we'll set feedStartY relative to panel content area: contentY + contentH + small offset
  feedStartY = height/2 + panelH/2 + 20;
  // assign y positions to feed items
  let y = feedStartY;
  for (let it of feedItems) {
    it.y = y;
    if (it.type === "img") y += screenH + gap;
    else y += 50 + gap;
  }

  // prepare clipping graphics sized to panel content (will resize in draw)
  feedGraphics = createGraphics(contentW, panelH - 80);
}

function closeTikTokPanel() {
  panelOpen = false;
  panelProgress = 0;
}

// also allow ESC to close
function keyPressed() {
  if (keyCode === ESCAPE && panelOpen) closeTikTokPanel();
}

// ----------------------------
// DRAW PANEL & CONTENT
// ----------------------------
function drawDimmedBackground() {
  push();
  let alpha = lerp(0, 190, panelProgress);
  noStroke();
  fill(0, alpha);
  rect(0, 0, width, height);
  pop();
}

function drawTikTokPanel() {
  // panel sizing and position
  let panelW = min(900, width - 60);
  let panelH = min(600, height - 120);
  let centerX = width/2, centerY = height/2;
  let p = easeOutCubic(panelProgress);
  let px = centerX - panelW/2;
  let py = centerY - panelH/2 + (1 - p) * 60; // slight slide-up effect

  // panel background
  push();
  noStroke();
  fill(252, 252, 252, lerp(0, 255, panelProgress));
  rect(px, py, panelW, panelH, 18);

  // header and close button
  fill(20);
  textSize(20);
  textAlign(LEFT, CENTER);
  text("TikTok DM — screenshots", px + 20, py + 30);

  // close button
  let closeX = px + panelW - 44;
  let closeY = py + 12;
  fill(230, 60, 60);
  rect(closeX, closeY, 28, 28, 6);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("✕", closeX + 14, closeY + 14);

  // content area
  let contentX = px + 20;
  let contentY = py + 60;
  let contentW = panelW - 40;
  let contentH = panelH - 80;

  // inner white area
  push();
  translate(contentX, contentY);
  // white background for content
  noStroke();
  fill(255);
  rect(0, 0, contentW, contentH, 12);

  // Prepare feedGraphics to draw content clipped
  feedGraphics.resizeCanvas(contentW, contentH);
  feedGraphics.clear();
  feedGraphics.noStroke();
  feedGraphics.textFont("Arial");

  // compute layout sizes inside content
  let gap = 18;
  let screenW = contentW - 40;
  let screenH = round(screenW * (9/16));
  let xOffset = 20;

  // update feed items Y positions (move up)
  for (let it of feedItems) {
    it.y -= feedSpeed;
  }

  // If all items have scrolled above top by a lot, reset to loop
  let lastY = feedItems[feedItems.length - 1].y;
  if (lastY < -200) {
    // reset: start again from bottom of content area
    let y = contentH + 20;
    for (let it of feedItems) {
      it.y = y;
      if (it.type === "img") y += screenH + gap;
      else y += 50 + gap;
    }
  }

  // draw each item into feedGraphics (positions relative to content top-left)
  for (let i = 0; i < feedItems.length; i++) {
    let it = feedItems[i];
    let drawY = it.y - (contentY - py); // adjust feed item y into content coordinate
    // BUT simpler: since we set initial item.y relative to canvas, convert to content local:
    let localY = it.y - (py + 60);

    if (it.type === "img") {
  feedGraphics.push();

  // Feed box background
  feedGraphics.fill(240);
  feedGraphics.rect(xOffset, localY, screenW, screenH, 10);

  if (it.type === "img") {
  feedGraphics.push();

  // The box keeps its original height (screenH)
  feedGraphics.fill(240);
  feedGraphics.rect(xOffset, localY, screenW, screenH, 10);

  if (it.img) {
    feedGraphics.imageMode(CORNER);

    // scale factor for smaller image inside the box
    let scaleFactor = 0.6;
    let imgW = screenW * scaleFactor;
    let imgH = imgW * (it.img.height / it.img.width); // preserve original ratio

    // center image horizontally, top padding only (no vertical centering!)
    let imgX = xOffset + (screenW - imgW) / 2;
    let imgY = localY + 10; // small padding from top of box

    feedGraphics.image(it.img, imgX, imgY, imgW, imgH);
  }

  feedGraphics.pop();
} else if (it.type === "text") {
  feedGraphics.push();
  let boxW = screenW;
  let boxH = 50;

  feedGraphics.fill(255);
  feedGraphics.stroke(220);
  feedGraphics.rect(xOffset, localY, boxW, boxH, 12);

  feedGraphics.noStroke();
  feedGraphics.fill(20);
  feedGraphics.textSize(16);
  feedGraphics.textAlign(LEFT, CENTER);
  feedGraphics.text(it.text, xOffset + 12, localY + boxH/2, boxW - 24);

  feedGraphics.pop();
}

}
  }

  // draw feedGraphics to main canvas at contentX, contentY
  image(feedGraphics, 0, 0, contentW, contentH, 0, 0, contentW, contentH);
  pop(); // end inner translate contentX, contentY

  pop(); // end panel

  // instructions
  push();
  fill(0, 120);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text("Press ESC or click ✕ to close", width/2, py + panelH + 18);
  pop();

  // handle close-button clicks (we detect here using global mouseIsPressed)
  if (mouseIsPressed) {
    // compute mouse in panel coords
    if (mouseX >= closeX && mouseX <= closeX + 28 && mouseY >= closeY && mouseY <= closeY + 28) {
      // slight debounce: wait a frame to ensure it registers once
      closeTikTokPanel();
      // prevent immediate re-opening by clearing mouseIsPressed (not possible), rely on user behavior
    }
  }
}

// easing
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// ----------------------------
// SCROLL CONTROL (mouseWheel & touch)
// ----------------------------
function mouseWheel(event) {
  if (!panelOpen) return;
  // scroll feed by wheel
  for (let it of feedItems) {
    it.y -= event.delta * 0.6; // invert as needed
  }
  return false; // prevent page scroll
}

function touchMoved() {
  if (!panelOpen) return false;
  for (let it of feedItems) {
    it.y += movedY; // movedY is positive when dragging down, so this matches
  }
  return false;
}

// ----------------------------
// RESIZE
// ----------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ----------------------------
// END
// ----------------------------
