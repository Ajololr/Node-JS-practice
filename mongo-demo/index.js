const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect ro mongodb: " + err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React JS course",
    author: "Ilya Androsov",
    tags: ["ract", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  // eq
  // ne
  // gt
  // gte
  // lt
  // lte
  // in
  // nin

  // or
  // and

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find()
    // .find({price: {gte: 10, $lte: 20}})
    // .find({ price: { $ind: [ 10, 15, 20 ] } })
    // .or([{ author: "Ilya Androsov" }, { isPublished: true }])
    // .count()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
};

getCourses();
