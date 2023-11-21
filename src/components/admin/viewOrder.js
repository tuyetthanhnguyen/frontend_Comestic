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
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2
})
function ViewOrder() {
    const [bills, setBills] = useState([])
    async function fetchMyAPI() {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },

        }
        const response = await fetch(" http://localhost:3030/admin/get-bill", config)
        const data = await response.json()
        setBills([])
        setBills(data.bills);
    }

    useEffect(() => {
        fetchMyAPI()

    }, [])

    const updateBill = async (id) => {
        console.log('id', id)
        const config = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },

        }
        const response = await fetch(` http://localhost:3030/admin/${id}/update-bill`, config)
        const data = await response.json()
        if (data.success) {
            toast.success("Xác nhận đơn hàng thành công")
            fetchMyAPI()
        }
    }

    const renderListProduct = (arr) => {
        return arr && arr.length > 0 && arr.map((item) => {
            let user = item.user && JSON.parse(item.user)

            if (
                item.status < 2 && user.role === 'null' || item.status < 1
            ) {
                let product = JSON.parse(item.arrProduct)
                return (
                    <li className="admin-right-item col-xl-12" key={item._id}>
                        <span className="admin-right-header-item col-xl-1" style={{ wordBreak: "break-word" }}>{item._id}</span>
                        <span className="admin-right-header-item col-xl-2">
                            {user.name}

                        </span>
                        <div className="admin-right-headfr-item col-xl-3">
                            {product.map(item => {
                                return (<div>{item.size > 0 && <p>{item.item.name} size S : {item.size}</p>}
                                    {/* {item.sizeM > 0 && <p>{item.item.name} size M : {item.sizeM}</p>}
                                    {item.sizeL > 0 && <p>{item.item.name} size L : {item.sizeL}</p>}   */}
                                </div>)
                            })
                            }

                        </div>
                        <span className="admin-right-header-item col-xl-1">  {formatter.format(Number(item.price))}     </span>
                        <span className="admin-right-header-item col-xl-1"> {item.status === 0 ? 'Chưa xác nhận' : 'Đang vận chuyển'} </span>
                        <span className="admin-right-header-item col-xl-2">
                            {item.time}
                        </span>
                        <span className="admin-right-header-item col-xl-2">
                            <div>
                                <button type="submit" className="btn btn-submit btn-all-item" onClick={() => updateBill(item._id)} style={{
                                    width: "100%",
                                    fontSize: "13px",
                                    padding: "14px"
                                }}>
                                    Xác nhận
                                </button>
                            </div>

                        </span>
                    </li>
                );
            }
        })

    }


    return (
        <OrderStyled>
            <div className="adminPage-body ">
                <p className="admin-title">
                    <ReceiptIcon />
                    Tất cả đơn hàng
                </p>
                <div className="admin">
                    <div className="admin-right ">
                        <p className="admin-right-text">Thông tin đơn hàng</p>
                        <ul className="table admin-right-items">
                            <li className="admin-right-header col-xl-12">
                                <span className="admin-right-header-item col-xl-1">STT</span>
                                <span className="admin-right-header-item col-xl-2">
                                    Tên khách
                                </span>
                                <span className="admin-right-header-item col-xl-3">
                                    Sản phẩm
                                </span>
                                <span className="admin-right-header-item col-xl-1">Tổng</span>
                                <span className="admin-right-header-item col-xl-1">Trạng thái</span>
                                <span className="admin-right-header-item col-xl-2">
                                    Thời gian
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Xác nhận
                                </span>
                            </li>
                            {renderListProduct(bills)}

                        </ul>
                    </div>
                </div>
            </div>
        </OrderStyled>
    );
}



export default ViewOrder;
