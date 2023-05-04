const blogsRouter = require("express").Router()
const { request, response } = require("../app")
const Blog = require("../models/blog")
const { info } = require("../utils/logger")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  if (Object.keys(body).length === 0) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }
  const blogToUpdate = await Blog.findById(request.params.id)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    info(`blog ${blog.title} successfully updated`)
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
