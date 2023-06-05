const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'https://localhost:'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/summary");

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connection();
});
