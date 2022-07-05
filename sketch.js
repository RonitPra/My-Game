var path,boy,cash,diamonds,jwellery,rock;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,rockImg;
var cashCollection = 0;
var scoreCollection = 0;
var cashG,rockGroup;
var stars,stars_img,starsGroup;
var successSound,defeatSound;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("back.jpg");
  boyImg = loadAnimation("player.png");
  cashImg = loadImage("money.png");
  rockImg = loadImage("rock.png");
  endImg = loadAnimation("gameOver.png");
  stars_img = loadImage("stars.png");
  successSound = loadSound("success.mp3");
  defeatSound = loadSound("defeat.mp3");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path = createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 6;
path.scale = 6


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale = 1.5;
boy.setCollider("rectangle",0,0,100,200);
  
  
cashG = new Group();
rockGroup = new Group();
starsGroup = new Group();


}

function draw() {

  if(gameState === PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges = createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createRock();
    createStars();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      cashCollection = cashCollection + 50;
      successSound.play();
    }      
    else{
      if(rockGroup.isTouching(boy) || starsGroup.isTouching(boy)) {
        gameState = END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x = width/2;
        boy.y = height/2;
        boy.scale = 0.6;
       
        defeatSound.play();
      
        
        cashG.destroyEach();
        rockGroup.destroyEach();
        starsGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        rockGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(30);
  fill(255);
  text("Score: " + cashCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(300, width-300),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale = 0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}


function createRock(){
  if (World.frameCount % 150 == 0) {
  var rock = createSprite(Math.round(random(300, width-300),40, 10, 10));
  rock.addImage(rockImg);
  rock.setCollider("circle",0,0,30);
  rock.scale = 0.2;
  rock.velocityY = 4;
  rock.lifetime = 200;
  rockGroup.add(rock);

  }
}

function createStars(){
  if(World.frameCount % 60 == 0){
    var stars = createSprite(Math.round(random(300,width-300),40,10,10));
    stars.addImage(stars_img);
    stars.setCollider("circle",0,0,30);
    stars.scale = 0.2;
    stars.velocityY = 4;
    stars.lifetime = 200;
    starsGroup.add(stars);
    
  }
}