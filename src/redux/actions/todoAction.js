const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";

const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

const updateTodo = (id, updatedTodo) => {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      updatedTodo,
    },
  };
};

export { ADD_TODO, DELETE_TODO, UPDATE_TODO, addTodo, deleteTodo, updateTodo };