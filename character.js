// Character options
const characters = [
  { name: 'robot', icon: 'images/robot.png', lifeIcon: 'images/robot_life.png' },
  { name: 'cat', icon: 'images/cat.png', lifeIcon: 'images/cat_life.png' },
  { name: 'wizard', icon: 'images/wizard.png', lifeIcon: 'images/wizard_life.png' }
];

// Selected character (default to null until selected)
let selectedCharacter = null;

// Function to display character selection UI
function displayCharacterSelection() {
  const characterContainer = document.createElement('div');
  characterContainer.id = 'characterSelection';
  characterContainer.style.position = 'absolute';
  characterContainer.style.top = '50%';
  characterContainer.style.left = '50%';
  characterContainer.style.transform = 'translate(-50%, -50%)';
  characterContainer.style.backgroundColor = 'rgba(40, 40, 40, 0.95)';
  characterContainer.style.padding = '20px';
  characterContainer.style.borderRadius = '15px';
  characterContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
  characterContainer.style.zIndex = '2000';
  characterContainer.style.textAlign = 'center';

  const title = document.createElement('h2');
  title.innerText = 'Choose Your Character';
  title.style.color = '#f0f0f0';
  characterContainer.appendChild(title);

  const characterList = document.createElement('div');
  characterList.style.display = 'flex';
  characterList.style.justifyContent = 'center';
  characterList.style.gap = '15px';
  characterList.style.marginTop = '20px';

  characters.forEach((character) => {
      const characterOption = document.createElement('div');
      characterOption.style.cursor = 'pointer';
      characterOption.style.textAlign = 'center';

      const characterImage = document.createElement('img');
      characterImage.src = character.icon;
      characterImage.alt = character.name;
      characterImage.style.width = '80px';
      characterImage.style.height = '80px';
      characterImage.style.borderRadius = '50%';
      characterImage.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.6)';
      characterImage.style.transition = 'transform 0.3s ease';

      characterImage.addEventListener('mouseover', () => {
          characterImage.style.transform = 'scale(1.1)';
      });

      characterImage.addEventListener('mouseout', () => {
          characterImage.style.transform = 'scale(1)';
      });

      characterImage.addEventListener('click', () => {
        selectedCharacter = character; // Assign the selected character
        console.log(`Selected character: ${selectedCharacter.name}, Icon: ${selectedCharacter.icon}, Life Icon: ${selectedCharacter.lifeIcon}`);
        alert(`You selected: ${character.name}`);
        document.body.removeChild(characterContainer); // Remove the character selection screen
        initializeLives(); // Update lives with the selected character's life icon
    });

      const characterName = document.createElement('p');
      characterName.innerText = character.name;
      characterName.style.color = '#f0f0f0';
      characterName.style.marginTop = '10px';

      characterOption.appendChild(characterImage);
      characterOption.appendChild(characterName);
      characterList.appendChild(characterOption);
  });

  characterContainer.appendChild(characterList);
  document.body.appendChild(characterContainer);
}

// Function to initialize lives display with the selected character's life icon
function initializeLives() {
  if (!selectedCharacter) {
      alert('Please select a character first!');
      return;
  }

  const livesContainer = document.getElementById('lives');
  livesContainer.innerHTML = ''; // Clear previous hearts if any
  for (let i = 0; i < lives; i++) {
      const lifeIcon = document.createElement('img');
      lifeIcon.src = selectedCharacter.lifeIcon; // Use the selected character's life icon
      lifeIcon.alt = `${selectedCharacter.name} Life`; // Alt text for accessibility
      lifeIcon.className = 'life';
      lifeIcon.style.width = '35px'; // Ensure consistent size
      lifeIcon.style.height = '35px';
      livesContainer.appendChild(lifeIcon);
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

// Event listener for the "Start Game" button
document.getElementById('start').addEventListener('click', function () {
  if (!selectedCharacter) {
      displayCharacterSelection(); // Show character selection if not already selected
  } else {
      alert('Game is already started!');
  }
});