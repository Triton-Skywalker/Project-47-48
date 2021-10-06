//variables for images
var balloon, bg, gameOver, obsB1, obsB2, obsB3, obsT1, obsT2, restart;

//Hot air balloon sprite
var hotAirBallon;

//varaibles for obstacles
var obsBottom;

//Group for bottom obstacles
var obsBottomGroup;

//varaibles for obstacles
var obsTop;

//Group for bottom obstacles
var obsTopGroup;

//bar variable
var bar;

//Group for bars
var barGroup;

//variable for score
var score = 0;

//gameState
var gamestate = 'play'

//restart button
var restartSpr;
function preload()
{
    //loads all the images and animations
    
    balloon = loadAnimation('balloon1.png','balloon2.png','balloon3.png')

    bg = loadImage('bg.png')
    gameOver = loadImage('gameOver.png')

    obsB1 = loadImage('obsBottom1.png')
    obsB2 = loadImage('obsBottom2.png')
    obsB3 = loadImage('obsBottom3.png')
    obsT1 = loadImage('obsTop1.png')
    obsT2 = loadImage('obsTop2.png')

    restart = loadImage('restart.png')
}

function setup()
{
    //Creates Canvas
    createCanvas(400,400)
   

    hotAirBallon = createSprite(100,200,20,50)
    hotAirBallon.addAnimation('HotAirBalloon', balloon)
    hotAirBallon.scale = .2

    obsBottomGroup = new Group()
    obsTopGroup = new Group()
    barGroup = new Group()

    restartSpr = createSprite(220,240)
    restartSpr.addImage('restart', restart)
    restartSpr.scale = .5
    restartSpr.visible = false

}

function draw()
{
    //Sets background color
    background(bg)
    if(gamestate == 'play')
    {
        text('Score: ' + round(score/13),250,50)
        if(keyDown('space'))
        {
            hotAirBallon.velocity.y = -5 
        }

        hotAirBallon.velocity.y = hotAirBallon.velocity.y + 2

        if(hotAirBallon.isTouching(barGroup))
        {
            score = score + 1
        }

        if(hotAirBallon.isTouching(obsBottomGroup) || hotAirBallon.isTouching(obsTopGroup) || hotAirBallon.y > height)
        {
            gamestate = 'end'
        }

        spanBottomObstacles()
        spanTopObstacles()
        spanBar()

    }
    else if(gamestate == 'end')
    {
        restartSpr.visible = true

        text('You lost the game at ' + round(score/13) + ' points.',200,90)
        hotAirBallon.velocity.x = 0
        hotAirBallon.velocity.y = 0

        obsTopGroup.setVelocityXEach(0)
        obsBottomGroup.setVelocityXEach(0)
        barGroup.setVelocityXEach(0)

        obsTopGroup.setLifetimeEach(-1)
        obsBottomGroup.setLifetimeEach(-1)
        barGroup.setLifetimeEach(-1)

        if(mousePressedOver(restartSpr))
        {
            gamestate = 'play'
            restartSpr.visible = false
            score = 0
            
            hotAirBallon.y = 150
            obsTopGroup.destroyEach()
            obsBottomGroup.destroyEach()
            barGroup.destroyEach()
        }
    }

    drawSprites()
}

function spanBottomObstacles()
{
    if(frameCount % 60 == 0)
    {
        obsBottom = createSprite(400,350,40,50)
        var rand = Math.round(random(1,3))
        switch(rand)
        {
            case 1 :
                obsBottom.addImage(obsB1)
            break;
            case 2 :
                obsBottom.addImage(obsB2)
            break;
            case 3 :
                obsBottom.addImage(obsB3)
            break;
            default :
                console.log('Error!')
            break;
        }
        obsBottom.velocity.x = -5
        obsBottom.scale = .07
        obsBottom.lifetime = 100
        obsBottomGroup.add(obsBottom)
    }
    
}

function spanTopObstacles()
{
    if(frameCount % 60 == 0)
    {
        obsTop = createSprite(400,50,40,50)
        var rand = Math.round(random(1,2))
        switch(rand)
        {
            case 1 :
                obsTop.addImage(obsT1)
            break;
            case 2 :
                obsTop.addImage(obsT2)
            break;
            default :
                console.log('Error!')
            break;
        }
        obsTop.velocity.x = -5
        obsTop.scale = .07
        obsTop.lifetime = 100
        obsTopGroup.add(obsTop)
    }
    
}

function spanBar()
{
    if (frameCount % 60 == 0)
    {
        bar = createSprite(400,200,10,800)
        bar.velocity.x = -5
        bar.lifetime = 70
        bar.visible = false
        
        barGroup.add(bar)
    }
}

