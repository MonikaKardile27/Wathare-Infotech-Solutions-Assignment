const axios = require('axios');

// Function to fetch temperature data based on location coordinates
async function fetchTemperature(latitude, longitude, apiKey) {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`);
    const data = response.data;
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.current.temp_c;
  } catch (error) {
    console.error('Error fetching temperature:', error.message);
    throw error;
  }
}

module.exports = fetchTemperature;