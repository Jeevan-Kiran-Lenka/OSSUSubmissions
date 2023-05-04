const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Learning backend testing",
    author: "fullstack open",
    url: "https://fullstackopen.com/en/part4/testing_the_backend",
    likes: 30,
  },
  {
    title: "Structure of backend application",
    author: "fullstack open",
    url: "https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing",
    likes: 20,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "remove this" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
