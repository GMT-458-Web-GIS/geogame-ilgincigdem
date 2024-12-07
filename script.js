// Array of locations with latitude, longitude, name, and image hints
const locations = [
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522, hint: 'images/paris.jpg' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.0060, hint: 'images/new_york.jpg' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, hint: 'images/tokyo.jpg' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, hint: 'images/sydney.jpg' },
  { name: 'Rio de Janeiro, Brazil', lat: -22.9068, lng: -43.1729, hint: 'images/rio.jpg' },
  { name: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241, hint: 'images/cape_town.jpg' },
  { name: 'Moscow, Russia', lat: 55.7558, lng: 37.6173, hint: 'images/moscow.jpg' },
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, hint: 'images/cairo.jpg' },
  { name: 'Berlin, Germany', lat: 52.5200, lng: 13.4050, hint: 'images/berlin.jpg' },
  { name: 'Beijing, China', lat: 39.9042, lng: 116.4074, hint: 'images/beijing.jpg' },
  { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964, hint: 'images/rome.jpg' },
  { name: 'Buenos Aires, Argentina', lat: -34.6037, lng: -58.3816, hint: 'images/buenos_aires.jpg' },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278, hint: 'images/london.jpg' },
  { name: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332, hint: 'images/mexico_city.jpg' },
  { name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018, hint: 'images/bangkok.jpg' },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, hint: 'images/dubai.jpg' },
  { name: 'Delhi, India', lat: 28.7041, lng: 77.1025, hint: 'images/delhi.jpg' },
  { name: 'Toronto, Canada', lat: 43.651070, lng: -79.347015, hint: 'images/toronto.jpg' },
  { name: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784, hint: 'images/istanbul.jpg' },
  { name: 'Havana, Cuba', lat: 23.1136, lng: -82.3666, hint: 'images/havana.jpg' },
  { name: 'Athens, Greece', lat: 37.9838, lng: 23.7275, hint: 'images/athens.jpg' },
  { name: 'Reykjavik, Iceland', lat: 64.1466, lng: -21.9426, hint: 'images/reykjavik.jpg' },
  { name: 'Lisbon, Portugal', lat: 38.7223, lng: -9.1393, hint: 'images/lisbon.jpg' },
  { name: 'Seoul, South Korea', lat: 37.5665, lng: 126.9780, hint: 'images/seoul.jpg' },
  { name: 'Stockholm, Sweden', lat: 59.3293, lng: 18.0686, hint: 'images/stockholm.jpg' },
  { name: 'Helsinki, Finland', lat: 60.1695, lng: 24.9354, hint: 'images/helsinki.jpg' },
  { name: 'Valletta, Malta', lat: 35.8997, lng: 14.5146, hint: 'images/valletta.jpg' },
  { name: 'Prague, Czech Republic', lat: 50.0755, lng: 14.4378, hint: 'images/prague.jpg' },
  { name: 'Edinburgh, Scotland', lat: 55.9533, lng: -3.1883, hint: 'images/edinburgh.jpg' },
  { name: 'Kuala Lumpur, Malaysia', lat: 3.1390, lng: 101.6869, hint: 'images/kuala_lumpur.jpg' },
  { name: 'Singapore, Singapore', lat: 1.3521, lng: 103.8198, hint: 'images/singapore.jpg' },
  { name: 'Madrid, Spain', lat: 40.4168, lng: -3.7038, hint: 'images/madrid.jpg' }
];

// Coordinates
const washingtonDC = { lat: 39.86555529020917, lng: 32.733977264789985 }; // Hacettepe geomatik binası referans alındı

// Game variables
let targetLocation;
let guessMarker;
let line;
let hintCounter = 0;
let guessCounter = 0;
let lives = 6; // Initialize lives
let score = 0; // Initialize score
let gameStarted = false; // Track if the game has started

// Cesium setup
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMDgwOGMwOC0xNTRhLTQ0OGUtYWU3Mi1mZTA2ZGIzOTU3MzUiLCJpZCI6MjUwNTAyLCJpYXQiOjE3Mjk3NzI5ODF9.PMc5pPB1eYsLvDj8_S7ExDNt6q35GlykWXPWDLiE9ZY';

const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: Cesium.createWorldImagery({ style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS }),
  terrainProvider: Cesium.createWorldTerrain(),
  baseLayerPicker: false,
  timeline: false,
  animation: false
});

// Function to get a random location
function getRandomLocation() {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}

// Function to calculate the distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
  const startCartographic = Cesium.Cartographic.fromDegrees(lng1, lat1);
  const endCartographic = Cesium.Cartographic.fromDegrees(lng2, lat2);
  const geodesic = new Cesium.EllipsoidGeodesic(startCartographic, endCartographic);
  return geodesic.surfaceDistance / 1000; // in km
}

// Function to get proximity color based on distance
function getProximityColor(distance) {
  if (distance < 500) return Cesium.Color.GREEN;
  else if (distance < 3000) return Cesium.Color.YELLOW;
  else return Cesium.Color.RED;
}

