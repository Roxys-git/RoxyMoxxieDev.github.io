// Zuweisung von HTML-Elementen zu JavaScript-Variablen
const convertBtn = document.getElementById('convert-btn');
/* Saves the button with the ID 'convert-btn' into the variable convertBtn,
   so we can control it with JavaScript later */

const numberInput = document.getElementById('number');
/* Saves the input field with the ID 'number' into the variable numberInput,
   to retrieve the entered value for conversion */

const outputElement = document.getElementById('output');
/* Saves the output element with the ID 'output' into the variable outputElement,
   to display the result or error messages */

// Function to convert a number to Roman numeral
function toRoman(num) {
    // Array of Roman numerals and their corresponding values
    const romanNumerals = [
        ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
        ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
        ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
    ];
    /* Each element in the array contains a Roman numeral symbol and its associated value.
       This list is sorted from largest to smallest values to allow correct conversion */

    let result = ''; // Stores the final result, the Roman numeral, as a string

    for (const [roman, value] of romanNumerals) {
        /* Iterates over each element in the array. On each iteration, the Roman symbol and the value
           of the Roman numeral are read */

        while (num >= value) {
            /* Checks if the number is greater than or equal to the current value.
               If yes, the Roman symbol is added to the result string, and the value is subtracted from num */

            result += roman;
            // Adds the Roman symbol to the result

            num -= value;
            // Subtracts the value of the Roman symbol from the number
        }
    }

    return result; // Returns the full Roman numeral result
}

// Event listener for click on the convert button
convertBtn.addEventListener('click', () => {
    const inputValue = numberInput.value.trim();
    /* Gets the value from the input field, removes leading and trailing spaces,
       and stores it in inputValue */

    const number = parseInt(inputValue, 10);
    /* Converts inputValue into an integer in decimal system and stores the result
       in the variable number */

    // Checks different conditions for the input and shows appropriate messages
    if (inputValue === '') {
        outputElement.textContent = "Please enter a valid number";
        /* If no value is entered (empty string), an error message is shown */
    } 
    else if (number < 1) {
        outputElement.textContent = "Please enter a number greater than or equal to 1";
        /* If the number is less than 1, the user is asked to enter a number ≥ 1 */
    } 
    else if (number > 3999) {
        outputElement.textContent = "Please enter a number less than or equal to 3999";
        /* If the number is greater than 3999, the user is asked to enter a number ≤ 3999 */
    } 
    else {
        outputElement.textContent = toRoman(number);
        /* If all conditions are met, the number is converted to a Roman numeral
           and the result is displayed in the output element */
    }
});
