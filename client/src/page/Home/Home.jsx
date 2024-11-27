import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TodosContext } from "../../context/TodosContext";
import { IoLogOut } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import './Home.css'


const Home = () => {
  const { url, token, setToken } = useContext(TodosContext);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  //DATE
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  //DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa công việc này?")) { 
      try {
        await axios.delete(`${url}/api/todos/delete/${id}`, {
          headers: { token }
        });
        setData(data.filter((todo) => todo._id !== id)); 
        alert("Xóa công việc thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa todo:", error);
        alert("Xóa công việc thất bại. Vui lòng thử lại.");
      }
    }
  };
  
  //LOGOUT
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  //LIST
  const fetchList = async () => {
    try {
      const response = await axios.post(url + "/api/todos/list", {}, {
        headers: { token }
      });
      const todos = response.data.data || [];
      setData(todos);
      console.log(todos);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách todos:", error);
    }
    console.log(token)
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.post(`${url}/api/user/get-user-info`, {}, {
        headers: { token }
      });
      if (response.data.success) {
        setUsername(response.data.username);
      } else {
        alert("Không thể lấy thông tin người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    } else {
      fetchList();
      fetchUserInfo();
    }
  }, [navigate]);

  return (
    <div className="todo">
      <div className="todo-top">
        <p onClick={() => navigate("/add-todo")} className="create">Create New</p>
        <p className="list">ToDo List</p>
        <div className="todo-username">
          <p>{username}</p>
          <IoLogOut onClick={logout} className='icon-logout' />
        </div>
      </div>
      <div className="todo-title">
        <p>Title</p>
        <p>Priority</p>
        <p>Deadline</p>
        <p>Status</p>
        <p>Update</p>
        <p>Delete</p>
      </div>
      <div className="todo-list">
        {data.length ? (
          data.map((todo) => (
            <div
              key={todo._id}
              className={`todo-item ${todo.status.toLowerCase()} ${todo.priority.toLowerCase()}`}
            >
              <p>{todo.title}</p>
              <p className="priority">{todo.priority}</p>
              <p>{formatDate(todo.deadline)}</p>
              <p className="status">{todo.status}</p>
              <p><RxUpdate onClick={() => navigate(`/update/${todo._id}`)} className="icon-update" /></p>
              <p><MdDelete onClick={() => handleDelete(todo._id)} className="icon-delete" /></p>
            </div>
          ))
        ) : (
          <p>Không có công việc nào.</p>
        )}
      </div>

    </div>
  );
};

export default Home;

