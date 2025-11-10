let cartoonImg;

// Embed data directly in the script
let data = [
  { company: "Text", date: "10/1/25", location: "mobile", service: "Communication", image: "text.png", position: "top-left" },
  { company: "TikTok", date: "10/2/25", location: "mobile", service: "SocialMedia", image: "tiktok.png", position: "top-right" },
  { company: "Instagram", date: "10/3/25", location: "mobile", service: "SocialMedia", image: "instagram.png", position: "bottom-right" },
  { company: "GroupMe", date: "10/4/25", location: "mobile", service: "Communication", image: "groupme.png", position: "bottom-left" }
];

let images = {}; // store preloaded images
let activeImages = {}; // track which are displayed

function preload() {
  // load cartoon
  cartoonImg = loadImage("images/cartoon.png", 
    () => console.log("Cartoon loaded"), 
    () => console.error("Failed to load cartoon.png")
  );

  // preload all other images
  for (let i = 0; i < data.length; i++) {
    let company = data[i].company;
    let imgPath = "images/" + data[i].image;
    images[company] = loadImage(imgPath,
      () => console.log(company + " image loaded"),
      () => console.error("Failed to load", imgPath)
    );
  }
}

function setup() {
  createCanvas(1500, 800);
  textFont("Arial");
  textSize(16);

  // create clickable buttons
  for (let i = 0; i < data.length; i++) {
    let company = data[i].company;
    let btn = createButton(company);
    btn.position(50 + i * 120, 20);
    btn.mousePressed(() => {
      // toggle image visibility
      if (activeImages[company]) {
        delete activeImages[company];
      } else {
        activeImages[company] = data[i];
      }
      console.log("Toggled:", company);
    });
  }
}

function draw() {
  background(220);

  // draw cartoon in the center
  let cartoonW = 400;
  let cartoonH = 400;
  let cartoonX = width / 2 - cartoonW / 2;
  let cartoonY = height / 2 - cartoonH / 2;
  image(cartoonImg, cartoonX, cartoonY, cartoonW, cartoonH);

  // draw active images around the cartoon
  for (let key in activeImages) {
    let info = activeImages[key];
    let img = images[key];
    let x, y;
    let imgW = 150;
    let imgH = 150;

    switch (info.position) {
      case "top-left":
        x = 50;
        y = 100;
        break;
      case "top-right":
        x = width - imgW - 50;
        y = 100;
        break;
      case "bottom-left":
        x = 50;
        y = height - imgH - 100;
        break;
      case "bottom-right":
        x = width - imgW - 50;
        y = height - imgH - 100;
        break;
    }

    image(img, x, y, imgW, imgH);

    fill(0);
    text(`Company: ${info.company}`, x, y + imgH + 20);
    text(`Date: ${info.date}`, x, y + imgH + 40);
    text(`Service: ${info.service}`, x, y + imgH + 60);
    text(`Location: ${info.location}`, x, y + imgH + 80);
  }
}
