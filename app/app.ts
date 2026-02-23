import express from "express";
import errorHandler from "./middlewares/error-handler";
import { NotFound } from "./lib/definitions/errors";
import signupRouter from "./routes/signup.route";
import profileRouter from "./routes/profile.route";
import loginRouter from "./routes/login.route";

const app = express();
app.use(express.static("public"));

//redirect requests to "/" to the frontend or my github profile
app.get("/", (req, res) =>
  res.redirect(process.env.APP_URL || "https://github.com/ergomancer/"),
);

//connect routers
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);

//set a catch-all and error handler
app.all("/{*splat}", () => {
  throw NotFound;
});
app.use(errorHandler);

//activate the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Rito - Listening on port ${PORT}!`);
});
