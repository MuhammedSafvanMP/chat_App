const express = require("express");
const { connectDB } = require("./config/database");
require("dotenv").config()

const app = express();

const PORT = process.env.PORT || 3029;



app.listen(PORT, (() => {
    connectDB();
    console.log(`Server running of port http://localhost:${PORT}`)
}));