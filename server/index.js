const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SummariesRoutes = require("./routes/summary");
const UserRoutes = require("./routes/user");

app.use("/api/summaries", cors(), SummariesRoutes);
app.use("/api/user", cors(), UserRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connection();
});
