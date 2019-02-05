let mobilenet;
let video;
let label = '';
let temp;
let counter = 0;

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

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


if(!isMobileDevice) {
	function setup() {
		createCanvas(350, 450);  
		video = createCapture({
			video: {
				facingMode: {
					exact: "user"
				}
			}
		});
		video.hide();
		background(0);
		mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
	}

	function draw() {
		background(0);
		image(video, 0, 0);
		fill(255);
		textSize(14);    
		if(temp != label) {
			var speech = new SpeechSynthesisUtterance(label);
			speech.rate = 3;
			speechSynthesis.speak(speech); 
			console.log("speach ready mobile");
		}
		temp = label;
		text(label, 10, height - 20);
		text("mobile", 15, height - 30);
	}
} else {
	function setup() {
		createCanvas(600, 500);  
		video = createCapture(VIDEO);
		video.hide();
		background(0);
		mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
	}

	function draw() {
		background(0);
		image(video, 0, 0);
		fill(255);
		textSize(32);    
		if(temp != label) {
			var speech = new SpeechSynthesisUtterance(label);
			speech.rate = 3;
			speechSynthesis.speak(speech); 
			console.log("speach ready");
		}
		temp = label;
		text(label, 10, height - 20);
	}
}




