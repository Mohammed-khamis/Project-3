const app = require("./app");
const DB = require("./db");


const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
