import React, { Fragment, useEffect, useState } from "react";
import EditTodos from "./EditTodos";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const getTodos =  async() => {
        try {
            const response = await fetch("http://localhost:8080/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteTodo = async(id) => {
       try {
           const deleteTodo = await fetch(`http://localhost:8080/todos/${id}`,{
                method: "DELETE",
                headers: {"Content-Type":"application/json"}
           });
           console.log(deleteTodo);
           setTodos(todos.filter(todos => todos.todo_id !== id))
       } catch (error) {
        console.error(error.message);
       }
    }

    useEffect(()=>{
        getTodos();
    },[])

    return (
        <Fragment>
            <table className="table table-bordered mt-5 text-center">
                <thead>
                    <tr>
                        <th className="col-5">Description</th>
                        <th className="col-1">Edit</th>
                        <th className="col-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>(
                        <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodos/></td>
                        <td><i className="bi bi-trash" onClick={() => deleteTodo(todo.todo_id)}></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Fragment>
    )
}

export default ListTodos;