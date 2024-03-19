const express = require('express');
const cors = require('cors');
const app = express();
const postgresClient = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await postgresClient.query("INSERT INTO TODO (description) values ($1)", [description]);

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await postgresClient.query("SELECT * from TODO");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getSingleTodo = await postgresClient.query("SELECT * from TODO WHERE todo_id = $1", [id]);
        res.json(getSingleTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await postgresClient.query("UPDATE TODO SET DESCRIPTION = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo is updated");
    } catch (error) {
        console.log(error.message);
    }
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await postgresClient.query("DELETE FROM TODO WHERE todo_id = $1", [id]);
        res.json("Todo is deleted");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(3000, () => {
    console.log("Server started at Port 3000");
});