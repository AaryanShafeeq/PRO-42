var score = 0;
var gun, bluebubble, redbubble, bullet, backBoard;
var gunImg, bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life = 3;
var score = 0;
var gameState = 1

function preload() {
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg = loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard = createSprite(50, width / 2, 100, height);
  backBoard.addImage(backBoardImg)

  gun = createSprite(100, height / 2, 50, 50);
  gun.addImage(gunImg)
  gun.scale = 0.2

  bulletGroup = createGroup();
  blueBubbleGroup = createGroup();
  redBubbleGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreboard.html("Score: " + score);
  scoreboard.style("color:red");
  scoreboard.position(width - 200, 20);

  if (gameState === 1) {
    gun.y = mouseY

    if (frameCount % 80 === 0) {
      drawBlueBubble();
    } else if (frameCount % 100 === 0) {
      drawRedBubble();
    }

    if (keyDown("space")) {
      shootBullet();
    }

    if (redBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(redBubbleGroup);
    }

    if (blueBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(blueBubbleGroup);
    }

    if (redBubbleGroup.collide(backBoard)) {
      handleGameOver(redBubbleGroup);
    }

    if (blueBubbleGroup.collide(backBoard)) {
      handleGameOver(blueBubbleGroup);
    }

    drawSprites();
  }
}

function shootBullet() {
  bullet = createSprite(gun.position.x, gun.position.y, 20, 20);
  bullet.addImage("bullet", bulletImg);
  bullet.scale = 0.2;
  bullet.y = gun.y;
  bullet.velocityX = 10;
  bullet.lifetime = 70;

  bulletGroup.add(bullet);
}

function drawBlueBubble() {
  let blueBubble = createSprite(800, random(20, 780), 40, 40);
  blueBubble.addImage("blueBubble", blueBubbleImg);
  blueBubble.scale = 0.1;
  blueBubble.velocityX = -8;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);
}

function drawRedBubble() {
  let redBubble = createSprite(800, random(20, 780), 40, 40);
  redBubble.addImage("redBubble", redBubbleImg);
  redBubble.scale = 0.1;
  redBubble.velocityX = -8;
  redBubble.lifetime = 400;
  redBubbleGroup.add(redBubble);
}

function handleBubbleCollision(bubblesGroup) {
  if (life > 0) {
    score = score + 1;
  };

  let blast = createSprite(bullet.x, bullet.y, 40, 40);
  blast.addImage("blast", blastImg);
  blast.scale = 0.3;
  blast.lifetime = 20;

  bubblesGroup.destroyEach();
  bulletGroup.destroyEach();
}

function handleGameOver(bubblesGroup) {
  life = life - 1
  bubblesGroup.destroyEach();

  if (life === 0) {
    gameState = 2;
    swal({
      title: "Game Over",
      text: "You lost the game..!!",
      text: "Your score was " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    })
  }
}