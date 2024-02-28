const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.DBURI)
    .then((res) => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB error", err));
};

module.exports = { connectToDatabase }
