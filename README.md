# Ilgın's GeoGame🌍 - Interactive Geographic Guessing Game
Link required to play the game: https://gmt-458-web-gis.github.io/geogame-ilgincigdem/
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Interface Design](#interface-design)
- [Game Rules](#game-rules)
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


