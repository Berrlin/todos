import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TodosContext } from "../../context/TodosContext";
import "./Update.css";

const Update = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const { url, token } = useContext(TodosContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    status: "Pending",
    priority: "Low",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`${url}/api/todos/${id}`, {
        headers: { token },
      });
      const todo = response.data.todo;

      if (todo) {
        setFormData({
          title: todo.title, 
          status: todo.status, 
          priority: todo.priority,
          deadline: todo.deadline
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("Lỗi khi lấy công việc:", err);
      setError("Không thể tải thông tin công việc.");
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData, [name]:value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${url}/api/todos/update/${id}`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        alert("Cập nhật công việc thành công!");
        navigate("/home");
      } else {
        alert(response.data.message || "Cập nhật thất bại.");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật công việc:", err);
      alert("Lỗi hệ thống. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="update">
      <h2>Cập nhật công việc</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Trạng thái:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mức độ ưu tiên:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Hạn chót:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">
          Cập nhật
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate("/home")}
        >
          Hủy bỏ
        </button>
      </form>
    </div>
  );
};

export default Update;
