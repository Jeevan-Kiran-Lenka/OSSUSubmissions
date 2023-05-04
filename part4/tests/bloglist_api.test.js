const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
}, 1000000)

describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  }, 1000000)
})

describe("getting blogs", () => {
  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("a specific blog in within the returned blogs", async () => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map((r) => r.title)
    expect(titles).toContain("Structure of backend application")
  })

  test("the unique identifier property of the blog posts is by default _id", async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogsToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(resultBlog.body).toEqual(blogsToView)
  })

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe("addition of new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "How to write a blog",
      author: "Luke Shaw",
      url: "www.hashnode.com/blogs",
      likes: 35,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).toContain("How to write a blog")
  })

  test("if likes property is missing likes to be 0", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(
      (blog) => blog.title === "Canonical string reduction"
    )
    expect(addedBlog.likes).toBe(0)
  })

  test("if title and url are missing, respond with 400 bad request", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    await api.post("/api/blogs").send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe("Update a blog", () => {
  test("Blog update successful ", async () => {
    const newBlog = {
      title: "Masterpiece",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api.post("/api/blogs").send(newBlog).expect(201)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find((blog) => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find((blog) => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
