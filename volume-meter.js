// Get the canvas and set up the context
const canvas = document.getElementById("volume-meter");
const ctx = canvas.getContext("2d");

// AudioContext and AnalyserNode
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();

// Connect the audio source
const audioElement = new Audio("/yodel.mp3");
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Set up the AnalyserNode for volume metering
analyser.fftSize = 32;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Draw the volume meter
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get the volume data
  analyser.getByteFrequencyData(dataArray);
  const volume = Math.max(...dataArray) / 255;

  // Draw the colored sections
  const greenHeight = canvas.height * 0.5;
  const yellowHeight = canvas.height * 0.25;
  const redHeight = canvas.height * 0.25;

  ctx.fillStyle = "green";
  ctx.fillRect(0, canvas.height - greenHeight, canvas.width, greenHeight);

  ctx.fillStyle = "yellow";
  ctx.fillRect(0, canvas.height - greenHeight - yellowHeight, canvas.width, yellowHeight);

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, redHeight);

  // Draw the volume level
  ctx.fillStyle = "black";
  ctx.fillRect(0, canvas.height - canvas.height * volume, canvas.width, canvas.height * volume);

  requestAnimationFrame(draw);
}

draw();

// Start playing the audio
document.querySelector("#yodel").onclick = () => audioElement.play();