const express = require("express")
const router = express.Router()
const Todo = require("../models/Todo.js")

router.get("/", async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

router.post("/", async (req, res) => {
    const { title } = req.body
    const newTodo = new Todo({ title })
    await newTodo.save()
    res.status(201).json(newTodo)
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, completed } = req.body

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true }
        )

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" })
        }

        res.json(updatedTodo)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const deletedTodo = await Todo.findByIdAndDelete(id)

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" })
        }

        res.json(deletedTodo)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router
