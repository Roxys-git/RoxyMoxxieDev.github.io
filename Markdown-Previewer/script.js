// Initiales Markdown für den Editor (User Story #6)
const initialMarkdown = `
<div id="title-from-js">
  <a href="https://roxymoxxiedev.github.io">RoxyMoxxie Dev</a>
</div>
  <h1>You can create your Website,<br> 
    based on Hypertext Marking Language,<br> 
    within your own files.<br>
  </h1>

  <img src="Logo Entwurf 1.png" alt="RoxyMoxxieDev">

  <p>Roxana Zwicky<br>
     <a href="https://roxymoxxiedev.github.io">RoxMoxxie Dev</a><br>
     <a href="https://github.com/RoxyMoxxieDev/RoxyMoxxieDev.github.io">GitHub</a><br>
     <a href="www.linkedin.com/in/roxana-anastasia-zwicky-544a1b32b">LinkedIn</a><br>
     <a href="mailto:roxanaanastasiazwicky@gmail.com">&#9993</a><br>
     <a href="tel:+41-77-283-12-36">&#9990</a>
  <p>
`;

// Elemente abrufen
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// Standard-Markdown in den Editor laden (User Story #6)
editor.value = initialMarkdown;

// Funktion zur Aktualisierung der Vorschau (User Story #3 und #4)
const updatePreview = () => {
  const markdownText = editor.value; // Markdown-Text aus dem Editor
  const htmlContent = marked.parse(markdownText, { breaks: true }); // Markdown in HTML umwandeln (User Story #7)
  preview.innerHTML = htmlContent; // HTML in den Vorschau-Bereich einfügen
};

// Event-Listener hinzufügen, um Echtzeit-Updates zu ermöglichen (User Story #3)
editor.addEventListener("input", updatePreview);

// Vorschau beim ersten Laden aktualisieren (User Story #6)
updatePreview();

marked.setOptions({
  breaks: true, // GitHub-Flavored Markdown Zeilenumbrüche
  gfm: true, // GitHub Flavored Markdown aktivieren
});