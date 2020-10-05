const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect ro mongodb: " + err.message));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  cathegory: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true,
  },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course must have at least 1 tag",
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 0,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React JS course",
    author: "Ilya Androsov",
    cathegory: "-",
    tags: [],
    isPublished: true,
    price: 20,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (let field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
};

createCourse();

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
    // .populate("author", "name -_id")
    // .populate("category", "name")
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
};

const updateCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;

  course.set({
    isPublished: true,
    author: "Another author",
  });

  const result = await course.save();
  console.log(result);
};

const removeCourse = async (id) => {
  const result = await Course.deleteOne({ _id: id });
  // const result = await Course.deleteMany({ _id: id });\
  // const result = await Course.findByIdAndRemove(id);
  console.log(result);
};
