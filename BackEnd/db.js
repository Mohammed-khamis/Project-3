const mongoose = require('mongoose');
require('dotenv').config();

//Make connection with the mongoDB
const db = mongoose.connection;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.DB_URL, options, () => {
  console.log('DB READY TO USE');
});

// handle error / sucess
db.on('error', (err) => console.log('ERR:', err.message));
db.on('connected', () => console.log('MONGO CONNECTED'));
db.on('disconnected', () => console.log('MONGO DISCONNECTED'));
