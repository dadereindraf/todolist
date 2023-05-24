import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../actions/todoAction';

const initialState = {
  todos: [],
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

export default todoReducer;