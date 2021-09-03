
var PLAY=1;
var END=0;
var gameState=1;

var girl,butterfly ,cactus,butterflyGroup,cactusGroup, score,r,randombutterfly, position;
var girlImage , butterfly1, butterfly2 ,butterfly3,butterfly4, cactusImage, gameOverImage,go,kn
var butterfly,bg,sound,gameOver;
function preload(){
  
  girlImage = loadImage("girl.png");
  cactusImage = loadImage("cactus1.png")
  butterfly1 = loadImage("butterfly1.png");
  butterfly2 = loadImage("butterfly2.png");
  butterfly3 = loadImage("butterfly3.png");
  butterfly4 = loadImage("butterfly4.png");
  gameOverImage = loadImage("gameover.png")
  bg=loadImage("garden.png");
  sound=loadSound("sound1.wav")


}



function setup() {
  createCanvas(600, 600);
 
  Background=createSprite(300,300,600,600);
  Background.addImage(bg)
  Background.scale=3.5

  gameOver=createSprite(300,200,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
 
   girl=createSprite(40,200,20,20);
   girl.addImage(girlImage);
   girl.scale=0.7
   girl.visible=true;

  
  
  girl.setCollider("rectangle",0,0,40,40);


  

  score=0;
  butterflyGroup=createGroup();
  cactusGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    sound.play();
    butterflys();
    cactusfun();

    gameOver.visible=false;
    girl.visible=true;


    
   
    girl.y=World.mouseY;
    girl.x=World.mouseX;
   butterflyGroup.velocityY = -(4+5*score/100);
   
    if(butterflyGroup.isTouching(girl)){
      score=score+1
      
      butterflyGroup.destroyEach();
    }

    if(cactusGroup.isTouching(girl)){
      gameState=END;
    }
  }
    else if(gameState===END)
    {
        butterflyGroup.destroyEach();
        cactusGroup.destroyEach();
        butterflyGroup.setVelocityYEach(0);
        cactusGroup.setVelocityYEach(0);
        
         gameOver.visible=true;
         girl.visible=false;


     if(mousePressedOver(gameOver)) {
       reset();
     }  

    }
    
    
  
  
 drawSprites();

  
  textSize(25);
fill("red")
 text("Score : "+ score,200,70);
}

function reset(){
gameState=PLAY;
score=0;
sound.stop();
}

function cactusfun(){
  if(World.frameCount%200===0){
    cactus=createSprite(400,-50,20,20);
    cactus.addImage(cactusImage);
    cactus.x=Math.round(random(100,550));
  
    cactus.velocityY = score/100+8;
    cactus.setLifetime=50;
    
    cactusGroup.add(cactus);
  }
}

function butterflys(){
  if(World.frameCount%80===0){
   
    butterfly=createSprite(400,200,20,20);
    butterfly.x=Math.round(random(50,550));
    butterfly.velocityY=score/100+5;
    
    butterfly.scale=0.2;
    
     r=Math.round(random(1,4));
    if (r == 1) {
      butterfly.addImage(butterfly1);
    } else if (r == 2) {
      butterfly.addImage(butterfly2);
    } else if (r == 3) {
      butterfly.addImage(butterfly3);
    } else {
      butterfly.addImage(butterfly4);
    }
  
    butterfly.setLifetime=100;
    
    butterflyGroup.add(butterfly);
  }
}
