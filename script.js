document.addEventListener("DOMContentLoaded", function () {
  // Get all project pins and the "See More Projects" button
  const projectPins = document.querySelectorAll(".project .pin");
  const seeMoreButton = document.getElementById("see-more-projects");

  // Function to display the first three projects
  function showInitialProjects() {
    projectPins.forEach((pin, index) => {
      if (index < 3) {
        pin.style.display = "block"; // Show the first three projects
      } else {
        pin.style.display = "none"; // Hide the remaining projects
      }
    });
    seeMoreButton.textContent = "More projects"; // Change the button text to "More projects"
  }

  // Function to display all projects
  function showAllProjects() {
    projectPins.forEach((pin) => {
      pin.style.display = "block"; // Show all projects
    });
    seeMoreButton.textContent = "Top projects"; // Change the button text to "Top projects"
  }

  // Function to toggle between the initial view (3 projects) and the full view (all projects)
  function toggleProjects() {
    if (seeMoreButton.textContent === "More projects") {
      showAllProjects(); // Show all projects if the button text is "More projects"
    } else {
      showInitialProjects(); // Show only the top 3 projects if the button text is "Top projects"
    }
  }

  // Initialize the page with the first three projects visible
  showInitialProjects();

  // Add an event listener for the "See More Projects" button
  seeMoreButton.addEventListener("click", toggleProjects);
});
