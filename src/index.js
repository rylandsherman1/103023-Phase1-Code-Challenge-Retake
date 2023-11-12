const characterAPI = 'http://localhost:3000/characters';

const characterBar = el('character-bar');
const characterName = el('name');
const characterImage = el('image');
const voteCount = el('vote-count');
const detailedInfo = el('detailed-info');
const votesForm = el('votes-form');

let currentCharacter;

fetch(characterAPI)
    .then(res => res.json())
    .then(renderCharacters);

votesForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (currentCharacter) {
        const votesInput = el('votes');
        const votes = parseInt(votesInput.value, 10) || 0;
        currentCharacter.votes += votes;
        voteCount.textContent = currentCharacter.votes;
        votesInput.value = '';
    }
});

function renderCharacters(characters) {
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        const characterNameSpan = document.createElement('span');

        characterNameSpan.textContent = character.name; 

        characterElement.appendChild(characterNameSpan); 
        characterElement.classList.add('character');
        characterElement.addEventListener('click', () => displayCharacterDetails(character));
        characterBar.appendChild(characterElement);
    });
};

function displayCharacterDetails(character) {
    currentCharacter = character;
    characterName.textContent = character.name;
    characterImage.src = character.image;
    voteCount.textContent = character.votes;
};

function el(id) {
    return document.getElementById(id);
};
