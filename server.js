import express from "express";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import keys from "./config/keys.js";
import passportConfig from "./config/passport.js";
import userAuth from "./routes/userAuth.js";
import profile from "./routes/profile.js";
import rate from "./routes/rate.js";

/* App configuration */
const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();

/* middlewares */
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
//Passport middleware
app.use(passport.initialize());
app.use(cors());

/* Db configuration */
mongoose
  .connect(keys.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((err, db) => {
    console.log("Mongodb connected");
  })
  .catch((error) => console.log(error));

/* Passport config */
passportConfig(passport);

/* API configuration */
app.use("/api/userAuth", userAuth);
app.use("/api/profiles", profile);
app.use("/api/rates", rate);
// app.use("/api/products", products);

/* Static folder configuration */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// catchall request
app.get("*", (req, res) => {
  res.status(200).send("You hit the api of DOOM !!!!!");
});

/* Listeing to the port */
app.listen(port, () => console.log(`The port is listenting on :${port}`));
