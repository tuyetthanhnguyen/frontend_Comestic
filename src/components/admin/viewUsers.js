import ReceiptIcon from "@mui/icons-material/Receipt";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const OrderStyled = styled.div`
    .admin-title {
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
  color: rgb(36, 32, 82);
}

.admin {
  padding: 0 5%;

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
          background: #001e3c;
          color: white;
          border-radius:25px;
        }
        .btn-delete{
          background:#5d2286;
          color: white;
          border-radius:25px;
        }
        .btn-edit{
          background:#ffb600;
          color: white;
          border-radius:25px;
        }
        .btn-all-item:hover{
            opacity: 0.8
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
`
function ViewUsers() {
    const [users, setUsers] = useState([])
    async function fetchMyAPI() {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },

        }
        const response = await fetch(" http://localhost:3030/admin/get-user", config)
        const data = await response.json()
        setUsers(data.users);
    }
    useEffect(() => {
        fetchMyAPI()

    }, [])

    const deleteUser = async (id) => {
        console.log('id', id)
        const config = {
            method: "DELETE", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(` http://localhost:3030/admin/${id}/delete-user`, config)
        toast.success("Xóa người dùng thành công!")
        fetchMyAPI()
    }

    const renderListUsers = () => {

        return users.map((item, index) => {
            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1">{index}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        {item.account}
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        {item.role}
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        <Link to={`/admin/edit-user/${item._id}`}>
                            <button type="submit" className="btn btn-edit btn-all-item">
                                Sửa
                            </button>
                        </Link>
                    </span>

                    <span className="admin-right-header-item col-xl-2 bg-red">
                        <div to={`/admin/item-order/?token=$item.token`}>

                            <button type="button" className="btn btn-delete btn-all-item" data-toggle="modal" data-target={`#exampleModalCenter${item._id}`}>
                                Xóa
                            </button>

                            <div className="modal fade" id={`exampleModalCenter${item._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Xóa người dùng {item.account}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Bạn có chắc là muốn xóa người dùng {item.account} khỏi danh sách user. Thao tác này không thể hoàn lại!
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-delete btn-all-item" onClick={() => deleteUser(item._id)} data-dismiss="modal">Đồng ý</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </li>
            );
        })

    };

    return (
        <OrderStyled>

            <div className="adminPage-body ">
                <p className="admin-title">
                    <ReceiptIcon />
                    Tất cả người dùng
                </p>
                <div className="admin">
                    <div className="admin-right ">
                        <p className="admin-right-text">Danh sách người dùng</p>
                        <ul className="table admin-right-items">
                            <li className="admin-right-header col-xl-12">
                                <span className="admin-right-header-item col-xl-1">STT</span>
                                <span className="admin-right-header-item col-xl-3">
                                    Tên
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Email
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Quyền truy cập
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Chỉnh sửa
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Xóa
                                </span>
                            </li>
                            {renderListUsers()}


                        </ul>
                    </div>
                </div>
            </div>
        </OrderStyled>
    );
}



export default ViewUsers;
