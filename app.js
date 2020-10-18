const registerRouter = require('./routes/register');
const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(registerRouter);




const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});