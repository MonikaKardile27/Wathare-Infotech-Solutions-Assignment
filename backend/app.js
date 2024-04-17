const express = require('express');
const moment = require('moment');
const app = express();
const PORT = 3000;
const fetchTemperature = require('./weather');

const latitude = 51.51; // Example latitude
const longitude = -0.13; // Example longitude
const apiKey = 'eb8285ef7cb64cb0a6291803241704';

// Sample data (timestamps and values)
const data = [
  { timestamp: new Date('2024-01-01T12:00:00Z'), value: 0 },
  { timestamp: new Date('2024-01-01T13:00:00Z'), value: 1 },
  { timestamp: new Date('2024-01-01T14:00:00Z'), value: 1 },
  // Add more data as needed
];

fetchTemperature(latitude, longitude, apiKey)
  .then(temperature => {
    console.log('Temperature:', temperature);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// API endpoint to filter data
app.get('/filter', (req, res) => {
  const { interval, start } = req.query;

  // Parse start time using moment.js
  const startTime = moment(start);

  // Calculate end time based on the interval
  const endTime = moment(startTime).add(1, interval);

  // Filter data within the specified time range
  const filteredData = data.filter(item => {
    const itemTime = moment(item.timestamp);
    return itemTime.isBetween(startTime, endTime, undefined, '[]');
  });

  res.json(filteredData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});