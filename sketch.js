let mobilenet;
let video;
let label = '';

function modelReady() {
  console.log('Model READY!');
  mobilenet.predict(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    label = results[0].className;
    mobilenet.predict(gotResults);

  }
}

function setup() {
  createCanvas(350, 500);
  video = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);  
  var msg = new SpeechSynthesisUtterance(label);
  window.speechSynthesis.speak(msg);  
  text(label, 10, height - 20);
}