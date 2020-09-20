const express = require("express");
const Joi = require("joi");

const router = express.Router();

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

router.get("", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("No course with the given id");
    return;
  }
  res.send(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("No course with the given id");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router;
