const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const courses = require("./routes/courses");
const home = require("./routes/home");

// Debuggers
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

// Configuration
console.log("App name: " + config.get("name"));
console.log("App mail server: " + config.get("mail.host"));
console.log("Mail password: " + config.get("mail.password"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan is enabled...");
  dbDebugger("Set up DB...");
}

// Pug
app.set("view engine", "pug");
app.set("views", "./views"); // by default

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
