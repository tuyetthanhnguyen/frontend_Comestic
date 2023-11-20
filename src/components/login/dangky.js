import { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "./login.css";

function DangKy() {
    const [name, setName] = useState()
    const [mail, setMail] = useState()
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const [address, setAddress] = useState()
    const [numberPhone, setNumberPhone] = useState()
    const [birthday, setBirthday] = useState()
    const [sex, setSex] = useState()
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const registered = async () => {
        console.log('click', name, mail, password, rePassword, address, numberPhone, birthday, sex)
        if (name && mail && password && rePassword && address && numberPhone && birthday && sex) {
            if (validateEmail(mail)) {
                if (password.length >= 6) {
                    console.log('co chay vao dayyy', password === rePassword)
                    if (password === rePassword) {
                        const config = {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name, account: mail, password, numberPhone, address, birthday, sex, role: "Client"
                            })
                        }
                        const response = await fetch(" http://localhost:3030/admin/create-user", config)
                        console.log('response', response.data)
                        const data = await response.json()
                        console.log('data', data)
                        if (data.success) {
                            toast.success("Bạn đã đăng kí thành công!!!")
                        }
                        else {
                            toast.warn("Email đã được đăng kí vui lòng chọn mail khác!!!")

                        }
                    }
                    else {
                        toast.warn("Vui lòng nhập lại mật khẩu!")
                    }
                }
                else {
                    toast.warn("Mật khẩu tối thiểu 6 ký tự, vui lòng nhập lại!")
                }
            }
            else {
                toast.warn("Vui lòng nhập đúng email!")
            }

        }
        else {
            toast.warn("Vui lòng nhập đủ thông tin!")

        }
    }
    return (
        <div className="containers">
            <h1>Đăng ký tài khoản</h1>
            <form>
                <div className="form-controls">
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Họ và tên" />
                    <span></span>
                    <small></small>
                </div>
                <div className="form-controls">
                    <input type="email" id="email" onChange={(e) => setMail(e.target.value)} placeholder="Email" />
                    <span></span>
                    <small></small>
                </div>
                <div className="form-controls">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                    <span></span>
                    <small></small>
                </div>

                <div className="form-controls">
                    <input type="password" id="re_password" onChange={(e) => setRePassword(e.target.value)} placeholder="Nhập lại mật khẩu" />
                    <span></span>
                    <small></small>
                </div>
                <div className="form-controls">
                    <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} placeholder="Địa chỉ" />
                    <span></span>
                    <small></small>
                </div>
                <div className="form-controls">
                    <input type="tel" id="numberPhone" onChange={(e) => setNumberPhone(e.target.value)} placeholder="Số điện thoại" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    <span></span>
                    <small></small>
                </div>

                <div className="form-controls">
                    <input type="date" id="birthday" onChange={(e) => setBirthday(e.target.value)} placeholder="Ngày sinh" name="birthday" />
                    <span></span>
                    <small></small>
                </div>
                <div className="form-controls">
                    <select name="cars" id="cars" onChange={(e) => setSex(e.target.value)} style={{ width: "100%" }}>
                        <option>Giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                    </select>
                </div>



                <p className="submit" onClick={registered}>Đăng ký</p>
                <div className="signup_link">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></div>
            </form>
        </div>
    );
}

export default DangKy;
