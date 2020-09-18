const express = require("express");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) res.status(404).send("No course with the given id");
  res.send(course);
});

app.post("/api/courses/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
