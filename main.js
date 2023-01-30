video = "";
input = "";

function preload() 
{
    video = createCapture(VIDEO);
    video.hide() ;
}

function setup() 
{
    canvas = createCanvas(480,380) ;
    canvas.position(520,160) ;
}

function draw() 
{
    image(video,0,0,480,380) ;
}

function start() 
{
    objectDetector = ml5.objectDetector("cocossd",modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Detecting Objects" ;
    input = document.getElementById("input").value ;
}

function modelLoaded() 
{
    console.log("Model Loaded !");
    stats = true ;
    video.loop() ;
    video.speed(1);
    video.volume(0) ;
}