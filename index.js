const express = require('express');
const cors = require('cors');
const app = express();
const postgresClient = require('./db');

app.use(cors());

//routes

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await postgresClient.query("INSERT INTO TODO (description) values ($1)", [description]);
        res.json(newTodo);
    } catch (error) {
        console.log(error.message)
    }
})

//get all todos

//get a todo

//update a todo

//delete a todo

app.listen(3000, () => {
    console.log("Server started at Port 3000")
});