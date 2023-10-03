

import React, { useState } from "react";
import "./App.css";

const TodoApp: React.FC = () => {
    const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const removeTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const toggleTask = (index: number) => {
        const updatedTasks = [...tasks];
        if (!updatedTasks[index].completed) {
            updatedTasks[index].text = `✅ ${updatedTasks[index].text}`;
            updatedTasks[index].completed = true;
            setTasks(updatedTasks);
        }
    };

    return (
        <div className="container">
            <h1>Lista zadań</h1>
            <input
                type="text"
                placeholder="Dodaj nowe zadanie"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Dodaj</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? "completed-task" : ""} data-testid="completed-task">
                        {task.text}{" "}
                        {!task.completed && (
                            <button onClick={() => toggleTask(index)}>Zrobione</button>
                        )}{" "}
                        <button onClick={() => removeTask(index)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
