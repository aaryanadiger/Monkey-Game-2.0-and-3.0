var bananaImage,obstacleImage, obstacleGroup,foodGroup, backGround, backImage, backImage,monkey_running, score, monkey,inviGround;
var bananas;
var obstacle;

function preload(){
  backImage = loadImage("jungle2.jpg");
  monkey_running =   loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400,400);

  backGround =createSprite(200,200,400);
  backGround.addImage("background",backImage);
  
  inviGround = createSprite(10,372,40000000,10);
  inviGround.visible = false;
  inviGround.shapeColor = "#714F39";
  
  
  monkey = createSprite(70,350,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.07;
  monkey.velocityX = 2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
  
}

function draw() {
  background("#076704");
  
  stroke("white");
  textSize(20);
  fill("white");

  backGround.x = camera.position.x + 150;
  
  
  monkey.collide(inviGround);
  
  if (keyDown("space")){
    monkey.velocityY = -12; 
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
  }
   
  switch(score){
    case 10: monkey.scale = 0.10;
      break;
    case 20: monkey.scale = 0.12;
      break;
    case 30: monkey.scale = 0.14;
      break;
    case 40: monkey.scale = 0.16;
      break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.07;
    score = 0;
    obstacleGroup.destroyEach();
  }

 spawnBananas();
 spawnObstacles();
  
  drawSprites();
  text("Score: "+ score,camera.position.x + 100,50);

  camera.position.x = monkey.x + 150;
  console.log(camera.position.x);

  if(score === 50){
    background("black");
    monkey.destroy();
    backGround.visible = false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(25);
    fill("red");
    text("CONGRATS YOU WIN!!!",camera.position.x - 150,height/2);
  }
}

function spawnBananas(){
  if (camera.position.x % 40 === 0){
  bananas = createSprite(50,320,40,10);
  bananas.y = random(120,200);
  bananas.x = random(500,4000)
  bananas.addImage("Banana",bananaImage);
  bananas.scale = 0.05;
  bananas.lifetime = 4000;
  foodGroup.add(bananas);
  }
}

function spawnObstacles(){
   if(camera.position.x % 60 === 0) {
    obstacle = createSprite(450,350,10,40);
    obstacle.x = random(380,4000)
    obstacle.addImage("Stone",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 4000;
    obstacleGroup.add(obstacle);
    
  }
}
