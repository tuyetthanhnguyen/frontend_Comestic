import ReceiptIcon from "@mui/icons-material/Receipt";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
          background:#538622;
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
function ViewProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    async function fetchMyAPI() {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },

        }
        const response = await fetch(" http://localhost:3030/admin/get-product", config)
        const data = await response.json()
        setProduct({
            perfume: data.perfume,
            makeup: data.makeup,
            facialCare: data.facialCare
        });
    }

    useEffect(() => {
        fetchMyAPI()

    }, [])

    const deleteProduct = async (type, id) => {
        console.log('type, id', type, id)
        // /admin/:type/:id/delete-product
        const config = {
            method: "DELETE", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        }
        await fetch(` http://localhost:3030/admin/${type}/${id}/delete-product`, config)
        toast.success("Xóa sản phẩm thành công!")
        fetchMyAPI()
    }

    console.log(product)
    const redirectLink = (item, link) => {
        navigate(link, { replace: true });
    }

    const renderListperfume = () => {


        return product.perfume && product.perfume.length > 0 && product.perfume.map((item, index) => {
            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1" style={{ wordWrap: "break-word" }}>{item._id}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        Nước hoa
                    </span>
                    <div className="admin-right-header-item col-xl-2">
                        <p>
                            SizeS : {item.sizeS}
                        </p>
                        <p>
                            sizeM : {item.sizeM}
                        </p>
                        <p>
                            SizeL : {item.sizeL}
                        </p>
                    </div>
                    <span className="admin-right-header-item col-xl-2">
                        <div onClick={() => redirectLink(item, `/admin/edit-product?type=${item.type}&id=${item._id}`)}>
                            {/* <button type="submit" className="btn btn-edit btn-all-item"> */}
                            <button type="submit" className="btn btn-edit btn-all-item" >

                                Sửa
                            </button>
                        </div>
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
                                            <h5 className="modal-title" id="exampleModalLongTitle">Xóa sản phẩm {item.name}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Bạn có chắc là muốn xóa sản phẩm {item.name} khỏi danh sách sản phẩm. Thao tác này không thể hoàn lại!
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-delete btn-all-item" onClick={() => deleteProduct("perfume", item._id)} data-dismiss="modal">Đồng ý</button>
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
    const renderListmakeup = () => {

        return product.makeup && product.makeup.length > 0 && product.makeup.map((item, index) => {

            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1" style={{ wordWrap: "break-word" }}>{item._id}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        Trang điểm
                    </span>
                    <div className="admin-right-header-item col-xl-2">
                        <p>
                            SizeS : {item.sizeS}
                        </p>
                        <p>
                            sizeM : {item.sizeM}
                        </p>
                        <p>
                            SizeL : {item.sizeL}
                        </p>

                    </div>
                    <span className="admin-right-header-item col-xl-2">
                        <div onClick={() => redirectLink(item, `/admin/edit-product?type=${item.type}&id=${item._id}`)}>

                            <button type="submit" className="btn btn-edit btn-all-item">
                                Sửa
                            </button>
                        </div>
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
                                            <h5 className="modal-title" id="exampleModalLongTitle">Xóa sản phẩm {item.name}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Bạn có chắc là muốn xóa sản phẩm {item.name} khỏi danh sách sản phẩm. Thao tác này không thể hoàn lại!
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-delete btn-all-item" onClick={() => deleteProduct("makeup", item._id)} data-dismiss="modal">Đồng ý</button>
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
    const renderListfacialCare = () => {
        console.log(product)
        return product.facialCare && product.facialCare.length > 0 && product.facialCare.map((item) => {

            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1" style={{ wordWrap: "break-word" }}>{item._id}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        Chăm sóc da mặt
                    </span>
                    <div className="admin-right-header-item col-xl-2">
                        <p>
                            SizeS : {item.sizeS}
                        </p>
                        <p>
                            sizeM : {item.sizeM}
                        </p>
                        <p>
                            SizeL : {item.sizeL}
                        </p>

                    </div>
                    <span className="admin-right-header-item col-xl-2">
                        <div onClick={() => redirectLink(item, `/admin/edit-product?type=${item.type}&id=${item._id}`)}>

                            <button type="submit" className="btn btn-edit btn-all-item">
                                Sửa
                            </button>
                        </div>
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
                                            <h5 className="modal-title" id="exampleModalLongTitle">Xóa sản phẩm {item.name}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Bạn có chắc là muốn xóa sản phẩm {item.name} khỏi danh sách sản phẩm. Thao tác này không thể hoàn lại!
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-delete btn-all-item" onClick={() => deleteProduct("facialCare", item._id)} data-dismiss="modal">Đồng ý</button>
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
                    Tất cả sản phẩm
                </p>
                <div className="admin">
                    <div className="admin-right ">
                        <p className="admin-right-text">Danh sách sản phẩm</p>
                        <ul className="table admin-right-items">
                            <li className="admin-right-header col-xl-12">
                                <span className="admin-right-header-item col-xl-1">STT</span>
                                <span className="admin-right-header-item col-xl-3">
                                    Tên sản phẩm
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Danh mục
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Số lượng còn lại
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Sửa
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Xóa
                                </span>
                            </li>
                            {renderListperfume()}
                            {renderListmakeup()}
                            {renderListfacialCare()}

                        </ul>
                    </div>
                </div>
            </div>
        </OrderStyled>
    );
}



export default ViewProduct;
