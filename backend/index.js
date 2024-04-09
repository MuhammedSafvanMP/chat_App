const express = require("express");
const { connectDB } = require("./config/database");
const router = require("./routes/userRoutes");
require("dotenv").config()

const app = express();
// middleware
app.use(express.json());

const PORT = process.env.PORT || 3029;

// routers
app.use("/api/v1/user", router)


app.listen(PORT, (() => {
    connectDB();
    console.log(`Server running of port http://localhost:${PORT}`)
}));