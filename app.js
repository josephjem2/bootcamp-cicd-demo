const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Hello Bootcamp! 🚀 Your CI/CD pipeline is working!');
});

// Health check route (useful for monitoring)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
