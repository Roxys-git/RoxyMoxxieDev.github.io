// Function to calculate the mean (average) of an array of numbers
const getMean = (array) => 
  array.reduce((acc, el) => acc + el, 0) / array.length;
// `array.reduce()` sums all elements in the array and divides by the number of elements (`array.length`) to get the mean.

// Function to calculate the median of an array of numbers
const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
  // Sorts the array in ascending order to correctly calculate the median.
  
  const median = 
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  // Checks whether the number of elements is even or odd.
  // For even count, calculates the mean of the two middle values, for odd count, selects the middle value directly.
  
  return median;
};

// Function to calculate the mode (most frequent value) of an array of numbers
const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  });
  // Counts the occurrences of each element in the array and stores these values in the `counts` object.
  
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  // If all elements appear with the same frequency, there is no unique mode, so `null` is returned.
  
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  // Sorts the elements in `counts` by frequency and finds the element with the highest frequency.
  
  const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);
  // Filters all elements that have the same highest frequency as the most frequent element to handle multiple modes.
  
  return mode.join(", ");
};

// Function to calculate the range (difference between the largest and smallest value) of an array of numbers
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
  // Subtracts the smallest value from the largest value in the array to calculate the range.
};

// Function to calculate the variance of an array of numbers
const getVariance = (array) => {
  const mean = getMean(array);
  // First calculates the mean of the array values.
  
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  // Sums the squared differences of each value from the mean and divides by the number of elements to get the variance.
  
  return variance;
};

// Function to calculate the standard deviation of an array of numbers
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  // Calculates the standard deviation by taking the square root of the variance.
  
  return standardDeviation;
};

// Main function to calculate and display the statistical values
const calculate = () => {
  const value = document.querySelector("#numbers").value;
  // Retrieves the input value from the element with the ID "numbers".
  
  const array = value.split(/,\s*/g);
  // Splits the input by commas (with optional spaces) into an array of strings.
  
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  // Converts each element of the array to a number and filters out any invalid entries.
  
  // Calculates various statistical values.
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  
  // Displays the calculated values in the HTML by referencing the respective elements via their IDs.
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
