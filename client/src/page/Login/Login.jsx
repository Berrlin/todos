import React, { useContext, useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { TodosContext } from '../../context/TodosContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { url, setToken, setUserId } = useContext(TodosContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    password: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        setUserId(response.data.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setIsLoading(true);  
        setTimeout(() => {
          navigate("/home"); 
        }, 1000);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login/Register error:", error);
    }
  }

  return (
    <div className='wrapper'>
      {isLoading ? (
        <div className="loading-animation"></div> 
      ) : (
        <form onSubmit={onLogin}>
          <h1>{currState}</h1>
          <div className="input-box">
            <input name='username' value={data.username} onChange={onChangeHandler} type="text" placeholder='Username' required />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
            <FaLock className='icon' />
          </div>
          {currState === "Login" ? null
            : <div className="input-box">
                <input name='phone' value={data.phone} onChange={onChangeHandler} type="tel" placeholder='Phone' required minLength={9} maxLength={11} pattern="[0-9]*" />
                <FaPhone className='icon' />
              </div>
          }
          {currState === "Login" ? (
            <div className="remember-forgot">
              <label><input type="checkbox" />Remember me</label>
              <a onClick={()=>navigate('/forget')}>Forgot password</a>
            </div>
          ) : (
            <div className="policy">
              <label><input type="checkbox" required />By continuing, I agree to the terms of use & privacy policy</label>
            </div>
          )}
          {currState === "Login" ? <button type='Submit'>Login</button> : <button type='Submit'>Register</button>}
          {currState === "Login" ?
            <div className="register-link">
              <p>Don't have an account? <span onClick={() => setCurrState("Register")}>Register</span></p>
            </div>
            :
            <div className="login-link">
              <p>Have already an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
            </div>
          }
        </form>
      )}
    </div>
  );
}

export default Login;
