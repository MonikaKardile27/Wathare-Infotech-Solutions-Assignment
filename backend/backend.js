const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'iacsd0923'; // Change to your database name

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to the MongoDB server');

    // Database and Collection
    const database = client.db(dbName);
    const collection = database.collection('samples'); // Change to your collection name

    // Example raw sample data
    const rawSampleData = [
      { timestamp: new Date('2024-01-01T10:30:00Z'), sample: 0 },
      { timestamp: new Date('2024-01-02T12:15:00Z'), sample: 1 },
      { timestamp: new Date('2024-01-03T08:45:00Z'), sample: 1 }
      // Add more sample data as needed
    ];

    // Step 1: Insert raw sample data into MongoDB collection
    const insertResult = await collection.insertMany(rawSampleData);
    console.log(`${insertResult.insertedCount} documents inserted`);

    // Step 2: Ensure timestamp field and indexing
    await collection.createIndex({ timestamp: 1 });
    console.log('Timestamp field indexed');

    // Step 3: Querying by timestamp
    // Example query: Retrieve data for a specific date range
    const startDate = new Date('2024-01-01T00:00:00Z');
    const endDate = new Date('2024-01-03T23:59:59Z');
    const queryResult = await collection.find({ timestamp: { $gte: startDate, $lte: endDate } }).toArray();
    console.log(`Query result:\n`, queryResult);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the main function
main();