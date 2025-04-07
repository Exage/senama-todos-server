require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const todoRoutes = require("./routes/todos")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/todos", todoRoutes)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected")
        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            )
        })
    })
    .catch((err) => console.error("DB connection error:", err))
