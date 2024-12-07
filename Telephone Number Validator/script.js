// Function to validate whether a given input is a valid US phone number
function isValidUSPhoneNumber(number) {
    // Regular expression (regex) to match US phone number formats
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    // The test() method checks if the phone number matches the regex pattern
    return regex.test(number); // Returns true if valid, otherwise false
  }
  
  // Function to check the phone number and display the results
  function checkPhoneNumber() {
    // Accessing the input field and results div in the DOM
    const inputField = document.getElementById("user-input");
    const resultsDiv = document.getElementById("results-div");
    // Retrieves the phone number from the input field and trims any extra spaces
    const phoneNumber = inputField.value.trim();
  
    // Check if the input field is empty
    if (!phoneNumber) {
      // Displays an alert if no phone number is entered
      alert("Please provide a phone number");
      return; // Exits the function if input is empty
    }
  
    // Validates the phone number and displays the corresponding result
    if (isValidUSPhoneNumber(phoneNumber)) {
      // If valid, displays a success message with the number
      resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
    } else {
      // If invalid, displays an error message with the number
      resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
    }
  }
  
  // Function to clear the input field and results
  function clearResults() {
    // Resets the input field to an empty string
    document.getElementById("user-input").value = "";
    // Clears the text content in the results div
    document.getElementById("results-div").textContent = "";
  }
  
  // Event listeners for button clicks
  document.getElementById("check-btn").addEventListener("click", checkPhoneNumber);
  // Triggers the checkPhoneNumber function when the "Check" button is clicked
  
  document.getElementById("clear-btn").addEventListener("click", clearResults);
  // Triggers the clearResults function when the "Clear" button is clicked
  