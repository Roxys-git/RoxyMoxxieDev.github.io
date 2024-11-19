// Setze die variable 'price' auf 19.5, was den Preis eines Artikels angibt
const price = 19.5;

// 'cid' ist eine Liste von Arrays, die den Kassenbestand für jede Währungseinheit anzeigt
// Jedes innere Array enthält den Namen der Währungseinheit und den verfügbaren Betrag
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Funktion zur Berechnung des Wechselgeldes basierend auf 'price', 'cash' und 'cid' (Kassenbestand)
function checkCashRegister(price, cash, cid) {
    // Definiert die Werte jeder Währungseinheit in einem Objekt zur schnellen Zuordnung
    const currencyUnit = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };

    // Berechnet das ausstehende Wechselgeld und rundet es auf zwei Dezimalstellen
    let changeDue = Math.round((cash - price) * 100) / 100;
    // Summiert alle Beträge in der Kasse auf, um den Gesamtbestand zu berechnen
    let totalCid = Number(cid.reduce((sum, [, amount]) => sum + amount, 0).toFixed(2));

    // Überprüft, ob der Kunde genügend Geld hat
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    // Falls kein Wechselgeld erforderlich ist, wird dies zurückgegeben
    if (changeDue === 0) {
        return "No change due - customer paid with exact cash";
    }

    // Überprüft, ob genug Geld in der Kasse für das Wechselgeld vorhanden ist
    if (totalCid < changeDue) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // Array zum Speichern der zurückzugebenden Währungseinheiten und Beträge
    let change = [];
    // Umkehrung der 'cid'-Liste, um mit der größten Einheit zu beginnen
    let reversedCid = [...cid].reverse();

    // Iteriert durch jede Währungseinheit in 'reversedCid'
    for (let [currency, amount] of reversedCid) {
        let unit = currencyUnit[currency]; // Wert der Einheit in Dezimalform
        let available = Math.round(amount * 100) / 100; // Runden der verfügbaren Menge
        let needed = 0; // Zum Speichern des erforderlichen Betrags

        // Überprüft, ob die aktuelle Währungseinheit für das Wechselgeld verwendet werden kann
        while (changeDue >= unit && available > 0) {
            needed += unit; // Fügt den Wert der Einheit zum benötigten Betrag hinzu
            available -= unit; // Reduziert die verfügbare Menge um den Wert der Einheit
            changeDue = Math.round((changeDue - unit) * 100) / 100; // Reduziert das ausstehende Wechselgeld
        }

        // Falls die Währungseinheit verwendet wurde, füge sie zu 'change' hinzu
        if (needed > 0) {
            change.push([currency, needed]);
        }
    }

    // Falls nicht das genaue Wechselgeld gegeben werden kann, wird 'INSUFFICIENT_FUNDS' zurückgegeben
    if (changeDue > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // Falls der gesamte Kassenbestand dem Wechselgeld entspricht, ist der Status "geschlossen"
    if (Math.abs(totalCid - (cash - price)) < 0.01) {
        return formatClosedStatus(change);
    }

    // Normalfall: gibt das Wechselgeld im "offenen" Status zurück
    return "Status: OPEN " + change.map(([name, amount]) => 
        `${name}: $${amount}`).join(" ");
}

// Funktion zur Formatierung des Status, wenn die Kasse geschlossen werden soll
function formatClosedStatus(change) {
    // Sortiert 'change' von der höchsten zur niedrigsten Einheit
    const sortedChange = change.sort((a, b) => {
        const denomValues = {
            "ONE HUNDRED": 100,
            "TWENTY": 20,
            "TEN": 10,
            "FIVE": 5,
            "ONE": 1,
            "QUARTER": 0.25,
            "DIME": 0.1,
            "NICKEL": 0.05,
            "PENNY": 0.01
        };
        return denomValues[b[0]] - denomValues[a[0]];
    });

    // Gibt den Status "CLOSED" mit dem sortierten Wechselgeld zurück
    return "Status: CLOSED " + sortedChange.map(([name, amount]) => 
        `${name}: $${amount}`).join(" ");
}

// Eventlistener für den Kauf-Button: Berechnet das Wechselgeld und zeigt das Ergebnis an
document.getElementById('purchase-btn').addEventListener('click', function() {
    const cashInput = document.getElementById('cash'); // Eingabe des Bargeldbetrags
    const cash = Number(cashInput.value); // Konvertiert den Eingabewert in eine Zahl
    const changeDueElement = document.getElementById('change-due'); // Element zur Anzeige des Ergebnisses

    // Berechnung des Ergebnisses der Funktion checkCashRegister
    const result = checkCashRegister(price, cash, cid);
    
    // Wenn ein Ergebnis vorhanden ist, wird es im 'change-due' Element angezeigt
    if (result) {
        changeDueElement.textContent = result;
    }
});

/*
Erklärung:

    const price = 19.5; – Definiert den Preis des Artikels.
    cid (cash-in-drawer) – Ein Array von Arrays, das jede Währungseinheit und ihren Betrag in der Kasse speichert.
    checkCashRegister Funktion – Berechnet das Wechselgeld und gibt den Status zurück.
    currencyUnit – Ein Objekt zur schnellen Zuordnung der Werte der einzelnen Währungseinheiten.
    totalCid – Gesamtbetrag in der Kasse.
    changeDue – Berechnetes Wechselgeld.
    change Array – Speichert das benötigte Wechselgeld.
    formatClosedStatus Funktion – Formatiert das Ergebnis, wenn die Kasse genau geleert werden muss.
    Event-Listener – Führt die Berechnung und Anzeige bei Button-Klick aus.

Diese Lösung berücksichtigt alle Anforderungen an die Berechnung und gibt den passenden Status der Kasse aus.
*/