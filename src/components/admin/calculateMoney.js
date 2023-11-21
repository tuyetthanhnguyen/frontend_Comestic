import ReceiptIcon from "@mui/icons-material/Receipt";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CalculateStyled = styled.div`
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
function CalculateMoney() {
    const [bills, setBills] = useState([])
    function groupByTime(arr) {
        const result = [];
        let currentArr = [];

        arr.forEach((obj, index) => {
            if (index === 0) {
                currentArr.push(obj);
            } else if (obj.time === arr[index - 1].time) {
                currentArr.push(obj);
            } else {
                result.push(currentArr);
                currentArr = [obj];
            }
        });

        result.push(currentArr);

        return result;
    }

    async function fetchMyAPI() {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },

        }
        const response = await fetch(" http://localhost:3030/admin/get-bill", config)
        const data = await response.json()
        let arr = groupByTime(data.bills)

        setBills([])
        setBills(arr);
    }

    useEffect(() => {
        fetchMyAPI()

    }, [])


    const renderStatus = (item) => {
        if (item?.status === 0) {
            return (<>Chưa xác nhận</>)
        }
        if (item?.status === 1) {
            return (<>Đang vận chuyển</>)
        }
        else {
            return (<>Đã nhận hàng</>)

        }
    }

    const renderDay = () => {
        console.log('bills', bills)
        return bills.length > 0 && bills.map((items, i) => {
            let total = 0
            items.map(item => {
                total += item?.status === 2 ? +item.price : 0
            })

            return items[0]?.status === 2 ?
                (<ul className="table admin-right-items">
                    <li className="admin-right-header col-xl-12">
                        Tổng hợp đơn hàng ngày {items[0].time}
                    </li>
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

                    </li>
                    {renderListProduct(items)}
                    <li className="admin-right-header col-xl-12" >
                        Tổng doanh thu: {formatter.format(Number(total))}
                    </li>
                </ul>) : (<></>)

        })

    };

    const renderListProduct = (arr) => {
        return arr.length > 0 && arr.map((item, i) => {
            if (item?.status === 2) {
                let user = item.user && JSON.parse(item.user)
                let product = item.arrProduct && JSON.parse(item.arrProduct)


                return (
                    <li className="admin-right-item col-xl-12" key={item._id}>
                        <span className="admin-right-header-item col-xl-1" style={{ wordWrap: "break-word" }}>{item._id}</span>
                        <span className="admin-right-header-item col-xl-2">
                            {user.name}

                        </span>
                        <div className="admin-right-headfr-item col-xl-3">
                            {product.map(item => {
                                return (<div>{item.size > 0 && <p>{item.item.name} size : {item.sizeS}</p>}
                                    {/* {item.sizeM > 0 && <p>{item.item.name} size M : {item.sizeM}</p>}
                                    {item.sizeL > 0 && <p>{item.item.name} size L : {item.sizeL}</p>}   */}
                                </div>)
                            })
                            }

                        </div>
                        <span className="admin-right-header-item col-xl-1"> {formatter.format(Number(item.price))} </span>
                        <span className="admin-right-header-item col-xl-1"> {renderStatus(item)} </span>
                        <span className="admin-right-header-item col-xl-2">
                            {item.time}
                        </span>

                    </li>)
            }
        })
    };

    return (
        <CalculateStyled>
            <div className="adminPage-body ">
                <p className="admin-title">
                    <ReceiptIcon />
                    Tất cả đơn hàng
                </p>
                <div className="admin">
                    <div className="admin-right ">
                        <p className="admin-right-text">Thông tin đơn hàng</p>

                        {renderDay()}
                    </div>
                </div>
            </div>
        </CalculateStyled>
    );
}



export default CalculateMoney;
