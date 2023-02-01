video = "";
input = "";
stats = "";
objects = [] ;

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
    if (stats != "") 
    {
        objectDetector.detect(video,gotResult);
        for (let i = 0; i < objects.length; i++)
        {
                document.getElementById("status").innerHTML = "Status : Object Detected" ;

                fill("FF0000") ;
                percent = floor(objects[i].confidence * 100) ;
                text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
                noFill() ;
                stroke("FF0000") ;
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height) ;

                if(object[i].label == input) 
                {
                    var synth = window.speechSynthesis ;
                    speak_data = "Object Found" ;
                    var utterThis = new SpeechSynthesisUtterance(speak_data) ;
                    synth.speak(utterThis) ;
                    document.getElementById("found").innerHTML = object[i].label + " Is Found" ;
                }
        }
    }
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

function gotResult(error, results) 
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results ;
    }
}