var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var SurvivalTime=0;
var ground;

//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
 monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(500, 500);

 //groups
 FoodGroup = createGroup();
 obstacleGroup = createGroup();
  
 //creating monkey
 monkey=createSprite(80, 315, 20, 20);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale=0.12;  
  
}


function draw() {
  background("skyblue"); 

 
 //creating Ground
  ground=createSprite(400, 350, 500, 10);
  ground.velocityX=-(4+score*1.5/100);
  ground.x = ground.width/2;
  //console.log(ground.x)
  
 if(gameState===PLAY){
  //calling functions
  bananas();
  obstacles();
  
  //score
   fill("black");
   textSize(15)
   text("score: "+score,150,40);
     
   //survival time
  fill("black");
  textSize(15)
  SurvivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime: "+SurvivalTime,300, 40);
  
  //jump the monkey
  if(keyDown("space")&&monkey.y >= 235){
    monkey.velocityY=-13;
  }
   
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
   
   
  //if monkey touches bananas
  if(monkey.isTouching(FoodGroup)){
    score = score + 1;
    FoodGroup.destroyEach();
  }
     
  //if monkey touches obstacles
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
 }

    
  //lifetime
  ground.lifetime=100;

  if(gameState === END){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach(); 
    monkey.visible=false;
    
    textSize(20);
    fill("red");
    text("Game Over",200, 200);
    
    textSize(20);
    fill("red");
    text("press R to restart", 150, 150);
    }
  //press R to restart the game
  if(keyWentDown("r")){
     monkey.visible=true;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
   
    score=0;
    survivalTime=0;
    gameState=PLAY;  
   
      //jump the monkey
  if(keyDown("space")&&monkey.y >= 235){
    monkey.velocityY=-13;
  }
   
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
    
  }
  drawSprites();
}
function bananas(){
   if (frameCount % 100 === 0){
    banana = createSprite(500,200, 50, 50 )
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);             
    banana.lifetime = 220;
    FoodGroup.add(banana);
   }
   }

function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(500,315,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle); 
    obstacle.debug=false;
    obstacle.setCollider("rectangle",25,55,500,500);
   } 
   }




