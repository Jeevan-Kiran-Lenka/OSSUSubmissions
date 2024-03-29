const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

beforeEach(async () => {
  // Create a root user
  await User.deleteMany({})
  // create blogs without user
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
}, 1000000)

describe("Get blog information", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api.post("/api/users").send(newUser)

    const result = await api.post("/api/login").send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  }, 100000)

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .set(headers)
      .expect("Content-Type", /application\/json/)
  }, 1000000)

  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs").set(headers)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("a specific blog in within the returned blogs", async () => {
    const response = await api.get("/api/blogs").set(headers)
    const titles = response.body.map((r) => r.title)
    expect(titles).toContain("Structure of backend application")
  })

  test("the unique identifier property of the blog posts is by default _id", async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe("Viewing a specific blog", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api.post("/api/users").send(newUser)

    const result = await api.post("/api/login").send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  }, 100000)

  test("Succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogsToView.id}`)
      .set(headers)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(resultBlog.body).toEqual(blogsToView)
  })

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    await api.get(`/api/blogs/${invalidId}`).set(headers).expect(400)
  })
})

describe("Addition of new blog", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api.post("/api/users").send(newUser)

    const result = await api.post("/api/login").send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  }, 100000)

  test("A valid blog can be added", async () => {
    const newBlog = {
      title: "How to write a blog",
      author: "Luke Shaw",
      url: "www.hashnode.com/blogs",
      likes: 35,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .set(headers)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).toContain("How to write a blog")
  })

  test("If likes property is missing likes to be 0", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .set(headers)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(
      (blog) => blog.title === "Canonical string reduction"
    )
    expect(addedBlog.likes).toBe(0)
  })

  test("If title and url are missing, respond with 400 bad request", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    await api.post("/api/blogs").send(newBlog).set(headers).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe("Deletion of a blog", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api.post("/api/users").send(newUser)

    const result = await api.post("/api/login").send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  }, 100000)

  test("Succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe("Update a blog", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api.post("/api/users").send(newUser)

    const result = await api.post("/api/login").send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  }, 100000)

  test("Blog update successful ", async () => {
    const newBlog = {
      title: "Masterpiece",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api.post("/api/blogs").send(newBlog).set(headers).expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find((blog) => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set(headers)
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
