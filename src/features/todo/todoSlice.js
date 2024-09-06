import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            text: "Hello World!",
            completed: false
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        // Has property and functions
        addTodo: (state, action) => {  // state has initialState or current state and action value aati hai vo
            const todo = {
                id: nanoid(),
                text: action.payload // payload ko bhi aap object bana sakto hai 
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload.id) ? { ...todo, text: action.payload.text } : todo)
        },
        toggleTodo: (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload.id) ? { ...todo, completed: !todo.completed } : todo)
        }
    }
})

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer