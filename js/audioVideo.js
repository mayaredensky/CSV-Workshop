
let modemSound
let canvas

let audioButton
let videoButton

let modemVolSlider
let modemRateSlider

let modemAmplitude
let mappedAmplitude

let videoPlaying = false

let t1000Vid


function preload(){

	modemSound = loadSound('media/ModemSound.mp3')

}


function setup(){
	canvas = createCanvas(windowWidth, windowHeight)
	canvas.position(0,0)
	canvas.style('z-index', '-1')


	audioButton = createButton('Play Modem')
	audioButton.mousePressed(playAudio)

	videoButton = createButton('Play Video')
	videoButton.mousePressed(playVideo)

	modemAmplitude = new p5.Amplitude()

	modemVolSlider = createSlider(0, 3, 1, 0.01)

	modemRateSlider = createSlider(0,2,1, 0.01)

	t1000Vid = createVideo(['media/T1000Reforming.mp4'])


}


function playAudio(){
	if(!modemSound.isPlaying()){
		modemSound.loop()
		audioButton.html('Pause Modem')

	}else{
		modemSound.pause()
		audioButton.html('Play Modem')
	}
}

function playVideo(){
	if(!videoPlaying){
		t1000Vid.loop()
		videoButton.html('Pause Video')

	}else{
		t1000Vid.pause()
		videoButton.html('Play Video')
	}

	videoPlaying = !videoPlaying

}



function draw(){
	modemSound.setVolume(modemVolSlider.value())
	modemSound.rate(modemRateSlider.value())

	mappedAmplitude = modemAmplitude.getLevel() * 1000

	fill(map(mappedAmplitude, 0, 300, 0, 255))

	ellipse(windowWidth/2, windowHeight/2, mappedAmplitude, mappedAmplitude)

	//modem.rate(map(mouseX, 0, windowWidth, 0, 2))

}
