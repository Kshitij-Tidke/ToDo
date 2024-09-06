import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo, toggleTodo } from '../features/todo/todoSlice';

function Todos() {
    const [newTodoText, setNewTodoText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  
    const [isEditable, setIsEditable] = useState(null);  
    const [editText, setEditText] = useState("");  

    const todos = useSelector(state => state.todos);  
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (newTodoText.trim() === "") {
            setErrorMessage("Todo cannot be empty!");
            return;
        }
        dispatch(addTodo(newTodoText));
        setNewTodoText("");
        setErrorMessage("");
    };

    const handleUpdateTodo = (id) => {
        if (editText.trim()) {
            dispatch(updateTodo({ id, text: editText }));
            setIsEditable(null);
            setEditText("");
        }
    };

    return (
        <div className="container mx-auto p-6 sm:p-10">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo List</h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-2">
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        className={`flex-grow border ${errorMessage ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        placeholder="Add new todo"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                    >
                        Add Todo
                    </button>
                </div>
                {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
            </div>

            <div className="space-y-4">
                {todos.length === 0 ? (
                    <p className="text-center text-gray-600">No todos available!</p>
                ) : (
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => dispatch(toggleTodo({ id: todo.id }))}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />

                                {isEditable === todo.id ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        placeholder="Update todo text"
                                    />
                                ) : (
                                    <div
                                        className={`text-lg ${todo.completed
                                            ? "line-through text-gray-400"
                                            : "text-gray-800 font-semibold"
                                        }`}
                                    >
                                        {todo.text}
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-4 mt-4 sm:mt-0">
                                {todo.completed ? (
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsEditable(todo.id);
                                            setEditText(todo.text);
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => dispatch(removeTodo(todo.id))}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Todos;
