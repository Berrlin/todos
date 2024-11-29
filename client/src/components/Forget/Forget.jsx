import React, { useContext, useState } from 'react';
import { FaUser, FaPhone, FaLock } from "react-icons/fa";
import './Forget.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TodosContext } from '../../context/TodosContext';

const Forget = () => {
    const {url} = useContext(TodosContext)
    const [data, setData] = useState({
        username: "",
        phone: "",
        newPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${url}/api/user/forget`, data);
            if (response.data.success) {
                window.alert("update password success")
                navigate("/")

            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error while resetting password:", error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const onCancelHandler = () => {
        navigate("/");
    }

    return (
        <div className='forget-wrapper'>
            <form onSubmit={onSubmitHandler}>
                <h1>Forget Password</h1>
                <div className="input-box">
                    <input
                        name="username"
                        type="text"
                        value={data.username}
                        onChange={onChangeHandler}
                        placeholder="Username"
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input
                        name="phone"
                        type="tel"
                        value={data.phone}
                        onChange={onChangeHandler}
                        placeholder="Phone"
                        required
                        minLength={9}
                        maxLength={11}
                        pattern="[0-9]*"
                    />
                    <FaPhone className='icon' />
                </div>
                <div className="input-box">
                    <input
                        name="newPassword"
                        type="password"
                        value={data.newPassword}
                        onChange={onChangeHandler}
                        placeholder="New Password"
                        required
                    />
                    <FaLock className='icon' />
                </div>
                {message && <p className="message">{message}</p>}
                <div className="forget-button">
                    
                    <button type="submit">Reset Password</button>
                    <button type="button" className="cancel-btn" onClick={onCancelHandler}>Cancel</button>

                </div>

            </form>

        </div>
    );
}

export default Forget;
