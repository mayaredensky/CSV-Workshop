
let modemSound
let canvas

let audioButton

let modemVolSlider
let modemRateSlider

function preload(){

	modemSound = loadSound('media/ModemSound.mp3')

}


function setup(){
	canvas = createCanvas(windowWidth, windowHeight)
	canvas.position(0,0)
	canvas.style('z-index', '-1')


	audioButton = createButton('Play Modem')
	audioButton.mousePressed(playAudio)

	modemVolSlider = createSlider(0, 3, 1, 0.01)

	modemRateSlider = createSlider(0,2,1, 0.01)


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



function draw(){

}
