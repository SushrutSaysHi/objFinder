var canvas = " ";
var mp4file = " ";
var stats = " ";
var object = [];
var detective = " ";
var object_name = " ";

function preload(){
     mp4file = createVideo("video.mp4");
}

function setup(){
     canvas = createCanvas(380, 480);
     canvas.center();
     mp4file.hide();
}

function draw(){
     image(mp4file, 0, 0, 380, 480);

     if(stats != " "){
          detective.detect(mp4file, gotResults);
          for (var i = 0; i < object.length; i++) {
               document.getElementById("status").innerHTML = "Objects Detected";
               

               fill("#09420a");
               var percent = floor(object[i].confidence * 100) ;
               text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
               noFill();
               stroke("#09420a");
               rect(object[i].x, object[i].y, object[i].width, object[i].height);

               object_name =  document.getElementById("obj_name").value;

               if(object[i].label == object_name){
                    document.getElementById("objs").innerHTML = "Object Found";
                    console.log("detected");
               }

          }
     }
}

function start() {
     
     detective = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Starting";

}

function modelLoaded() {
     console.log("Model is loaded");
     stats = true;
     mp4file.loop();
     mp4file.speed(1);
     mp4file.volume(1);
}

function gotResults(error, results) {
     if (error) {
          console.error(error);
     } else {
          console.log(results);
          object = results;
     }
}

