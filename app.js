const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('DB Connected'))
        .catch(e => console.log(e));

// Start the server
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));