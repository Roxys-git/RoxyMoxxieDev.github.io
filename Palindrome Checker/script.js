// Fügt dem Button mit der ID "check-btn" einen Klick-Eventlistener hinzu
document.getElementById("check-btn").addEventListener("click", function() {
    // Holt das Eingabefeld-Element mit der ID "text-input"
    const inputElement = document.getElementById("text-input");
    // Holt das Ergebnisfeld-Element mit der ID "result"
    const resultElement = document.getElementById("result");
    // Liest den Wert aus dem Eingabefeld, entfernt Leerzeichen am Anfang und Ende
    const inputValue = inputElement.value.trim();

    // Überprüft, ob das Eingabefeld leer ist
    if (inputValue === "") {
        // Zeigt eine Warnung, wenn kein Wert eingegeben wurde
        alert("Please input a value");
        // Setzt den Inhalt des Ergebnisfeldes auf leer
        resultElement.textContent = "";
        return; // Beendet die Funktion, falls kein Wert eingegeben wurde
    }

    // Funktion zur Überprüfung, ob ein String ein Palindrom ist
    function isPalindrome(str) {
        // Entfernt alle Nicht-Buchstaben und Nicht-Zahlen und konvertiert den String in Kleinbuchstaben
        const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        // Überprüft, ob der bereinigte String gleich seinem umgekehrten Wert ist
        return cleanedStr === cleanedStr.split("").reverse().join("");
    }

    // Überprüft, ob der eingegebene Wert ein Palindrom ist
    if (isPalindrome(inputValue)) {
        // Setzt das Ergebnisfeld auf "Eingabe ist ein Palindrom", falls es eins ist
        resultElement.textContent = `${inputValue} is a palindrome`;
    } else {
        // Setzt das Ergebnisfeld auf "Eingabe ist kein Palindrom", falls es keins ist
        resultElement.textContent = `${inputValue} is not a palindrome`;
    }
});

/*
Erläuterungen zu den Funktionen und Bedingungen:

    document.getElementById("check-btn").addEventListener("click", function() {...}):
        Diese Zeile fügt dem Button mit der ID check-btn einen Eventlistener hinzu, der beim Klicken den gesamten Funktionsblock im Inneren ausführt.

    const inputElement = document.getElementById("text-input");:
        Sucht das Eingabefeld-Element mit der ID text-input und speichert es in inputElement.

    const resultElement = document.getElementById("result");:
        Sucht das Element zur Ergebnisanzeige mit der ID result und speichert es in resultElement.

    const inputValue = inputElement.value.trim();:
        Liest den Inhalt des Eingabefelds aus und entfernt mit trim() Leerzeichen am Anfang und Ende. Dieser Wert wird in inputValue gespeichert.

    if (inputValue === "") { ... }:
        Überprüft, ob inputValue leer ist. Wenn ja, wird ein Alert angezeigt und das Ergebnisfeld geleert. Die return-Anweisung beendet die Funktion vorzeitig.

    function isPalindrome(str) { ... }:
        Definiert eine Funktion namens isPalindrome, die überprüft, ob ein String ein Palindrom ist.
        Innerhalb dieser Funktion:
            const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();:
                Bereinigt den String str, indem alle Nicht-Buchstaben und Nicht-Zahlen entfernt werden und alles in Kleinbuchstaben umgewandelt wird. So wird sichergestellt, dass nur alphanumerische Zeichen verglichen werden.
            return cleanedStr === cleanedStr.split("").reverse().join("");:
                Überprüft, ob der bereinigte String gleich seinem umgekehrten Wert ist. Wenn ja, ist es ein Palindrom und die Funktion gibt true zurück.

    if (isPalindrome(inputValue)) { ... } else { ... }:
        Überprüft, ob der Wert in inputValue ein Palindrom ist, indem isPalindrome(inputValue) aufgerufen wird.
        Wenn der Wert ein Palindrom ist, wird der Text im Ergebnisfeld entsprechend gesetzt. Andernfalls wird angezeigt, dass der Wert kein Palindrom ist.
*/