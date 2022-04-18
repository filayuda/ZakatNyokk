require("dotenv").config();
const express = require('express');
const routers = require('./src/routers')
const app = express();
const port = 5000;
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use("/api/v1", routers);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Running on port ${port}`));