// Initial Markdown content for the editor (User Story #6)
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

// Retrieve elements from the DOM
const editor = document.getElementById("editor"); // Textarea where the user writes Markdown
const preview = document.getElementById("preview"); // Area where the HTML preview will be displayed

// Load the initial Markdown into the editor (User Story #6)
editor.value = initialMarkdown; // Pre-fills the editor with the initialMarkdown string

// Function to update the preview area with parsed HTML (User Story #3 and #4)
const updatePreview = () => {
  const markdownText = editor.value; // Get the Markdown text from the editor
  const htmlContent = marked.parse(markdownText, { breaks: true }); // Parse the Markdown to HTML (User Story #7)
  preview.innerHTML = htmlContent; // Insert the parsed HTML into the preview section
};

// Add event listener for real-time updates when the user types (User Story #3)
editor.addEventListener("input", updatePreview); // Calls updatePreview every time the editor content changes

// Update preview when the page is first loaded (User Story #6)
updatePreview(); // Initially render the preview with the content loaded into the editor

// Configure Marked.js options
marked.setOptions({
  breaks: true, // Enables GitHub-Flavored Markdown (GFM) line breaks
  gfm: true, // Activates GitHub Flavored Markdown (GFM) syntax
});
