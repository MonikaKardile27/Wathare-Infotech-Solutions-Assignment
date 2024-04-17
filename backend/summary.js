// Example sample data
const sampleValues = [0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0]; // Example sample values

// Function to generate summary
function generateSummary(sampleValues) {
  let numZeros = 0;
  let numOnes = 0;
  let continuousZeros = 0;
  let continuousOnes = 0;
  let maxContinuousZeros = 0;
  let maxContinuousOnes = 0;

  sampleValues.forEach(value => {
    if (value === 0) {
      numZeros++;
      continuousZeros++;
      continuousOnes = 0;
      maxContinuousZeros = Math.max(maxContinuousZeros, continuousZeros);
    } else if (value === 1) {
      numOnes++;
      continuousOnes++;
      continuousZeros = 0;
      maxContinuousOnes = Math.max(maxContinuousOnes, continuousOnes);
    }
  });

  // Generate summary object
  const summary = {
    numZeros,
    numOnes,
    maxContinuousZeros,
    maxContinuousOnes
  };

  return summary;
}

// Generate summary for the example sample values
const summary = generateSummary(sampleValues);

// Display summary in tabular format
console.log('Summary:');
console.log('Number of 0s:', summary.numZeros);
console.log('Number of 1s:', summary.numOnes);
console.log('Maximum continuous 0s:', summary.maxContinuousZeros);
console.log('Maximum continuous 1s:', summary.maxContinuousOnes);