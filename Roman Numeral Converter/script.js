// Zuweisung von HTML-Elementen zu JavaScript-Variablen
const convertBtn = document.getElementById('convert-btn');
/* Speichert den Button mit der ID 'convert-btn' in der Variablen convertBtn,
   sodass wir diesen später mit JavaScript ansteuern können */

const numberInput = document.getElementById('number');
/* Speichert das Eingabefeld mit der ID 'number' in der Variablen numberInput,
   um den eingegebenen Wert für die Konvertierung abzurufen */

const outputElement = document.getElementById('output');
/* Speichert das Ausgabe-Element mit der ID 'output' in der Variablen outputElement,
   um das Ergebnis oder Fehlermeldungen anzuzeigen */

// Funktion zur Umwandlung einer Zahl in eine römische Zahl
function toRoman(num) {
    // Array mit römischen Zahlen und deren entsprechenden Werten
    const romanNumerals = [
        ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
        ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
        ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
    ];
    /* Jedes Element im Array enthält ein römisches Zahlensymbol und den dazugehörigen Wert.
       Diese Liste ist von großen zu kleinen Werten sortiert, um eine korrekte Umwandlung zu ermöglichen */

    let result = ''; // Speichert das Endergebnis, also die römische Zahl, als String

    for (const [roman, value] of romanNumerals) {
        /* Iteriert über jedes Element im Array. Dabei wird jedes Mal das Symbol und der Wert
           der römischen Zahl ausgelesen */

        while (num >= value) {
            /* Überprüft, ob die Zahl noch größer oder gleich dem aktuellen Wert ist.
               Wenn ja, wird das römische Symbol dem Ergebnis-String hinzugefügt und
               der Wert vom num-Wert subtrahiert */

            result += roman;
            // Fügt das römische Symbol zum Ergebnis hinzu

            num -= value;
            // Reduziert die Zahl um den Wert des römischen Symbols
        }
    }

    return result; // Gibt das vollständige römische Zahlenergebnis zurück
}

// Event-Listener für den Klick auf den Konvertierungsbutton
convertBtn.addEventListener('click', () => {
    const inputValue = numberInput.value.trim();
    /* Holt den Wert aus dem Eingabefeld, entfernt führende und nachfolgende Leerzeichen,
       und speichert ihn in inputValue */

    const number = parseInt(inputValue, 10);
    /* Konvertiert inputValue in eine Ganzzahl im Dezimalsystem und speichert das Ergebnis
       in der Variablen number */

    // Überprüft verschiedene Bedingungen für die Eingabe und zeigt entsprechende Nachrichten an
    if (inputValue === '') {
        outputElement.textContent = "Please enter a valid number";
        /* Wenn kein Wert eingegeben wurde (leerer String), wird eine Fehlermeldung angezeigt */
    } 
    else if (number < 1) {
        outputElement.textContent = "Please enter a number greater than or equal to 1";
        /* Wenn die Zahl kleiner als 1 ist, wird der Benutzer aufgefordert, eine Zahl ≥ 1 einzugeben */
    } 
    else if (number > 3999) {
        outputElement.textContent = "Please enter a number less than or equal to 3999";
        /* Wenn die Zahl größer als 3999 ist, wird der Benutzer aufgefordert, eine Zahl ≤ 3999 einzugeben */
    } 
    else {
        outputElement.textContent = toRoman(number);
        /* Wenn alle Bedingungen erfüllt sind, wird die Zahl in eine römische Zahl umgewandelt
           und das Ergebnis im Ausgabe-Element angezeigt */
    }
});

/*
Zusammenfassung

    Variableninitialisierung:
        convertBtn, numberInput, und outputElement speichern die HTML-Elemente zur späteren Verwendung.

    toRoman-Funktion:
        Diese Funktion übernimmt die Konvertierung von arabischen Zahlen in römische Zahlen.
        Sie iteriert über die romanNumerals-Liste, reduziert die Zahl und fügt die entsprechenden Symbole dem Ergebnis-String hinzu.

    Event-Listener für Button:
        Der click-Event ruft eine anonyme Funktion auf, die die Benutzereingabe überprüft und entweder eine Fehlermeldung oder das Ergebnis der Konvertierung anzeigt.
*/ 