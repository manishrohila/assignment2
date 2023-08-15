const express = require('express');
const app = express();
app.use(express.json()); // Use express.json() middleware to parse JSON data

// Routes Imports
const productRoute = require("./routes/productRoute");
const userRoute = require('./routes/userRoute')
app.use("/api/product",productRoute);
app.use("/api/user",userRoute);
app.get('*', function (req, res) {
    console.log('Endpoint dose not Exits.');
    res.status(404).send('Endpoint dose not Exits.');
});
module.exports = app;