// Function to reset the game
function resetGame() {
      if (guessMarker) viewer.entities.remove(guessMarker);
      if (line) viewer.entities.remove(line);
      targetLocation = getRandomLocation();
      document.getElementById('distance').innerHTML = 'Distance: ';
      document.getElementById('hint').innerHTML = 'Hint: ';
      hintCounter = 0;
      guessCounter = 0; // Reset guess counter
      lives = 6; // Reset lives
      initializeLives(); // Initialize lives display
      console.log(`Target Location: ${targetLocation.name}`); // For testing
  }

// Function to give a hint
function giveHint() {
  if (hintCounter === 0) {
      document.getElementById('hint').innerHTML = `<img src="${targetLocation.hint}" alt="Hint Image" style="width: 200px; height: auto;">`;
      hintCounter++;
  } else {
      document.getElementById('hint').innerHTML = 'No more hints available!';
  }
}

// Function to fly to the target location (updated to prevent incorrect markers)
function flyToTarget() {
  // Remove previous markers and lines to prevent visual interference
  if (guessMarker) viewer.entities.remove(guessMarker);
  if (line) viewer.entities.remove(line);

  viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(targetLocation.lng, targetLocation.lat, 150000),
      orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0
      },
      duration: 2,
  });
}

// Handle player guesses
viewer.screenSpaceEventHandler.setInputAction(function(click) {
  const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
  if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const guessLat = Cesium.Math.toDegrees(cartographic.latitude);
      const guessLng = Cesium.Math.toDegrees(cartographic.longitude);

      // Remove previous markers and lines
      if (guessMarker) viewer.entities.remove(guessMarker);
      if (line) viewer.entities.remove(line);

// Kullanıcının tahmin ettiği yer için işaretçi ekle
// Add a marker for the guessed location
        guessMarker = viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(guessLng, guessLat),
              point: { pixelSize: 10, color: Cesium.Color.BLACK }
          });


      // Calculate the distance from the guess to the target
      const distanceFromGuessToTarget = calculateDistance(guessLat, guessLng, targetLocation.lat, targetLocation.lng);
      document.getElementById('distance').innerHTML = `Distance between guess location and target location: ${distanceFromGuessToTarget.toFixed(2)} km`;

      // Draw a line between the guess and the target
      line = viewer.entities.add({
          polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray([washingtonDC.lng, washingtonDC.lat, guessLng, guessLat]),
              width: 3,
              material: getProximityColor(distanceFromGuessToTarget)
          }
      });

      // Check if the guess is correct
      if (distanceFromGuessToTarget < 100) {
          alert(`Congratulations! You found ${targetLocation.name}.`);
          score++; // Increment score
          document.getElementById('score').innerHTML = `Score: ${score}`; // Update score display
          resetGame(); // Reset the game after a correct guess
      } else {
          lives--; // Decrease lives
          updateLives(); // Update lives display
          if (lives <= 0) {
              alert(`Game Over! You've run out of lives. The correct location was ${targetLocation.name}.`);
              flyToTarget(); // Fly to the target location
              setTimeout(resetGame, 3000); // Reset after 3 seconds
          }
      }
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// Event listener for the start button
document.getElementById('start').addEventListener('click', function() {
  alert("To start the game, take a hint and click on cities to guess!");
  resetGame(); // Reset game on start
});

// Event listener for the hint button
document.getElementById('getHint').addEventListener('click', giveHint);

// Function to initialize lives display
function initializeLives() {
  const livesContainer = document.getElementById('lives');
  livesContainer.innerHTML = ''; // Clear previous hearts if any
  for (let i = 0; i < lives; i++) {
      const heart = document.createElement('img');
      heart.src = 'images/heart.png'; // Provide a valid path for the heart image
      heart.alt = 'Heart';
      heart.className = 'life';
      livesContainer.appendChild(heart);
  }
}

// Function to update lives display
function updateLives() {
  const livesContainer = document.getElementById('lives');
  const hearts = livesContainer.getElementsByClassName('life');
  if (hearts.length > 0) {
      livesContainer.removeChild(hearts[hearts.length - 1]); // Remove the last heart
  }
}

// Show the instructional panel at the start  
document.getElementById('instructionPanel').style.display = 'flex';  

// Event listener for closing the instructional panel  
document.getElementById('closeInstruction').addEventListener('click', function () {  
    document.getElementById('instructionPanel').style.display = 'none'; // Hide the instructional panel  
    document.getElementById('info').style.display = 'block'; // Show the info panel  
});  

// Ensure the info panel is hidden initially  
document.getElementById('info').style.display = 'none';  


// Start the game by resetting it
function resetGame() {
  if (guessMarker) viewer.entities.remove(guessMarker);
  if (line) viewer.entities.remove(line);
  targetLocation = getRandomLocation();
  document.getElementById('distance').innerHTML = 'Distance: ';
  document.getElementById('hint').innerHTML = 'Hint: ';
  hintCounter = 0;
  guessCounter = 0; // Reset guess counter
  lives = 6; // Reset lives
  if (selectedCharacter) {
      initializeLives(); // Initialize lives display with the selected character's life icon
  }
  console.log(`Target Location: ${targetLocation.name}`); // For testing
}