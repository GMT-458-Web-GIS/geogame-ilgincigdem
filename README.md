# Ilgın's GeoGame🌍 - Interactive Geographic Guessing Game
Link required to play the game: https://gmt-458-web-gis.github.io/geogame-ilgincigdem/
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Interface Design](#interface-design)
- [Game Rules](#game-rules)
- [Event Handlers](#event-handlers)
- [Closures](#closures)
- [AI](#ai)
- [DOM](#dom)
- [Contributors](#contributors)


## Overview

GeoGame is an engaging map-based interactive game designed to test your knowledge of global locations. Players are presented with images of famous locations and must accurately identify the location on the map. Correct guesses earn points, while incorrect guesses provide helpful feedback.

This project utilizes *CesiumJS* for 3D map visualization, *JavaScript* for game logic, and *CSS* for styling and responsiveness.

## Features

- **3D Map Visualization**: Utilizes CesiumJS to provide an interactive 3D globe interface for location identification.
- **City Image Hints**: Each game round presents a photo related to the target city to help players guess the correct location on the map.
- **Distance Feedback**: After each guess, players receive feedback showing the distance between the target location and the predicted location in km.
- **Color Feedback**: After each guess, players receive feedback on how close their guess was, using color-coded distance markers.
- **Hint System**: Players can request additional hints about the location. Once a hint is received, no further hints are available.
- **Scoring**: Points are awarded based on the accuracy of the guesses. Players have limited attempts to make correct guesses, and if attempts are exhausted, the target location is revealed automatically.

## Technologies Used

- **HTML**: Provides the structure and layout of the web page.
- **CSS**: Used for styling, layout, and ensuring the game's responsiveness for mobile devices.
- **JavaScript (JS)**: Manages the game logic, interactivity, and map interactions.
- **CesiumJS**: A powerful JavaScript library for 3D geographic applications, used to render the interactive globe. Below are CesiumJS's default controls:

#### Mouse Controls

- **Left Click and Drag**: Rotates the map or moves the view horizontally and vertically.
- **Middle Click (Scroll Wheel) and Drag**: Pans the camera across the map.
- **Right Click and Drag**: Zooms in or out by moving the camera closer or farther.
- **Scroll Wheel**: Quickly zooms in or out.

#### Camera Modes and Customization

- **3D Mode**: All controls are configured to work on a spherical surface.
- **2D Mode**: Displays the map as a flat surface, and controls adapt accordingly.
- **Columbus View (2.5D Mode)**: A hybrid mode between flat and spherical views, allowing for perspective adjustments.

## Interface Design
![game](https://github.com/user-attachments/assets/7c2e1fc6-659f-48e5-85d4-e8235b427a64)

## Game Rules

1. **Start the Game**: Click the "Start Game" button to begin.
2. **Guess the Location**: Click on the 3D map to identify the city. Your goal is to click as close as possible to the correct location.
3. **Distance Feedback**: The distance between the estimated location and the target location is shown in km. Users should base their estimates on the distance feedback.
4. **Color Feedback**: The Hacettepe University Beytepe Campus (geomatics engineering building) is set as the reference. Feedback is displayed as a color-coded line from the reference point to the guessed location:
   - **Green**: Very close to the target (less than 500 km). ![Ekran görüntüsü 2024-12-07 180638](https://github.com/user-attachments/assets/ea4cef6f-7ba3-4794-9aff-ae032c7ed186)


   - **Yellow**: Moderately close to the target (500-3000 km). ![Ekran görüntüsü 2024-12-07 180712](https://github.com/user-attachments/assets/063be832-874f-468f-89db-28b8e0fcd675)


   - **Red**: Far from the target (more than 3000 km). ![Ekran görüntüsü 2024-12-07 180800](https://github.com/user-attachments/assets/8b481ca1-18fa-4eb1-a3bd-862ee6c011a4)



   

5. **Hints**: Click the "Get Hint" button to receive additional help about the location. If you request another hint, a warning appears, and the previous hint will be removed.
6. **Scoring and remaining number of guesses**: Points are awarded based on the accuracy of your guess. You earn points for every correct guess. Players have 6 lives. Each incorrect guess costs a life. 
Once all 6 lives are depleted, the target location will be automatically shown.

## Event Handlers
**Example 1: Start Game Button Click Event**

This event handler is triggered when the user clicks the "Start Game" button. It displays an alert to guide the player and resets the game by initializing the target location, lives, and other game variables. This ensures the game starts fresh every time the button is clicked.

```javascript
document.getElementById('start').addEventListener('click', function () {    
  alert("To start the game, take a hint and click on cities to guess!");    
  resetGame(); // Reset game on start    
});  
```

**Example 2: Hint Button Click Event**

This event handler is triggered when the user clicks the "Get Hint" button. It calls the giveHint function, which displays a visual clue (an image) about the target location. If the user has already used the hint, it displays a message saying no more hints are available. This adds interactivity and helps players make better guesses.

```javascript
document.getElementById('getHint').addEventListener('click', giveHint);
```

**Example 3: Map Click Event**

This event handler is triggered when the user clicks on the globe. It calculates the latitude and longitude of the clicked location, places a marker, and calculates the distance to the target location. Based on the distance, it updates the game state (e.g., lives, score) and provides feedback to the player. This is the core interactivity of the game.

```javascript
viewer.screenSpaceEventHandler.setInputAction(function (click) {  
  const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);  
  if (cartesian) {  
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);  
    const guessLat = Cesium.Math.toDegrees(cartographic.latitude);  
    const guessLng = Cesium.Math.toDegrees(cartographic.longitude);  

    // Add a marker for the guessed location  
    guessMarker = viewer.entities.add({  
      position: Cesium.Cartesian3.fromDegrees(guessLng, guessLat),  
      point: { pixelSize: 10, color: Cesium.Color.BLACK }  
    });  

    // Calculate distance and check if the guess is correct  
    const distanceFromGuessToTarget = calculateDistance(guessLat, guessLng, targetLocation.lat, targetLocation.lng);  
    document.getElementById('distance').innerHTML = `Distance between guess location and target location: ${distanceFromGuessToTarget.toFixed(2)} km`;  

    // Handle game logic (e.g., lives, score, reset)  
    if (distanceFromGuessToTarget < 100) {  
      alert(`Congratulations! You found ${targetLocation.name}.`);  
      score++;  
      document.getElementById('score').innerHTML = `Score: ${score}`;  
      resetGame();  
    } else {  
      lives--;  
      updateLives();  
      if (lives <= 0) {  
        alert(`Game Over! The correct location was ${targetLocation.name}.`);  
        flyToTarget();  
        setTimeout(resetGame, 3000);  
      }  
    }  
  }  
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

## Closures

**1.Hint Counter**

How It Uses Closures:

The giveHint function uses the hintCounter variable, which is defined in its outer scope. Even though hintCounter is not re-declared inside the function, it retains its value between function calls. This allows the game to track how many hints the player has used and limit them to one hint per round.

```javascript
let hintCounter = 0;  

function giveHint() {  
  if (hintCounter === 0) {  
    document.getElementById('hint').innerHTML = `<img src="${targetLocation.hint}" alt="Hint Image" style="width: 200px; height: auto;">`;  
    hintCounter++;  
  } else {  
    document.getElementById('hint').innerHTML = 'No more hints available!';  
  }  
}  
```


**2.Lives Management**

How It Uses Closures:

The initializeLives and updateLives functions both rely on the lives variable, which is defined in their outer scope. These functions can access and modify the lives variable, allowing the game to dynamically update the number of lives displayed on the screen. This is an example of closures being used to manage game state.

```javascript
let lives = 6;  

function initializeLives() {  
  const livesContainer = document.getElementById('lives');  
  livesContainer.innerHTML = '';  
  for (let i = 0; i < lives; i++) {  
    const heart = document.createElement('img');  
    heart.src = 'images/heart.png';  
    heart.alt = 'Heart';  
    heart.className = 'life';  
    livesContainer.appendChild(heart);  
  }  
}  

function updateLives() {  
  const livesContainer = document.getElementById('lives');  
  const hearts = livesContainer.getElementsByClassName('life');  
  if (hearts.length > 0) {  
    livesContainer.removeChild(hearts[hearts.length - 1]);  
  }  
}
```
  
## AI
https://chatgpt.com/share/67549317-f70c-800f-97dd-f9e73f0b54e0

## DOM

**How I Interacted with the DOM:**

1. **Updating HTML Elements Dynamically:**
I used document.getElementById to select and update elements like the distance, score, and hints dynamically based on user interactions. For example:

```javascript
document.getElementById('distance').innerHTML = Distance: ${distanceFromGuessToTarget.toFixed(2)} km`;
```  

2. **Displaying the Instructional Panel:**
At the start of the game, I displayed an instructional panel to guide the player. When the player clicked the "Close" button, I hid the panel and displayed the game info panel. For example:

```javascript
document.getElementById('instructionPanel').style.display = 'flex';
```

```javascript
document.getElementById('closeInstruction').addEventListener('click', function () {         document.getElementById('instructionPanel').style.display = 'none';         document.getElementById('info').style.display = 'block';     });
```  

 3. **Flying to the Target Location:**
When the player lost the game or guessed correctly, I used the flyTo method to move the camera to the target location. For example:

```javascript
viewer.camera.flyTo({         destination: Cesium.Cartesian3.fromDegrees(targetLocation.lng, targetLocation.lat, 150000),         orientation: {             heading: Cesium.Math.toRadians(0),             pitch: Cesium.Math.toRadians(-90),             roll: 0.0         },         duration: 2,     });
```


## Contributors

*Ilgın Çiğdem*  
Geomatics Engineering - Hacettepe University  
[LinkedIn](https://www.linkedin.com/in/ilgincigdem) | [GitHub](https://github.com/ilgincigdem)


