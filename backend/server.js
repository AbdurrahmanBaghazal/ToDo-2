require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const tasksRoutes = require("./routes/tasks")

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

mongoose.set("bufferCommands", false)

let cached = global._mongoose
if (!cached) cached = global._mongoose = { conn: null, promise: null }

async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
      })
      .then((m) => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (e) {
    res.status(500).json({ error: "DB connection failed", details: String(e.message || e) })
  }
})

app.use("/api/tasks", tasksRoutes)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 4000
  connectDB()
    .then(() => {
      app.listen(port, () => console.log("listening on", port))
    })
    .catch((e) => console.error(e))
}
