let osc;
let playButton, stopButton, chooseWave, setVolume, toggleOnOff, setFreq;
let fft;

function setup() {
  createCanvas(400, 200);
  osc = new p5.Oscillator();
  osc.amp(0);

  fft = new p5.FFT();

  toggleOnOff = createButton('play');
  toggleOnOff.position(10, 10).style('font-family', 'courier');
  toggleOnOff.mousePressed(function() {
    if (osc.started) {
      osc.stop();
      toggleOnOff.html('play');
    } else {
      osc.start();
      toggleOnOff.html('stop');
    }
  });

  chooseWave = createSelect();
  chooseWave.position(60, 10).style('font-family', 'courier');
  chooseWave.option('sine');
  chooseWave.option('square');
  chooseWave.option('triangle');
  chooseWave.option('sawtooth');
  chooseWave.changed(function() {
    osc.setType(chooseWave.value());
    fill(chooseWave.value());
  });

  setVolume = createSlider(-60, 0, -60, 1);
  setVolume.position(150, 10);
  setVolume.input(function() {
    if (setVolume.value() > -56) {
      osc.amp(pow(10, setVolume.value() / 20), 0.01);
    } else {
      osc.amp(map(setVolume.value(), -60, 0 - 56, 0, 0.0016), 0.1);
    }
  });

  setFreq = createSlider(0, 1000, 0, 1);
  setFreq.position(150, 40);
  setFreq.input(function() {

    osc.freq(setFreq.value());


  });

  fill('white');
  noStroke();
}

function draw() {
  background(80);
  let spectrum = fft.analyze();
  beginShape();
  vertex(0, height);
  for (let i = 0; i < spectrum.length; i++) {
    vertex(map(log(i), 0, log(spectrum.length), 0, width), map(spectrum[i], 0, 255, height, 0))
  }
  vertex(width, height);
  endShape();




  // function touchStarted() {
  //   if (getAudioContext().state !== 'running') {
  // getAudioContext().resume();
  // }
}