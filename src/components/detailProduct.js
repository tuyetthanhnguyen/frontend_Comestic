import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function DetailProduct({ setCart, cart }) {
  const location = useLocation();

  const [currentID, setCurrentID] = useState();
  const [currentSize, setCurrentSize] = useState("S");
  const [currentProduct, setCurrentProduct] = useState();
  const [size, setSize] = useState("S");
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        " http://localhost:3030/admin/get-product",
        config
      );
      const data = await response.json();
      console.log("data", data);

      let arr = [...data.perfume, ...data.makeup, ...data.facialCare];
      arr.map((item) => {
        if (
          queryString.parse(location.search).id === item._id &&
          queryString.parse(location.search).type === item.type
        ) {
          setCurrentProduct(item);
          setCurrentNumber(item.sizeS + item.sizeM + item.sizeL);
        }
      });
    }

    fetchMyAPI();
  }, [location.search]);

  async function changeSize(value) {
    if (value === "S") {
      setCurrentNumber(currentProduct.sizeS);
    } else if (value === "M") {
      setCurrentNumber(currentProduct.sizeM);
    } else {
      setCurrentNumber(currentProduct.sizeL);
    }
  }

  const AddToCart = (item) => {
    const amount =
      currentID && document.getElementsByClassName(currentID)[0].value
        ? document.getElementsByClassName(currentID)[0].value
        : "1";

    // eslint-disable-next-line no-unused-expressions
    if (!currentID || item._id != currentID) {
      toast.warn("Vui lòng chọn sản phẩm ");
    } else if (amount < 1) {
      toast.warn("Vui lòng nhập số lượng sản phẩm!");
    } else {
      let index = -1;
      let tempCart = cart;
      console.log("tempCart", tempCart);
      for (let i = 0; i < tempCart.length; i++) {
        if (tempCart[i].item._id === item._id && tempCart[i].size === size) {
          let newValue = Number(tempCart[i].amount) + Number(amount);
          tempCart[i].amount = newValue;
          index = i;
        }
      }
      console.log("tempCart", tempCart);
      if (index === -1) {
        if (size === "S") {
          if (Number(amount) <= item.sizeS) {
            setCart((cart) => [...cart, { item, amount, size }]);
            toast.success("Bạn đã thêm sản phẩm vào giỏ thành công!");
          } else {
            toast.warn("Vượt quá số lượng sản phẩm hiện có, vui lòng thử lại");
          }
        } else if (size === "M") {
          if (Number(amount) <= item.sizeM) {
            setCart((cart) => [...cart, { item, amount, size }]);
            toast.success("Bạn đã thêm sản phẩm vào giỏ thành công!");
          } else {
            toast.warn("Vượt quá số lượng sản phẩm hiện có, vui lòng thử lại");
          }
        } else {
          if (Number(amount) <= item.sizeL) {
            setCart((cart) => [...cart, { item, amount, size }]);
            toast.success("Bạn đã thêm sản phẩm vào giỏ thành công!");
          } else {
            toast.warn("Vượt quá số lượng sản phẩm hiện có, vui lòng thử lại");
          }
        }
      } else {
        setCart(tempCart);
        toast.success("Bạn đã thêm sản phẩm vào giỏ thành công!");
      }
    }
  };
  console.log("currentProduct", currentProduct);
  return (
    <div className="product">
      <div className="container">
        <div className="product__detail">
          {currentProduct && (
            <div className=" product__detail-row d-flex justify-content-between">
              <div
                className="col-xl-6"
                id="main-img"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={currentProduct && currentProduct.img}
                  className="big-img"
                  alt=""
                  id="img-main"
                />
              </div>
              <div className="col-xl-6">
                <div className="product__name">
                  <h2>{currentProduct && currentProduct.name}</h2>
                </div>
                <div className="status-product">
                  Đã bán: <b>{currentProduct && currentProduct.currentSold}</b>{" "}
                  sản phẩm
                </div>
                <div className="status-product">
                  Còn lại: <b>{currentNumber && currentNumber}</b> sản phẩm
                </div>
                <div className="infor-oder">
                  Loại sản phẩm: <b>{currentProduct && currentProduct.type}</b>
                </div>
                {currentProduct.sale > 0 ? (
                  <div className="product__price">
                    <h2>
                      {" "}
                      <del>{currentProduct && currentProduct.price} đ</del>{" "}
                      {currentProduct &&
                        (currentProduct.price * (100 - currentProduct.sale)) /
                        100}{" "}
                      đ
                    </h2>
                  </div>
                ) : (
                  <div className="product__price">
                    <h2>{currentProduct && currentProduct.price} đ</h2>
                  </div>
                )}

                <div
                  className="product__size d-flex"
                  style={{ alignItems: "center" }}
                >
                  <div
                    className="title"
                    style={{ fontSize: "16px", marginRight: "10px" }}
                  >
                    Kích thước:
                  </div>
                  <div className="select-swap">
                    <div
                      className="swatch-element"
                      data-value={currentProduct._id}
                    >
                      <input
                        type="radio"
                        className={`variant-1 `}
                        id={`swatch-giay-${currentProduct._id}-1`}
                        name={currentProduct._id}
                        checked={currentSize === `S-${currentProduct._id}`}
                        value="S"
                      />
                      <label
                        for={`swatch-giay-${currentProduct._id}-1`}
                        className="sd"
                        onClick={() => {
                          setCurrentSize(`S-${currentProduct._id}`);
                          setSize("S");
                          setCurrentID(currentProduct._id);
                          changeSize("S");
                        }}
                      >
                        <span>S</span>
                      </label>
                    </div>
                    <div
                      className="swatch-element"
                      data-value={currentProduct._id}
                    >
                      <input
                        type="radio"
                        className="variant-1"
                        id={`swatch-giay-${currentProduct._id}-2`}
                        name={currentProduct._id}
                        checked={currentSize === `M-${currentProduct._id}`}
                        value="M"
                      />
                      <label
                        for={`swatch-giay-${currentProduct._id}-2`}
                        className="sd"
                        onClick={() => {
                          setCurrentSize(`M-${currentProduct._id}`);
                          setSize("M");
                          setCurrentID(currentProduct._id);
                          changeSize("M");
                        }}
                      >
                        <span>M</span>
                      </label>
                    </div>
                    <div
                      className="swatch-element"
                      data-value={currentProduct._id}
                    >
                      <input
                        type="radio"
                        className="variant-1"
                        id={`swatch-giay-${currentProduct._id}-3`}
                        name={currentProduct._id}
                        checked={currentSize === `L-${currentProduct._id}`}
                        value="L"
                      />
                      <label
                        for={`swatch-giay-${currentProduct._id}-3`}
                        className="sd"
                        onClick={() => {
                          setCurrentSize(`L-${currentProduct._id}`);
                          setSize("L");
                          setCurrentID(currentProduct._id);
                          changeSize("L");
                        }}
                      >
                        <span>L</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="product__wrap">
                  <div className="product__amount w-100">
                    <div className="product__wap-change d-flex justify-content-center">
                      <p for="" className="soluong">
                        Nhập số lượng:{" "}
                      </p>
                      <input
                        type="number"
                        min="1"
                        onChange={() => {
                          setCurrentID(currentProduct._id);
                        }}
                        className={`text-input ${currentProduct._id}`}
                        placeholder="1"
                        min="1"
                        max={currentNumber}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="shopnow"
                    onClick={() => AddToCart(currentProduct)}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <h1>THÔNG TIN SẢN PHẨM</h1>
        <h2>{currentProduct?.description}</h2>

      </div>
    </div>
  );
}

export default DetailProduct;
