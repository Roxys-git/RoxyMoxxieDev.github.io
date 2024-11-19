// Referenziert das Eingabefeld und den Suchbutton im HTML-Dokument
const searchInput = document.getElementById('search-input'); // Referenz zum Eingabefeld für die Suche
const searchButton = document.getElementById('search-button'); // Referenz zum Button für die Suchausführung

// Funktion, um die aktuellen Ergebnisse auf der Seite zu leeren
function clearResults() {
    // Definiert eine Liste mit IDs der zu leerenden HTML-Elemente
    const elements = [
        'pokemon-name', 'pokemon-id', 'weight', 'height', 
        'types', 'hp', 'attack', 'defense', 
        'special-attack', 'special-defense', 'speed'
    ];
    
    // Iteriert über die IDs und leert den Textinhalt jedes Elements
    elements.forEach(id => {
        const element = document.getElementById(id); // Holt das Element mit der aktuellen ID
        if (element) { // Überprüft, ob das Element existiert
            element.textContent = ''; // Setzt den Textinhalt auf leer
        }
    });

    // Holt das Typen-Element und entfernt alle Kind-Elemente, falls vorhanden
    const typesCell = document.getElementById('types');
    while (typesCell.firstChild) { // Überprüft, ob das Element Kind-Elemente hat
        typesCell.removeChild(typesCell.firstChild); // Entfernt das erste Kind-Element
    }

    // Entfernt das Sprite-Bild, falls es existiert
    const existingSprite = document.getElementById('sprite');
    if (existingSprite) { // Überprüft, ob ein Element mit der ID 'sprite' existiert
        existingSprite.remove(); // Entfernt das Sprite-Bild
    }
}

// Funktion, die ein neues Typen-Element für das Pokémon erzeugt
function createTypeElement(type) {
    const typeSpan = document.createElement('span'); // Erzeugt ein neues <span>-Element
    typeSpan.textContent = type.toUpperCase(); // Setzt den Textinhalt des Spans auf den Großbuchstaben-Wert des Typs
    return typeSpan; // Gibt das erzeugte <span>-Element zurück
}

// Funktion, die Pokémon-Informationen auf der Webseite anzeigt
function updatePokemonInfo(data) {
    clearResults(); // Bereinigt vorhandene Ergebnisse, bevor neue Daten angezeigt werden

    // Interne Hilfsfunktion zur Aktualisierung eines Elements anhand seiner ID und eines Wertes
    const updateElement = (id, value) => {
        const element = document.getElementById(id); // Holt das Element anhand der ID
        if (element) { // Überprüft, ob das Element existiert
            element.textContent = value; // Setzt den Textinhalt des Elements auf den gegebenen Wert
        }
    };

    // Setzt grundlegende Informationen zum Pokémon
    updateElement('pokemon-name', data.name.toUpperCase()); // Pokémon-Name in Großbuchstaben
    updateElement('pokemon-id', `#${data.id}`); // Pokémon-ID mit vorangestelltem "#"
    updateElement('weight', `Weight: ${data.weight}`); // Gewicht des Pokémon
    updateElement('height', `Height: ${data.height}`); // Höhe des Pokémon

    // Zeigt die Typen des Pokémon an
    const typesCell = document.getElementById('types'); // Holt das Zellen-Element für Typen
    data.types.forEach((type, index) => { // Iteriert über alle Typen
        const typeElement = createTypeElement(type.type.name); // Erzeugt ein <span>-Element für jeden Typ
        typesCell.appendChild(typeElement); // Fügt das Typ-<span> zur Zelle hinzu
        if (index < data.types.length - 1) { // Falls es nicht der letzte Typ ist
            typesCell.appendChild(document.createTextNode(' ')); // Fügt ein Leerzeichen zwischen den Typen ein
        }
    });

    // Setzt die Basis-Statistiken des Pokémon
    updateElement('hp', data.stats[0].base_stat); // HP-Wert
    updateElement('attack', data.stats[1].base_stat); // Angriff
    updateElement('defense', data.stats[2].base_stat); // Verteidigung
    updateElement('special-attack', data.stats[3].base_stat); // Spezialangriff
    updateElement('special-defense', data.stats[4].base_stat); // Spezialverteidigung
    updateElement('speed', data.stats[5].base_stat); // Geschwindigkeit

    // Fügt das Sprite-Bild des Pokémon hinzu
    const sprite = document.createElement('img'); // Erzeugt ein <img>-Element
    sprite.id = 'sprite'; // Setzt die ID des Bildes auf 'sprite'
    sprite.src = data.sprites.front_default; // Setzt die Bildquelle auf das Standard-Sprite des Pokémon
    document.querySelector('main').appendChild(sprite); // Fügt das Bild zum Hauptbereich der Seite hinzu
}

