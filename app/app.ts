import express from "express";

//Import routers
//TODO: import routers

//Initialize: Express
const app = express();

//Setup the server
const PORT = process.env.PORT;

//Activate the server
app.listen(PORT, () => {
  console.log(`Rito - Listening on port ${PORT}!`);
});
