const app = require('./app');
const DB = require('./db');



const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
