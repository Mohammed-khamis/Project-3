const mongoose = require('mongoose');
const app = require('./app');

require("dotenv").config();

const db = mongoose.connection;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URL, options, () => {
  console.log("DB READY TO USE");
});

// handle error / sucess
db.on("error", (err) => console.log("ERR:", err.message));

db.on("connected", () => console.log("MONGO CONNECTED"));

db.on("disconnected", () => console.log("MONGO DISCONNECTED"));


const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
