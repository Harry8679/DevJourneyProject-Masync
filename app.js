const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));