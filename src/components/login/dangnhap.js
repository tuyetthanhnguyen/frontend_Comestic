import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./login.css";


function Login({ statusLogin, setStatusLogin, setIsLogin }) {
    const navigate = useNavigate()
    const [account, setAccount] = useState()
    const [password, setPassword] = useState()
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const loginAccount = async () => {
        if (account && validateEmail(account)) {
            if (password.length >= 6) {
                const config = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        account: account, password: password
                    })
                }
                const response = await fetch(" http://localhost:3030/login", config)
                const data = await response.json()
                localStorage.setItem('profile', JSON.stringify(data.user));
                console.log('data.user', data)
                if (data.errCode == '0') {
                    setIsLogin(true)
                    localStorage.setItem('isLogin', true);
                    if (data.user.role == 'Admin') {
                        localStorage.setItem('isAdmin', true);
                        navigate("/admin/order")
                        setStatusLogin(!statusLogin)
                    }
                    else {
                        navigate("/profile")
                    }

                }
                else {
                    toast.warn("Tài khoản hoặc mật khẩu không đúng, vui lòng nhập lại!")
                }

            }
            else {
                toast.warn("Mật khẩu tối thiểu 6 ký tự, vui lòng nhập lại!")

            }

        }
        else {
            toast.warn("Tài khoản không phải email hoặc rỗng, vui lòng nhập lại");
        }
    }
    return (
        <div className="containers">

            <h1>Đăng nhập</h1>
            <form>
                <div className="form-controls">
                    <input type="email" id="email" onChange={(e) => setAccount(e.target.value)} placeholder="Email" />
                    <span></span>
                    <small></small>
                </div>
                <div className="form-controls">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <span></span>
                    <small></small>
                </div>
                <p className="submit" onClick={loginAccount}>Login</p>
                <div className="signup_link">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>
            </form>
        </div>
    );
}

export default Login;
