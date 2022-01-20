modelStatus="";
img = "";
objects = []
function preload() {
   img = loadImage("BOOKS.jpeg");
}
function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status1").innerHTML="Status: Detecting Objects..."
}
function draw(){
    image(img,0,0,640,420);
    objectDetector.detect(img, gotResult)
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status1").innerHTML = "Status : Objects Detected <i class='fa fa-check'></i>";
        document.getElementById("numberofobj1").innerHTML = "Number of Objects Detected are : " + objects.length;
        fill("black");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("Red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
function modelLoaded(){
    console.log("The model has loaded.")
    modelStatus="true";
}
function gotResult(error,results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}