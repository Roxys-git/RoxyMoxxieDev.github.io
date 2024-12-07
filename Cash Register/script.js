// Set the 'price' variable to 19.5, representing the price of the item
const price = 19.5;

// 'cid' is an array of arrays representing the cash-in-drawer, with each inner array containing the currency unit and available amount
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

// Function to calculate the change based on 'price', 'cash', and 'cid' (cash-in-drawer)
function checkCashRegister(price, cash, cid) {
    // Defines the value of each currency unit in an object for quick lookup
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

    // Calculates the change due and rounds it to two decimal places
    let changeDue = Math.round((cash - price) * 100) / 100;
    // Sums all amounts in the cash-in-drawer to calculate the total available cash
    let totalCid = Number(cid.reduce((sum, [, amount]) => sum + amount, 0).toFixed(2));

    // Checks if the customer has enough money
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    // If no change is needed, return a message indicating exact payment
    if (changeDue === 0) {
        return "No change due - customer paid with exact cash";
    }

    // Checks if there is enough money in the cash-in-drawer for the required change
    if (totalCid < changeDue) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // Array to store the change to be returned
    let change = [];
    // Reverse the 'cid' array to start with the largest currency unit
    let reversedCid = [...cid].reverse();

    // Iterates through each currency unit in the reversed 'cid' array
    for (let [currency, amount] of reversedCid) {
        let unit = currencyUnit[currency]; // Value of the currency unit in decimal form
        let available = Math.round(amount * 100) / 100; // Round the available amount
        let needed = 0; // To store the required amount

        // Checks if the current currency unit can be used for the change
        while (changeDue >= unit && available > 0) {
            needed += unit; // Add the unit value to the needed amount
            available -= unit; // Reduce the available amount by the unit value
            changeDue = Math.round((changeDue - unit) * 100) / 100; // Reduce the remaining change
        }

        // If the currency unit was used, add it to the 'change' array
        if (needed > 0) {
            change.push([currency, needed]);
        }
    }

    // If exact change cannot be given, return 'INSUFFICIENT_FUNDS'
    if (changeDue > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // If the cash-in-drawer exactly matches the required change, return 'CLOSED' status
    if (Math.abs(totalCid - (cash - price)) < 0.01) {
        return formatClosedStatus(change);
    }

    // Otherwise, return the 'OPEN' status with the change
    return "Status: OPEN " + change.map(([name, amount]) => 
        `${name}: $${amount}`).join(" ");
}

// Function to format the status when the cash register should be closed
function formatClosedStatus(change) {
    // Sorts the 'change' array from highest to lowest currency unit
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

    // Returns the 'CLOSED' status with the sorted change
    return "Status: CLOSED " + sortedChange.map(([name, amount]) => 
        `${name}: $${amount}`).join(" ");
}

// Event listener for the purchase button: calculates the change and displays the result
document.getElementById('purchase-btn').addEventListener('click', function() {
    const cashInput = document.getElementById('cash'); // Get the cash input value
    const cash = Number(cashInput.value); // Convert the input value to a number
    const changeDueElement = document.getElementById('change-due'); // Element to display the result

    // Calculate the result of the checkCashRegister function
    const result = checkCashRegister(price, cash, cid);
    
    // If a result is available, display it in the 'change-due' element
    if (result) {
        changeDueElement.textContent = result;
    }
});
