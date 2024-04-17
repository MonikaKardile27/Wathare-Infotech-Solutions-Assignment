const fs = require('fs');
const faker = require('faker');

// Function to generate random temperature data
function generateTemperatureData(location, startDate, endDate, intervalMinutes = 60) {
    const temperatureData = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const timestamp = currentDate.toISOString();
        const temperature = faker.datatype.number({ min: -20, max: 40 }); // Generate random temperature between -20°C and 40°C
        temperatureData.push({ timestamp, location, temperature });
        currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes);
    }

    return temperatureData;
}

// Define parameters
const location = "New York";
const startDate = new Date('2024-01-01T00:00:00Z'); // Start date
const endDate = new Date('2024-01-01T23:59:00Z');   // End date
const intervalMinutes = 60; // Data interval in minutes

// Generate temperature data
const temperatureData = generateTemperatureData(location, startDate, endDate, intervalMinutes);

// Convert data to JSON string
const jsonData = JSON.stringify(temperatureData, null, 2);

// Write data to a JSON file
fs.writeFile('temperature_data.json', jsonData, err => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('Temperature data saved to temperature_data.json');
});