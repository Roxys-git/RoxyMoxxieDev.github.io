// Initiales Markdown für den Editor (User Story #6)
const initialMarkdown = `
# Überschrift H1
## Unterüberschrift H2
<a href="https://roxymoxxiedev.github.io">RoxyMoxxieDev</a>

\`const example = "Code";\`

Inline-Code: \`const example = "Code";\`

\`\`\`javascript
// Ein Codeblock
function greet() {
  console.log("Hello, World!");
}
\`\`\`

- Ein Listenelement
- Noch ein Listenelement

> Dies ist ein Blockquote.

<img src="Logo Entwurf 1 150 px.png" alt="RoxyMoxxieDev">

**Fettgedruckter Text**
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