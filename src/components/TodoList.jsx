import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/reducers/todoReducer";
import "../Todolist.css";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);
  const [addTodoInput, setAddTodoInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleAddSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(), // Generate a unique ID for the new todo
      title: addTodoInput,
      isDone: false,
    };
    dispatch(addTodo(newTodo));

    setAddTodoInput("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(updateTodo(editTodoId, { title: editTodoInput }));
    setEditTodoId(null);
    setEditTodoInput("");
  };

  const handleEdit = (id, title) => {
    setEditTodoId(id);
    setEditTodoInput(title);
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTodoInput("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleComplete = (id, isDone) => {
    dispatch(updateTodo(id, { isDone: !isDone }));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  let filteredTodos = todos;
  if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.isDone);
  } else if (filter === "complete") {
    filteredTodos = todos.filter((todo) => todo.isDone);
  }

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>What's the plan for today?</h1>
          <form onSubmit={handleAddSubmit} className="form-add">
            <input
              type="text"
              placeholder="Masukkan todo baru ..."
              value={addTodoInput}
              onChange={(e) => setAddTodoInput(e.target.value)}
            />
            <button>Add</button>
          </form>

          <div className="filter-container">
            <button
              className={`filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className={`filter-button ${filter === "active" ? "active" : ""}`}
              onClick={() => handleFilterChange("active")}
            >
              Active
            </button>
            <button
              className={`filter-button ${
                filter === "complete" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("complete")}
            >
              Complete
            </button>
          </div>

          <div className="form-wrapperr">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((item) => (
                <div key={item.id} className="data-wrap">
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={() => handleComplete(item.id, item.isDone)}
                    className="data-checkbox"
                  />

                  {editTodoId === item.id ? (
                    <form onSubmit={handleEditSubmit} className="form-edit">
                      <input
                        type="text"
                        placeholder="Edit todo"
                        value={editTodoInput}
                        onChange={(e) => setEditTodoInput(e.target.value)}
                        className="data-edit"
                      />
                      <button className="button-update">Update</button>
                      <button
                        onClick={handleCancelEdit}
                        className="button-cancel"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <span
                        style={{
                          textDecoration: item.isDone ? "line-through" : "none",
                        }}
                      >
                        {item.title}
                      </span>

                      <div className="kedua">
                        {!item.isDone && (
                          <button
                            onClick={() => handleEdit(item.id, item.title)}
                            className="button-edit"
                          >
                            Edit
                          </button>
                        )}
                        {!item.isDone && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="button-delete"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No todos found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
