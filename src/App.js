import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const toggleCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = (filter) => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const [filter, setFilter] = useState("all");

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks(filter)
          .sort((a, b) => a.dueDate - b.dueDate)
          .map((task, index) => (
            <li
              key={index}
              style={task.completed ? { textDecoration: "line-through" } : {}}
            >
              {task.title} - {task?.dueDate?.toLocaleDateString()}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(index)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
