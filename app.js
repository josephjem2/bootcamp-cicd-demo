const express = require('express');
const app = express();

// Root route - learner-friendly landing page
app.get('/', (req, res) => {
    res.send('Hello Bootcamp! 🚀 Your CI/CD pipeline is working!');
});

// Health check route - for monitoring and Azure probes
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Bind to Azure's assigned port, or fallback to 3000 locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
