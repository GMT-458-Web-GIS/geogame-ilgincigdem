# GeoGame🌍 - Interactive Geographic Guessing Game

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Interface](#interface)
- [Game Rules](#game-rules)
- [DOM](#DOM)
- [Contributors](#contributors)


## Overview

GeoGame is an engaging map-based interactive game designed to test your knowledge of global locations. Players are presented with images of famous locations and must accurately identify the location on the map. Correct guesses earn points, while incorrect guesses provide helpful feedback.

This project utilizes *CesiumJS* for 3D map visualization, *JavaScript* for game logic, and *CSS* for styling and responsiveness.

## Features

- **3D Map Visualization**: Utilizes CesiumJS to provide an interactive 3D globe interface for location identification.
- **City Image Hints**: Each game round presents a photo related to the target city to help players guess the correct location on the map.
- **Distance Feedback**: After each guess, players receive feedback on how close their guess was, using color-coded distance markers.
- **Hint System**: Players can request additional hints about the location. Once a hint is received, no further hints are available.
- **Scoring**: Points are awarded based on the accuracy of the guesses. Players have limited attempts to make correct guesses, and if attempts are exhausted, the target location is revealed automatically.
- **Responsive Design**: The game is mobile-friendly and designed to work across different devices and screen sizes.

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

## Interface
![game](https://github.com/user-attachments/assets/7c2e1fc6-659f-48e5-85d4-e8235b427a64)

## Game Rules

1. **Start the Game**: Click the "Start Game" button to begin.
2. **Guess the Location**: Click on the 3D map to identify the city. Your goal is to click as close as possible to the correct location.
3. **Distance Feedback**: The Hacettepe University Beytepe Campus is set as the reference. Feedback is displayed as a color-coded line from the reference point to the guessed location:
   - **Green**: Very close ![Ekran görüntüsü 2024-11-17 191849](https://github.com/user-attachments/assets/aebae1ac-a30f-4f47-ba7c-d76cedbda084)

   - **Yellow**: Medium distance ![Ekran görüntüsü 2024-11-17 191745](https://github.com/user-attachments/assets/edd8f344-66b3-49e8-9ff0-388a19b80f18)

   - **Red**: Far away ![Ekran görüntüsü 2024-11-17 191834](https://github.com/user-attachments/assets/100c4a03-7e3c-4c58-9dc4-4ddade68ec28)


   The numerical distance between the guessed and target locations is also displayed, helping players improve their guesses.

4. **Hints**: Click the "Get Hint" button to receive additional help about the location. If you request another hint, a warning appears, and the previous hint will be removed.
5. **Scoring**: Points are awarded based on the accuracy of your guess. The closer your guess, the more points you earn.


## DOM

**How I Interacted with the DOM:**

1. **Updating HTML Elements Dynamically:**
I used document.getElementById to select and update elements like the distance, score, and hints dynamically based on user interactions. For example:

`document.getElementById('distance').innerHTML = Distance: ${distanceFromGuessToTarget.toFixed(2)} km`;  

2. **Displaying the Instructional Panel:**
At the start of the game, I displayed an instructional panel to guide the player. When the player clicked the "Close" button, I hid the panel and displayed the game info panel. For example:

`document.getElementById('instructionPanel').style.display = 'flex';`

`document.getElementById('closeInstruction').addEventListener('click', function () {         document.getElementById('instructionPanel').style.display = 'none';         document.getElementById('info').style.display = 'block';     });`  

 3. **Flying to the Target Location:**
When the player lost the game or guessed correctly, I used the flyTo method to move the camera to the target location. For example:

`viewer.camera.flyTo({         destination: Cesium.Cartesian3.fromDegrees(targetLocation.lng, targetLocation.lat, 150000),         orientation: {             heading: Cesium.Math.toRadians(0),             pitch: Cesium.Math.toRadians(-90),             roll: 0.0         },         duration: 2,     });`

## Contributors

*Ilgın Çiğdem*  
Geomatics Engineering - Hacettepe University  
[LinkedIn](https://www.linkedin.com/in/ilgincigdem) | [GitHub](https://github.com/ilgincigdem)


