import React, { useEffect, useState } from "react";
import "react-image-lightbox/style.css";
import "react-markdown-editor-lite/lib/index.css";
import { useLocation } from 'react-router';
import { toast } from "react-toastify";
import styled from "styled-components";

const AddSaleStyled = styled.div`
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
      margin-bottom: 18px;
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
      top: 0;
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

function AddSale() {
  const location = useLocation();
  const [avatar, setAvatar] = useState()
  const [product, setProduct] = useState([])

  const [reviewImg, setReviewImg] = useState(null)
  const [name, setName] = useState()
  const [type, setType] = useState()
  const [price, setPrice] = useState()
  const [size, setSize] = useState()
  // const [sizeL, setSizeL] = useState()
  // const [sizeM, setsizeM] = useState()
  const [color, setColor] = useState()
  const [sale, setSale] = useState()
  const [currentItem, setCurrentItem] = useState()

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setAvatar(base64)
      setReviewImg(objectURL)
    }
  };

  async function fetchMyAPI() {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },

    }
    const response = await fetch(" http://localhost:3030/admin/get-product", config)
    const data = await response.json()
    let result = data.perfume.concat(data.makeup).concat(data.facialCare)
    console.log("result", result);
    setProduct(result);
  }



  useEffect(() => {
    fetchMyAPI()

  }, [])


  const updateProduct = async () => {
    let today = new Date().toISOString().slice(0, 10)

    let item = currentItem ? JSON.parse(currentItem) : null

    if (item && sale) {
      console.log('item', item)
      const config = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          type: item.type,
          status: item.true,
          price: item.price,
          sale: sale,
          img: item.avatar,
          currentQuantity: item.currentQuantity,
          currentSold: item.currentSold,
          size: item.size,
          // sizeL: item.sizeL,
          // sizeM: item.sizeM,
          color: item.color,
          date: item.date,
          updateDate: today
        })
      }
      const response = await fetch(` http://localhost:3030/admin/product/${item.type}/${item._id}`, config)
      const data = await response.json()
      if (data) {
        toast.success(`Bạn thêm khuyến mãi sản phẩm ${item.name} thành công!`)
      }


    }
    else {
      toast.warn("Vui lòng nhập đầy đủ thông tin!")
    }

  };
  const renderProduct = () => {
    return product && product.length > 0 && product.map((item) => {
      return (<option key={item._id} value={JSON.stringify(item)}>{item.name && item.name}</option>)
    })

  }
  return (
    <AddSaleStyled>

      <div className="col-xl-12">
        <p className="admin-title mt-4">Thêm khuyến mãi</p>
        <div className="admin">
          <div className="admin-right ">
            <p className="admin-right-text">Nhập vào đây: </p>
            <form className="form-group col-xl-12">

              <div className="d-flex">
                <div className="form-group col-xl-6">
                  <label htmlFor="exampleInputPassword1">Chọn sản phẩm:</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      let item = e.target.value ? JSON.parse(e.target.value) : null
                      console.log('item', item)
                      setCurrentItem(e.target.value)
                      setSale(item.sale ? item.sale : '')
                    }}
                  >
                    <option >---Chọn sản phẩm---</option>
                    {renderProduct()}
                  </select>
                </div>
                <div className="form-group col-xl-6">
                  <label htmlFor="exampleInputPassword1"> Tỉ lệ giảm giá ̣̀(%):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="name"
                    value={sale}
                    onChange={(e) => setSale(e.target.value)}
                    placeholder="% lãi suất"
                    required
                    max="100"
                  />
                </div>

              </div>


            </form>
            <div className={"div-btn"}>
              <button
                type="submit"
                className="btn btn-submit btn-primary"
                onClick={updateProduct}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </AddSaleStyled>
  );
}


export default AddSale;
