import PersonAdd from '@mui/icons-material/PersonAdd';
import { useState } from "react";
import { toast } from 'react-toastify';
import styled from "styled-components";

const AddUserStyled = styled.div`
   
   .admin-title {
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
  color: rgb(36, 32, 82);
}

.admin {
  padding: 0 10%;

  .admin-left {
    margin: 0 auto;
    .admin-left-header {
      font-size: 24px;
      font-weight: bold;
    }

    input {
      border-radius: 25px;
    }

    input:focus {
      border: 1px solid rgb(36, 32, 82);
    }
  }

  .admin-right {
    font-size: 18px;
    font-weight: 600;
    .div-btn {
      display: flex;
      justify-content: end;
      margin-right:24px;
      .btn-submit{
        border: 1px solid;
        border-radius:250px;
      }

    }
   
    .admin-right-text {
      font-size: 24px;
      font-weight: bold;
    }
    .inputImg{
      width: 60%;
    }
    .reviewimg{
      position: absolute;
      width: 100px;
      height: 200px;
      top: -20px;
      right: 0;
      .img{
          width: 100%;
      }
  }

    .admin-right-items {
      list-style: none;
      padding: 0;
      border: 2px solid rgb(36, 32, 82);
      border-radius: 10px;
      .text-cart{
        width: 100%;
        text-align: center;
        margin: 0 auto;
      }
      span {
        margin: auto;

      }

      .admin-right-header,
      .admin-right-item {
        padding: 12px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid;
        cursor: pointer;
        text-align: center;
    font-size: 18px;

        .btn-all-item{
          background: #ffb600;
          color: white;
          border-radius:25px;
        }

      }

      .admin-right-header, .admin-right-footer {
        font-size: 24px;
        font-weight: bold;
      }

      .admin-right-footer {
        display: flex;
        justify-content: space-around;
        padding: 6px;

      }
    }
  }
}
.addUser {
  width: 100%;
  margin: 0 10%;
  .login-left {
    font-size: 21px;
    label {
      color: black;
      font-weight: 500;
    }

    .login-left-header {
      font-size: 24px;
      font-weight: bold;

    }
.error{
  color: red;
}
    input {
      border-radius: 25px;
      border: 1px solid;
      padding:21px;
    }


    input:focus {
      border: 1px solid rgb(36, 32, 82);
    }
  }

  .div-btn {
    justify-content: end;
    display: flex;

    .btn-submit {
      color: white;
      background-color: rgb(0, 30, 60)
    }
    .btn-submit:hover{
          opacity: 0.8
      }
  }
}
`



function AddUser() {
  const [name, setName] = useState()
  const [mail, setMail] = useState()
  const [password, setPassword] = useState()
  const [rePassword, setRePassword] = useState()
  const [address, setAddress] = useState()
  const [numberPhone, setNumberPhone] = useState()
  const [birthday, setBirthday] = useState()
  const [sex, setSex] = useState()
  const [role, setRole] = useState()

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
          if (password == rePassword) {
            const config = {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name, account: mail, password, numberPhone, address, birthday, sex, role
              })
            }
            const response = await fetch(" http://localhost:3030/admin/create-user", config)
            const data = await response.json()
            if (data.errCode === 2) {
              toast.warn("Tài khoản đã tồn tại, vui lòng nhập mail khác!")
            }
            else if (data.success) {
              toast.success("Thêm tài khoản thành công!")

            }
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
    <AddUserStyled>

      <div className="addUser col-xl-12">
        <div className="login-left col-xl-8 ">
          <p className="admin-title"> <PersonAdd className="icon" />Thêm người dùng</p>
          <form id="create-course-form">
            <div className="form-controls">
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ và tên" />

              <small></small>
            </div>
            <div className="form-controls">
              <input type="email" id="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Email" />

              <small></small>
            </div>
            <div className="form-controls">
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />

              <small></small>
            </div>

            <div className="form-controls">
              <input type="password" id="re_password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Nhập lại mật khẩu" />

              <small></small>
            </div>
            <div className="form-controls">
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Địa chỉ" />

              <small></small>
            </div>
            <div className="form-controls">
              <input type="tel" id="numberPhone" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} placeholder="Số điện thoại" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />

              <small></small>
            </div>

            <div className="form-controls">
              <input type="date" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Ngày sinh" name="birthday" />

              <small></small>
            </div>
            <div className="form-controls">
              <select name="cars" id="cars" value={sex} onChange={(e) => setSex(e.target.value)} style={{ width: "100%", height: "40px", }}>
                <option>Giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>

            <div className="form-controls">
              <select name="cars" id="cars" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", height: "40px" }}>
                <option>Admin hay Client</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
              </select>
            </div>



            <p className="submit" onClick={registered}>Đăng ký</p>
          </form>
        </div >
      </div >
    </AddUserStyled >
  );
}


export default AddUser;
