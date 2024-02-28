const express = require("express");
const cors = require("cors");
const router = require('./routes')
const { connectToDatabase } = require('./config/database-config')
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

connectToDatabase();


app.listen(PORT, () =>
  console.log(`Server is success full running on : http://localhost:${PORT}`)
);
