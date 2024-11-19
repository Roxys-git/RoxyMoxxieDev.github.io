document.addEventListener("DOMContentLoaded", function () {
  // Holen der Projekte und des Buttons
  const projectPins = document.querySelectorAll(".project .pin");
  const seeMoreButton = document.getElementById("see-more-projects");

  // Funktion zum Anzeigen der ersten drei Projekte
  function showInitialProjects() {
    projectPins.forEach((pin, index) => {
      if (index < 3) {
        pin.style.display = "block"; // Zeige die ersten drei Projekte
      } else {
        pin.style.display = "none"; // Verstecke die restlichen Projekte
      }
    });
    seeMoreButton.textContent = "See more projects"; // Ändere den Button-Text
  }

  // Funktion zum Anzeigen aller Projekte
  function showAllProjects() {
    projectPins.forEach((pin) => {
      pin.style.display = "block"; // Zeige alle Projekte
    });
    seeMoreButton.textContent = "Top projects"; // Ändere den Button-Text
  }

  // Funktion zum Umschalten zwischen den Ansichten
  function toggleProjects() {
    if (seeMoreButton.textContent === "See more projects") {
      showAllProjects(); // Zeige alle Projekte
    } else {
      showInitialProjects(); // Zeige nur die Top-3-Projekte
    }
  }

  // Initialisiere die Seite mit den ersten drei Projekten
  showInitialProjects();

  // Event Listener für den "See More Projects"-Button
  seeMoreButton.addEventListener("click", toggleProjects);
});

/*
Erklärung

    showInitialProjects:
        Zeigt nur die ersten drei Projekte (index < 3) und verbirgt die restlichen.
        Ändert den Button-Text zu "See more projects".

    showAllProjects:
        Zeigt alle Projekte an, indem style.display = "block" gesetzt wird.
        Ändert den Button-Text zu "Top projects".

    toggleProjects:
        Überprüft den aktuellen Button-Text mit textContent.
        Wechselt dynamisch zwischen showInitialProjects und showAllProjects.

    Event Listener:
        Der Button schaltet beim Klick zwischen den beiden Ansichten hin und her.

Integration

Speichere den aktualisierten Code in die script.js-Datei, die mit deinem HTML-Dokument verknüpft ist. Der Button passt sein Verhalten dynamisch an den angezeigten Text an. 😊
*/
