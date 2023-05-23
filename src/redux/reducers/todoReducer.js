const initialState = {
  todos: [],
};

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

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case UPDATE_TODO:
      const { id, updatedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        ),
      };
    default:
      return state;
  }
};

export { addTodo, deleteTodo, updateTodo };
export default todoReducer;