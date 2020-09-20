const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
console.log("App name: " + config.get("name"));
console.log("App mail server: " + config.get("mail.host"));
console.log("Mail password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan is enabled...");
}

dbDebugger("Set up DB...");

app.use(express.json());
app.use(helmet());

const courses = [
  {
    id: 1,
    name: "course 1",
  },

  {
    id: 2,
    name: "course 2",
  },
  {
    id: 3,
    name: "course 3",
  },
];

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const res = schema.validate(course);

  return res;
}

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("No course with the given id");
    return;
  }
  res.send(course);
});

app.post("/api/courses/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("No course with the given id");
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("No course with the given id");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
