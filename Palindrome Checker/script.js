// Adds a click event listener to the button with the ID "check-btn"
document.getElementById("check-btn").addEventListener("click", function() {
    // Retrieves the input field element with the ID "text-input"
    const inputElement = document.getElementById("text-input");
    // Retrieves the result display element with the ID "result"
    const resultElement = document.getElementById("result");
    // Gets the value from the input field, trimming leading and trailing spaces
    const inputValue = inputElement.value.trim();

    // Checks if the input field is empty
    if (inputValue === "") {
        // Shows an alert if the input field is empty
        alert("Please input a value");
        // Clears the result field content
        resultElement.textContent = "";
        return; // Exits the function if no value was input
    }

    // Function to check if a string is a palindrome
    function isPalindrome(str) {
        // Removes all non-alphanumeric characters and converts the string to lowercase
        const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        // Checks if the cleaned string is equal to its reversed version
        return cleanedStr === cleanedStr.split("").reverse().join("");
    }

    // Checks if the input value is a palindrome
    if (isPalindrome(inputValue)) {
        // If it's a palindrome, set the result field to "input is a palindrome"
        resultElement.textContent = `${inputValue} is a palindrome`;
    } else {
        // If it's not a palindrome, set the result field to "input is not a palindrome"
        resultElement.textContent = `${inputValue} is not a palindrome`;
    }
});
