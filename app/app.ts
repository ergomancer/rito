import express from "express";

//Initialize: Express
const app = express();

//Setup the server
const PORT = process.env.PORT;

//Activate the server
app.listen(PORT, () => {
  console.log(`Rito - Listening on port ${PORT}!`);
});
