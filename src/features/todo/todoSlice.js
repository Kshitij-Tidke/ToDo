import { createSlice, nanoid } from "@reduxjs/toolkit";

// Helper function to load todos from local storage
const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        return JSON.parse(savedTodos);
    }
    return [];
};

// Initial state: load todos from local storage or use default
const initialState = {
    todos: loadTodosFromLocalStorage(),
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(state.todos)); // Save to local storage
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            localStorage.setItem("todos", JSON.stringify(state.todos)); // Save to local storage
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
            localStorage.setItem("todos", JSON.stringify(state.todos)); // Save to local storage
        },
        toggleTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
            );
            localStorage.setItem("todos", JSON.stringify(state.todos)); // Save to local storage
        },
    },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