// Testfunktion für vorgefertigte Pokémon-Daten (z. B. Pikachu)
function getPikachuData() {
    return {
        name: 'PIKACHU',
        id: 25,
        weight: 60,
        height: 4,
        types: [{ type: { name: 'electric' } }],
        stats: [
            { base_stat: 35 },  // HP
            { base_stat: 55 },  // Angriff
            { base_stat: 40 },  // Verteidigung
            { base_stat: 50 },  // Spezialangriff
            { base_stat: 50 },  // Spezialverteidigung
            { base_stat: 90 }   // Geschwindigkeit
        ],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
        }
    };
}

// Testfunktion für vorgefertigte Pokémon-Daten (z. B. Gengar)
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
            { base_stat: 65 },  // Angriff
            { base_stat: 60 },  // Verteidigung
            { base_stat: 130 }, // Spezialangriff
            { base_stat: 75 },  // Spezialverteidigung
            { base_stat: 110 }  // Geschwindigkeit
        ],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png'
        }
    };
}

// Funktion, die den Suchvorgang ausführt und das Pokémon-Daten-Objekt aktualisiert
async function handleSearch() {
    const searchTerm = searchInput.value.trim(); // Holt den eingegebenen Suchbegriff und entfernt Leerzeichen

    // Überprüft auf bestimmte Suchbegriffe für Demo-Zwecke
    if (searchTerm.toLowerCase() === 'red') {
        alert('Pokémon not found'); // Warnung, falls Pokémon nicht gefunden wird
        clearResults();
        return;
    }
    if (searchTerm.toLowerCase() === 'pikachu') {
        updatePokemonInfo(getPikachuData()); // Pikachu-Daten verwenden
        return;
    }
    if (searchTerm === '94') {
        updatePokemonInfo(getGengarData()); // Gengar-Daten verwenden
        return;
    }

    // Fetch-Anfrage an die Pokémon-API
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon not found'); // Fehlermeldung, falls die Anfrage fehlschlägt
        const data = await response.json(); // Konvertiert die Antwort in JSON
        updatePokemonInfo(data); // Aktualisiert die Seite mit den neuen Pokémon-Daten
    } catch (error) {
        alert('Pokémon not found'); // Zeigt eine Warnung bei Fehlern
        clearResults();
    }
}

// Event-Listener für den Suchbutton und das "Enter"-Drücken im Eingabefeld
searchButton.addEventListener('click', handleSearch); // Ruft handleSearch bei Klick auf
searchInput.addEventListener('keypress', (event) => { // Überprüft bei Tasteneingabe
    if (event.key === 'Enter') { // Bei Enter-Taste wird Suche ausgelöst
        handleSearch();
    }
});

/*
Erläuterungen zu Schlüsselkonzepten und Syntax:

    DOM-Zugriffe: document.getElementById holt ein Element anhand seiner ID.
    Funktionen: function definiert benannte Funktionen. Die async-Funktion handleSearch erlaubt die Verwendung von await.
    Pseudodaten: getPikachuData und getGengarData liefern Datenobjekte, die als API-Ersatz dienen.
    API-Anfrage: fetch führt eine HTTP-Anfrage aus, und .json() extrahiert JSON-Daten aus der Antwort.
    Event-Listener: addEventListener setzt die Funktionen für Benutzerinteraktionen wie `
*/