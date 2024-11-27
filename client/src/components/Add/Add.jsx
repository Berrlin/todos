import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TodosContext } from "../../context/TodosContext";
import './Add.css';

const AddTodo = () => {
  const { url, token } = useContext(TodosContext);
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState({
    title: "",
    priority: "low",
    deadline: "",
    status: "pending",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewTodo(newTodo=>({...newTodo,[name]:value}))
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url + "/api/todos/add", newTodo, {
        headers: { token },
      });
      navigate("/home"); 
    } catch (error) {
      console.error("Lỗi khi thêm todo:", error);
    }
  };

  return (
    <div className="add-todo">
      <h2>Add New Todo</h2>
      <form className="add-todo-form" onSubmit={addTodo}>
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          placeholder="Enter title"
          required
        />
        <select name="priority" value={newTodo.priority} onChange={handleInputChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={newTodo.deadline}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Todo</button>
        <button type="button" onClick={() => navigate("/home")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
