var song="";
var poseNet="";
var pulseLX=0;
var pulseLY=0;
var pulseRX=0;
var pulseRY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoad);
    poseNet.on("pose", gotpose);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("FF0000");
    circle(pulseLX,pulseLY,20);
    numberPulseL=Number(pulseLY);
    removeDecimals=floor(numberPulseL);
    volume = removeDecimals/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
    song.setVolume(volume);
}
function preload(){
    song=loadSound("music.mp3");
}
function playSound(){
    song.play();
   song.setVolume(1);
   song.rate(1);
}
function modelLoad(){
    console.log("modelo carregado");
}
function gotpose(results){
    if (results.length>0){
        console.log(results);
        pulseLX=results[0].pose.leftWrist.x;
        pulseLY=results[0].pose.leftWrist.y;
        pulseRX=results[0].pose.rightWrist.x;
        pulseRY=results[0].pose.rightWrist.y;
    }
}