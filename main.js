video=""
status1=""
objects=[]
function preload(){
    video=createVideo('video.mp4')
    video.hide()
}
function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
}
function draw(){
    image(video,0,0,480,380)
        if(status1 !=""){
           objectDetector.detect(video, gotResults)
           for(i=0; i<objects.length; i++){
            document.getElementById('status').innerHTML="Status; Objects Detected"
            document.getElementById('number_of_objects').innerHTML="Number of Objects Detected"+objects.length
            fill("#FF0000")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
           }
        }
    }

function start(){
    objectDetector=ml5.objectDetector("cocossd" , ModelLoaded)
    document.getElementById("status").innerHTML="Status; Detecting Objects"
}
function ModelLoaded(){
    console.log("Model Has Been Loaded")
    status1="true"
}
function gotResults(error, results){
    if(error){
        console.error(error)
    }
    if(results){
        console.log(results)
        objects=results
    }
    }