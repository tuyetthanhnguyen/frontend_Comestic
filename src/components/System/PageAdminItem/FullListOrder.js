import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";
import { Link } from "react-router-dom";
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
function FullListOrder() {
   const renderListProduct = () => {
    return (
        <li className="admin-right-item col-xl-12" key={item._id}>
            <span className="admin-right-header-item col-xl-1">{1}</span>
            <span className="admin-right-header-item col-xl-3">
                Name
            </span>
            <span className="admin-right-headfr-item col-xl-1">
                currentValue
            </span>
            <span className="admin-right-header-item col-xl-2">item.price</span>
            <span className="admin-right-header-item col-xl-2">
                item.createdAt
            </span>
            <span className="admin-right-header-item col-xl-3">
                <Link to={`/admin/item-order/?token=$item.token`}>
                    <button type="submit" className="btn btn-submit btn-all-item">
                        Xác nhận
                    </button>
                </Link>
            </span>
        </li>
    );
        //     return (
        //         <li className="admin-right-item col-xl-12">
        //             <p className="text-cart">Hiện tại không có đơn, nhưng tí nữa sẽ có!!!</p>

        //         </li>
        //     );
    

        // return result;
    };

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
                                    <span className="admin-right-header-item col-xl-3">
                                        Tên khách
                                    </span>
                                    <span className="admin-right-header-item col-xl-1">
                                        Số lượng
                                    </span>
                                    <span className="admin-right-header-item col-xl-2">Tổng</span>
                                    <span className="admin-right-header-item col-xl-2">
                                        Thời gian
                                    </span>
                                    <span className="admin-right-header-item col-xl-3">
                                        Xác nhận
                                    </span>
                                </li>
                                {renderListProduct()}

                            </ul>
                        </div>
                    </div>
                </div>
            </OrderStyled>
        );
}



export default FullListOrder;
