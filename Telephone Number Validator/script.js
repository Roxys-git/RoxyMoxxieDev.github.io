// Funktion zur Überprüfung, ob eine US-Telefonnummer gültig ist
function isValidUSPhoneNumber(number) {
  // Regulärer Ausdruck (Regex), um die US-Telefonnummernformate zu validieren
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  // test() prüft, ob die Telefonnummer mit dem regulären Ausdruck übereinstimmt
  return regex.test(number); // Gibt true zurück, wenn die Nummer gültig ist, andernfalls false
}

// Funktion zur Überprüfung und Anzeige der Ergebnisse
function checkPhoneNumber() {
  // Zugriff auf das Eingabefeld und das Ergebnis-Div im DOM
  const inputField = document.getElementById("user-input");
  const resultsDiv = document.getElementById("results-div");
  // Die Telefonnummer wird aus dem Eingabefeld entnommen und von überflüssigen Leerzeichen befreit
  const phoneNumber = inputField.value.trim();

  // Prüfung, ob das Eingabefeld leer ist
  if (!phoneNumber) {
      // Zeigt eine Warnung an, wenn das Eingabefeld leer ist
      alert("Please provide a phone number");
      return; // Beendet die Funktion, wenn keine Telefonnummer eingegeben wurde
  }

  // Überprüfung der Nummer und Anzeige des Ergebnisses
  if (isValidUSPhoneNumber(phoneNumber)) {
      // Wenn die Telefonnummer gültig ist, wird sie im Resultatsbereich angezeigt
      resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
  } else {
      // Wenn die Telefonnummer ungültig ist, wird eine Fehlermeldung angezeigt
      resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
  }
}

// Funktion zum Löschen des Eingabefelds und des Ergebnisses
function clearResults() {
  // Setzt das Eingabefeld zurück, indem der Wert auf einen leeren String gesetzt wird
  document.getElementById("user-input").value = "";
  // Löscht den Text im Ergebnis-Div
  document.getElementById("results-div").textContent = "";
}

// Event-Listener für die Schaltflächen
document.getElementById("check-btn").addEventListener("click", checkPhoneNumber);
// Wenn der "Check"-Button geklickt wird, wird die checkPhoneNumber-Funktion aufgerufen
document.getElementById("clear-btn").addEventListener("click", clearResults);
// Wenn der "Clear"-Button geklickt wird, wird die clearResults-Funktion aufgerufen

/*
Detaillierte Erklärung der Syntax:

    function isValidUSPhoneNumber(number):
        Diese Funktion nimmt die Telefonnummer (number) als Parameter entgegen und prüft mit einem regulären Ausdruck (Regex), ob sie einem US-Telefonnummernformat entspricht.
        Der reguläre Ausdruck /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/ wird verwendet, um mehrere Formate wie 1 555-555-5555, (555) 555-5555, oder 555-555-5555 zu validieren.
        test(): Die Methode test() prüft, ob die Eingabe (number) mit dem regulären Ausdruck übereinstimmt und gibt einen Wahrheitswert (true oder false) zurück.

    function checkPhoneNumber():
        Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Check"-Button klickt. Sie überprüft die Telefonnummer und zeigt das Ergebnis an.
        document.getElementById("user-input").value.trim();: Holt den Wert aus dem Eingabefeld und entfernt führende und nachfolgende Leerzeichen mit trim().
        if (!phoneNumber): Wenn das Eingabefeld leer ist, wird eine Warnung angezeigt, und die Funktion endet mit return.
        Wenn die Telefonnummer gültig ist, wird die Erfolgsmeldung (Valid US number: ...) in das resultsDiv eingefügt. Andernfalls wird eine Fehlermeldung angezeigt.

    function clearResults():
        Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Clear"-Button klickt. Sie setzt sowohl das Eingabefeld als auch das Ergebnis-Div zurück, um alle Anzeigen zu löschen.

    document.getElementById(...).addEventListener(...):
        Hier wird der Event-Listener für den "Check"-Button und den "Clear"-Button hinzugefügt. Wenn der Benutzer auf die Schaltflächen klickt, wird jeweils die zugehörige Funktion (checkPhoneNumber oder clearResults) aufgerufen.
        addEventListener("click", ...) stellt sicher, dass die angegebene Funktion beim Klicken auf die Schaltfläche ausgeführt wird.

Zusammenfassung:

    Dieser JavaScript-Code implementiert die Logik für die Überprüfung von US-Telefonnummern und das Anzeigen von Ergebnissen auf der Seite.
    Es gibt zwei Hauptfunktionen: isValidUSPhoneNumber zur Überprüfung der Telefonnummer und checkPhoneNumber, um die Überprüfung durchzuführen und die Ergebnisse anzuzeigen.
    Der clearResults-Handler löscht das Eingabefeld und das Ergebnis, während Event-Listener dafür sorgen, dass die Funktionen bei Benutzerinteraktionen ausgeführt werden.
*/