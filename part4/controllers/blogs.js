const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post("/", (req, res, next) => {
  // const body = req.body

  // const blog = new Blog({

  // })

  const blog = new Blog(req.body)

  blog
    .save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
