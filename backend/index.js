const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const approute = require("./route.js");
var MongoDBStore = require("connect-mongodb-session")(session);
const port = process.env.BACKEND_PORT || 3001;

const { SESSION_KEY, url, FRONTEND_URL } = require("./settings/env.js");
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./build")));
}

app.use(bodyParser.json({ limit: "50mb" })); //limit limits the data which can be uploaded to server.js from frontend
const store = new MongoDBStore({
  uri: url,
  collection: "mySessions",
});
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 6 * 60 * 60 * 1000, //6 hours
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      rolling: true,
    },
  }),
);

app.get("/", cors(), (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  }
});

app.use("/en", approute); //routing to all functions

//checks if session is expired
app.get("/checksessionexpiry", async (req, res) => {
  a = req.session.loggedInemail;
  if (a !== undefined) {
    res.json(1);
  } else {
    res.json(req.session);
  }
});

app.get("*", function (req, res) {
  if (process.env.NODE_ENV) {
    res.sendFile(path.resolve(__dirname, "./build", "index.html"));
  } else {
    console.log(req.path);
    res.status(404).send("This route does not exist");
  }
});

app.listen(port, function (req, res) {
  console.log(
    "server is running on Production:-",
    process.env.NODE_ENV == "production" ? "true" : "false",
  );
});
