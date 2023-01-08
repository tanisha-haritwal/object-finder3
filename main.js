status1="";
objects=[];
input_value="";
function setup(){
canvas = createCanvas(450,350);
canvas.center();
video = createCapture(VIDEO);
video.size(450,350);
video.hide();
}
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status1").innerHTML="Status: Detecting Objects";    
input_value = document.getElementById("input1").value;
}
function modelLoaded(){
console.log('Model Loaded!');
status1=true;
}
function gotResult(error, results){
if(error){
console.error(error);
}
console.log(results);
objects=results;
}
function draw(){
image(video,0,0,480,380);
if(status != ""){
for(i=0; i < objects.length; i++){
percent= floor(objects[i].confidence * 100);
fill("#FF0000");
text(objects[i].label + " " + percent + "%" + objects[i].x + 15 + objects[i].y + 15);
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == input_value){
video.stop();
objectDetector.detect(gotResult);
document.getElementById("status2").innerHTML=input_value + "Found";
speech_synthesis = window.speechSynthesis;
synthesis = new SpeechSynthesisUtterance(input_value + "Found");
speech_synthesis.speak(synthesis);
}
else{
document.getElementByIs("status2").innerHTML= input_value + "Not Found";
}
}
}
}