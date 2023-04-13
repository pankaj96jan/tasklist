import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [error, setError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "" || title === undefined) {
      setError({
        title: "title is required!"
      });
    } else if (dueDate === null || dueDate === undefined) {
      setError({
        date: "date is required!"
      });
    }
    if (title.length > 0 && dueDate) {
      onAddTask({ title, dueDate });
      setTitle(title);
      setDueDate(new Date());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter task title"
      />
      {error.title && <span className="validationText">{error.title}</span>}
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        minDate={new Date()}
        placeholderText="Select due date"
      />

      {error.date && <span className="validationText">{error.date}</span>}
      <button type="submit">Add task</button>
    </form>
  );
};

export default TaskForm;
