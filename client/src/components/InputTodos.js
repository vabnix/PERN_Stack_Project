import React, { Fragment, useState } from "react";

const InputTodos = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:8080/todos", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            
            console.log(response);
        } catch (error) {
            console.error(error.message)
        }

    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Todo App - PERN</h1>
            <form className="mt-5" onSubmit={onSubmitForm}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Todo description" aria-label="Todo description" aria-describedby="button-addon2"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary">Add</button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default InputTodos;