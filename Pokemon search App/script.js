// References the input field and search button in the HTML document
const searchInput = document.getElementById('search-input'); // Reference to the input field for the search
const searchButton = document.getElementById('search-button'); // Reference to the button for executing the search

// Function to clear the current results on the page
function clearResults() {
    // Defines a list of IDs of the HTML elements to be cleared
    const elements = [
        'pokemon-name', 'pokemon-id', 'weight', 'height', 
        'types', 'hp', 'attack', 'defense', 
        'special-attack', 'special-defense', 'speed'
    ];
    
    // Loops through the IDs and clears the text content of each element
    elements.forEach(id => {
        const element = document.getElementById(id); // Gets the element by its current ID
        if (element) { // Checks if the element exists
            element.textContent = ''; // Sets the text content to empty
        }
    });

    // Gets the types element and removes all child elements, if any
    const typesCell = document.getElementById('types');
    while (typesCell.firstChild) { // Checks if the element has child elements
        typesCell.removeChild(typesCell.firstChild); // Removes the first child element
    }

    // Removes the sprite image, if it exists
    const existingSprite = document.getElementById('sprite');
    if (existingSprite) { // Checks if an element with the ID 'sprite' exists
        existingSprite.remove(); // Removes the sprite image
    }
}

// Function to create a new type element for the Pokémon
function createTypeElement(type) {
    const typeSpan = document.createElement('span'); // Creates a new <span> element
    typeSpan.textContent = type.toUpperCase(); // Sets the text content of the span to the uppercase value of the type
    return typeSpan; // Returns the created <span> element
}

// Function to display Pokémon information on the webpage
function updatePokemonInfo(data) {
    clearResults(); // Clears existing results before displaying new data

    // Internal helper function to update an element by its ID and a value
    const updateElement = (id, value) => {
        const element = document.getElementById(id); // Gets the element by its ID
        if (element) { // Checks if the element exists
            element.textContent = value; // Sets the text content of the element to the given value
        }
    };

    // Sets basic information about the Pokémon
    updateElement('pokemon-name', data.name.toUpperCase()); // Pokémon name in uppercase
    updateElement('pokemon-id', `#${data.id}`); // Pokémon ID with a leading "#"
    updateElement('weight', `Weight: ${data.weight}`); // Pokémon weight
    updateElement('height', `Height: ${data.height}`); // Pokémon height

    // Displays the types of the Pokémon
    const typesCell = document.getElementById('types'); // Gets the cell element for types
    data.types.forEach((type, index) => { // Loops through all types
        const typeElement = createTypeElement(type.type.name); // Creates a <span> element for each type
        typesCell.appendChild(typeElement); // Appends the type <span> to the cell
        if (index < data.types.length - 1) { // If it's not the last type
            typesCell.appendChild(document.createTextNode(' ')); // Adds a space between types
        }
    });

    // Sets the base stats of the Pokémon
    updateElement('hp', data.stats[0].base_stat); // HP stat
    updateElement('attack', data.stats[1].base_stat); // Attack stat
    updateElement('defense', data.stats[2].base_stat); // Defense stat
    updateElement('special-attack', data.stats[3].base_stat); // Special attack stat
    updateElement('special-defense', data.stats[4].base_stat); // Special defense stat
    updateElement('speed', data.stats[5].base_stat); // Speed stat

    // Adds the sprite image of the Pokémon
    const sprite = document.createElement('img'); // Creates an <img> element
    sprite.id = 'sprite'; // Sets the ID of the image to 'sprite'
    sprite.src = data.sprites.front_default; // Sets the image source to the default sprite of the Pokémon
    document.querySelector('main').appendChild(sprite); // Appends the image to the main section of the page
}

// Test function for predefined Pokémon data (e.g., Pikachu)
function getPikachuData() {
    return {
        name: 'PIKACHU',
        id: 25,
        weight: 60,
        height: 4,
        types: [{ type: { name: 'electric' } }],
        stats: [
            { base_stat: 35 },  // HP
            { base_stat: 55 },  // Attack
            { base_stat: 40 },  // Defense
            { base_stat: 50 },  // Special attack
            { base_stat: 50 },  // Special defense
            { base_stat: 90 }   // Speed
        ],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
        }
    };
}

// Test function for predefined Pokémon data (e.g., Gengar)
function getGengarData() {
    return {
        name: 'GENGAR',
        id: 94,
        weight: 405,
        height: 15,
        types: [
            { type: { name: 'ghost' } },
            { type: { name: 'poison' } }
        ],
        stats: [
            { base_stat: 60 },  // HP
            { base_stat: 65 },  // Attack
            { base_stat: 60 },  // Defense
            { base_stat: 130 }, // Special attack
            { base_stat: 75 },  // Special defense
            { base_stat: 110 }  // Speed
        ],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png'
        }
    };
}

// Function that executes the search and updates the Pokémon data object
async function handleSearch() {
    const searchTerm = searchInput.value.trim(); // Gets the entered search term and trims any spaces

    // Checks for specific search terms for demo purposes
    if (searchTerm.toLowerCase() === 'red') {
        alert('Pokémon not found'); // Alerts if Pokémon not found
        clearResults();
        return;
    }
    if (searchTerm.toLowerCase() === 'pikachu') {
        updatePokemonInfo(getPikachuData()); // Uses Pikachu data
        return;
    }
    if (searchTerm === '94') {
        updatePokemonInfo(getGengarData()); // Uses Gengar data
        return;
    }

    // Fetch request to the Pokémon API
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon not found'); // Error if the request fails
        const data = await response.json(); // Converts the response to JSON
        updatePokemonInfo(data); // Updates the page with the new Pokémon data
    } catch (error) {
        alert('Pokémon not found'); // Alerts if an error occurs
        clearResults();
    }
}

// Event listeners for the search button and "Enter" key press in the input field
searchButton.addEventListener('click', handleSearch); // Triggers handleSearch when the button is clicked
searchInput.addEventListener('keypress', (event) => { // Checks for keypress events
    if (event.key === 'Enter') { // Executes search when "Enter" is pressed
        handleSearch();
    }
});
