import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import styled from "styled-components";

import { PayPalButton } from "react-paypal-button-v2";


const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const CartStyled = styled.div`
    .cart-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
    color: rgb(36, 32, 82);
}

.cart-active {
    min-height: 55vh;
}
.paypal > div > div:last-child {
  display: none !important;
}


.cart {
    padding: 0 10%;
    min-height: 100wh;

    .text {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        width: 100%;
        margin: auto;
    }

    .text-active {
        color: green
    }

    .cart-left {
        .cart-left-header {
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

    .cart-right {
        .div-btn {
            display: flex;
            justify-content: space-around;
            margin-bottom: 16px;

            .btn-submit {
                border: 1px solid;
                border-radius: 250px;
            }

            .btn-submit:hover {
                background-color: rgb(36, 32, 82);
                color: white;
            }
        }

        padding-top: 36px;

        .cart-right-text {
            font-size: 24px;
            font-weight: bold;
        }

        .cart-right-items {
            list-style: none;
            padding: 0;
            border: 2px solid rgb(36, 32, 82);
            border-radius: 10px;

            span {
                margin: auto;

            }

            .cart-right-header,
            .cart-right-item {
                padding: 12px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid;
                cursor: pointer;
                text-align: center;

                .sumPrice {
                    .icon-clear {
                        position: absolute;
                        top: -29px;
                        right: -14px;
                    }

                    .icon-clear:hover {
                        opacity: 0.8;
                        background-color: #ccc;
                    }
                }

                .gr-icon-change {
                    padding: 12px 0;
                    cursor: pointer;

                    .icon-change {
                        font-size: 24px;
                        color: #53382c;
                    }

                    .icon-disabled {
                        color: #ccc;
                    }

                    .current-value {
                        padding: 0 12px;
                        line-height: 36px;
                    }

                }

            }

            .cart-right-header,
            .cart-right-footer {
                font-size: 24px;
                font-weight: bold;
            }

            .cart-right-footer {
                display: flex;
                justify-content: space-around;
                padding: 6px;

            }
        }
    }
}
`
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).find((val) => {
        val.length > 0 && (valid = false);
    });

    return valid;
};

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2
})
class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            sumProduct: 0,
            a: false,
            isLogin: false,
            name: "",
            email: "",
            numberPhone: "",
            address: "",
            checkout: false,
            currentPrice: 0,
            errors: {
                name: "",
                email: "",
                numberPhone: "",
                address: "",
            },
        };
    }

    componentDidMount() {
        let { listproducts } = this.props;
        if (listproducts && listproducts.length > 0) {
            this.sumValue(listproducts);
            this.setState({
                listProduct: listproducts,
                isLogin: this.props.userLoggedIn,
            });
        }
        this.setState({
            isLogin: this.props.userLoggedIn,
        });
        const accessKey = 'GrOmBivl0uVqgW3F8r3TKFj';
        const url = `https://fcsapi.com/api-v3/forex/latest?symbol=USD/VND&access_key=${accessKey}`;

        // Sử dụng Fetch API để lấy dữ liệu JSON từ API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Lấy tỷ giá USD/VND từ dữ liệu JSON
                console.log('data', data)
                const usdVndRate = data.response[0].c;

                // Quy đổi 100,000 VND sang USD
                const vnd = this.state.sumProduct;
                const usd = vnd / usdVndRate;

                // Hiển thị kết quả quy đổi trong console
                console.log(`${vnd} VND = ${usd.toFixed(2)} USD`);
                this.setState({
                    currentPrice: usd.toFixed(2)
                })
            })
            .catch(error => console.log(error));
    }

    componentDidUpdate(prevProps) {
        if (this.props.listproducts !== prevProps.listproducts) {
            this.setState({
                listProduct: this.props.listproducts,
            });
        }
        if (this.props.userLoggedIn !== prevProps.userLoggedIn) {
            this.setState({
                isLogin: this.props.userLoggedIn,
            });
        }
    }

    handleValue = (type, index) => {
        let { listProduct } = this.state;
        let copylistProduct = listProduct;

        if (type === "add") {
            copylistProduct[index].amount = typeof copylistProduct[index].amount === 'string' ? Number(copylistProduct[index].amount) : copylistProduct[index].amount
            console.log(copylistProduct[index].amount, typeof copylistProduct[index].amount)
            copylistProduct[index].amount += 1;
            copylistProduct[index].sum =
                copylistProduct[index].amount * copylistProduct[index].price;
        } else {
            if (
                copylistProduct[index].amount &&
                copylistProduct[index].amount > 1
            ) {
                copylistProduct[index].amount =
                    copylistProduct[index].amount - 1;
                copylistProduct[index].sum =
                    copylistProduct[index].amount * copylistProduct[index].price;
            }
        }
        this.sumValue(copylistProduct);
        this.setState({
            listProduct: copylistProduct,
        });
    };

    sumValue = (listProduct) => {
        let value = 0;
        if (listProduct && listProduct.length > 0) {
            value = listProduct.reduce((total, item) => {
                return total + Number(item.amount) * item.item.price * (100 - item.item.sale) / 100;
            }, 0);
        }
        this.setState({
            sumProduct: value,
        });
        const accessKey = 'GrOmBivl0uVqgW3F8r3TKFj';

        const url = `https://fcsapi.com/api-v3/forex/latest?symbol=USD/VND&access_key=${accessKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Lấy tỷ giá USD/VND từ dữ liệu JSON
                console.log('data', data)
                const usdVndRate = data.response[0].c;

                // Quy đổi 100,000 VND sang USD
                const vnd = value;
                const usd = vnd / usdVndRate;

                // Hiển thị kết quả quy đổi trong console
                console.log(`${vnd} VND = ${usd.toFixed(2)} USD`);
                this.setState({
                    currentPrice: usd.toFixed(2)
                })
            })
            .catch(error => console.log(error));
    };

    renderListProduct = (listProduct) => {
        let result = [];

        if (listProduct && listProduct.length > 0) {
            result = listProduct.map((item, index) => {
                this.state.sum += item.sum;
                return (
                    <li className="cart-right-item col-xl-12" key={index}>
                        <span className={"cart-right-item-header col-xl-4"}>
                            {item.item.name.length > 16 ? item.item.name.slice(0, 14) + "..." : item.item.name.length}
                        </span>
                        <div className={"col-xl-3"}>
                            <div className="gr-icon-change">
                                <RemoveCircleIcon
                                    className={
                                        Number(item.amount) > 1
                                            ? "icon-change "
                                            : "icon-change icon-disabled"
                                    }
                                    onClick={() =>
                                        this.handleValue(
                                            "remove",
                                            index,
                                            Number(item.amount),
                                            item.price
                                        )
                                    }
                                />
                                <span className="current-value">
                                    {Number(item.amount) >= 10
                                        ? Number(item.amount)
                                        : `0${Number(item.amount)}`}
                                </span>
                                <AddCircleIcon
                                    className="icon-change"
                                    onClick={() =>
                                        this.handleValue(
                                            "add",
                                            index,
                                            Number(item.amount),
                                            item.price
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <span className={"col-xl-2"}>{item.size}</span>
                        <span className={"col-xl-3 sumPrice"}>
                            {item.item.sale > 0 && <del>{formatter.format(Number(item.amount) * item.item.price)}</del>} {formatter.format(Number(item.amount) * item.item.price * (100 - item.item.sale) / 100)}
                            <ClearIcon
                                className={"icon-clear"}
                                onClick={() => this.deleteItem(item)}
                            />
                        </span>
                    </li>
                );
            });
        } else {
            return (
                <li className="cart-right-item col-xl-12">
                    <p className="w-100 text-center">
                        Giỏ hàng rỗng, vui lòng thêm sản phẩm!
                    </p>
                </li>
            );
        }
        return result;
    };

    deleteItem = (item) => {
        let { listProduct } = this.state;
        let tempArr = listProduct
        let index = tempArr.indexOf(item);
        if (index > -1) { // only splice array when item is found
            tempArr.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log('index', index)
        // this.props.setCart(newArr)

        console.log(tempArr)
        this.props.setCart(tempArr)
        // this.setState({ a: !this.state.a });
        this.sumValue(listProduct);
        this.renderListProduct(this.state.listProduct);
    };

    handleInput = (e) => {
        e.preventDefault();
        let target = e.target;
        let name = target.name;
        let value = target.value;
        let errors = this.state.errors;
        switch (name) {
            case "name":
                errors.name =
                    value.length < 5 ? "Tên phải dài hơn 5 kí tự" : "";
                break;
            case "email":
                errors.email = validEmailRegex.test(value)
                    ? ""
                    : "Vui lòng nhập email của bạn!!!";
                break;
            case "numberPhone":
                errors.numberPhone =
                    value.length < 8 ? "SDT ít nhất phải có 11 chữ số!!!" : "";
                break;
            case "address":
                errors.address =
                    value.length < 8 ? "Vui lòng nhập địa chỉ của bạn!!!" : "";
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    };

    submitCart = async () => {
        console.log("this.props.userInfo", this.props)
        let today = new Date().toISOString().slice(0, 10)

        let result = []
        this.state.listProduct.forEach(function (a) {
            if (!this[a.item._id]) {
                this[a.item._id] = { id: a.item._id, sizeS: 0, sizeM: 0, sizeL: 0, item: a.item };
                result.push(this[a.item._id]);
            }
            if (a.size === 'S') {
                console.log("this[a.item._id].sizeS", typeof this[a.item._id].sizeS)
                this[a.item._id].sizeS += Number(a.amount);
            }
            else if (a.size == 'M') {
                this[a.item._id].sizeM += Number(a.amount);
            }
            else if (a.size == 'L') {
                this[a.item._id].sizeL += Number(a.amount);
            }
        }, Object.create(null));

        if (this.props.userLoggedIn) {
            const getProfile = JSON.parse(localStorage.getItem('profile'))
            console.log("getProfile", getProfile)
            console.log(result);

            let obj = {
                user: JSON.stringify(getProfile),
                arrProduct: JSON.stringify(result),
                price: this.state.sumProduct,
                status: 0,
                time: today
            };

            console.log("obj", obj)
            const config = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            }
            const response = await fetch(" http://localhost:3030/admin/create-bill", config)
            const data = await response.json()
            console.log("data", data)
            if (data) {
                this.setState({
                    sumProduct: 0,
                    listProduct: [],
                    name: "",
                    email: "",
                    numberPhone: "",
                    address: "",
                });
                this.props.setCart([])
                toast.success("Bạn đã đặt hàng thành công")
            }
            else {
                toast.warn("Vui lòng nhập thông tin để xác nhận!");
            }
        } else {
            console.log('nologin')
            let obj = {
                user: JSON.stringify({
                    name: this.state.name,
                    numberPhone: this.state.numberPhone,
                    address: this.state.address,
                    birthday: 'null',
                    sex: 'null',
                    role: 'null'
                }),
                arrProduct: JSON.stringify(result),
                price: this.state.sumProduct,
                status: 0,
                time: today
            };
            let checkForm = validateForm(this.state.errors);
            console.log("checkForm", checkForm, this.state)
            if (checkForm && this.state.listProduct.length > 0 && this.state.numberPhone.length > 0) {
                const config = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj)
                }
                const response = await fetch("http://localhost:3030/admin/create-bill", config)
                const data = await response.json()
                console.log(
                    "data", data
                )
                if (data) {
                    this.setState({
                        sumProduct: 0,
                        listProduct: [],
                    });
                    this.props.setCart([])
                    toast.success("Bạn đã đặt hàng thành công")
                }
                else {
                    toast.warn("Vui lòng nhập thông tin để xác nhận!");
                }

            }
            else {
                toast.warn("Vui lòng nhập thông tin để xác nhận!");
            }
        }
    };

    render() {
        let { errors } = this.state;
        return (
            <CartStyled>

                <p className="cart-title">
                    <ReceiptIcon /> Xác nhận đơn hàng
                </p>
                <div className="cart col-xl-12 d-flex">
                    {this.state.isLogin ? (
                        <div className="cart-right col-xl-8 " style={{ margin: "0 auto" }}>
                            <p className="cart-right-text">Thông tin đơn hàng</p>
                            <ul className="table cart-right-items">
                                <li className="cart-right-header col-xl-12">
                                    <span className="cart-right-header-item col-xl-4">Tên</span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Số lượng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">Kích cỡ</span>
                                    <span className="cart-right-header-item col-xl-3">Tổng</span>
                                </li>

                                {this.renderListProduct(this.state.listProduct)}
                                <div className="cart-right-footer">
                                    <span>Tổng tiền:</span>
                                    <span>{formatter.format(Number(this.state.sumProduct))} </span>
                                </div>
                            </ul>


                            <h3>Thanh toán khi nhận hàng</h3>
                            <div className={"div-btn"}>
                                <button
                                    type="submit"
                                    className="btn  btn-submit"
                                    onClick={this.submitCart}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <h3>Thanh toán trực tuyến</h3>
                            <div className="paypal d-flex justify-content-center">
                                {this.state.currentPrice > 0 ? <PayPalButton
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: "USD",
                                                        value: this.state.currentPrice.toString()
                                                    }
                                                }
                                            ],
                                            application_context: {
                                                shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                            }
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        this.submitCart()
                                        return actions.order.capture().then(function (details) {
                                            console.log(this)

                                            alert(
                                                "Transaction completed by " + details.payer.name.given_name
                                            );
                                            return fetch("/paypal-transaction-complete", {
                                                method: "post",
                                                body: JSON.stringify({
                                                    orderID: data.orderID
                                                })
                                            });
                                        });
                                    }}

                                /> : <p>Vui lòng chọn sản phẩm</p>}


                            </div>

                        </div>
                    ) : (
                        <div className="col-xl-12 d-flex">
                            <div className="cart-left col-xl-6 p-4">
                                <p className="cart-left-header">Thông tin của bạn</p>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Tên:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            name="name" value={this.state.name}
                                            onChange={this.handleInput}
                                            placeholder="Vui lòng nhập tên của bạn"
                                            required
                                        />
                                        {errors.name.length > 0 && (
                                            <span className="error">{errors.name}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email:</label>
                                        <input
                                            onChange={this.handleInput}
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            name="email"
                                            value={this.state.email}
                                            aria-describedby="emailHelp"
                                            placeholder="Vui lòng nhập nhập email"
                                        />
                                        {errors.email.length > 0 && (
                                            <span className="error">{errors.email}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPhone">
                                            Số điện thoại liên hệ:
                                        </label>
                                        <input
                                            onChange={this.handleInput}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPhone"
                                            name="numberPhone" value={this.state.numberPhone}
                                            aria-describedby="emailHelp"
                                            placeholder="Vui lòng nhập số điện thoại"
                                        />
                                        {errors.numberPhone.length > 0 && (
                                            <span className="error">{errors.numberPhone}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                                        <input
                                            onChange={this.handleInput}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputAddress"
                                            name="address" value={this.state.address}
                                            aria-describedby="emailHelp"
                                            placeholder="Vui lòng nhập địa chỉ"
                                        />
                                        {errors.address.length > 0 && (
                                            <span className="error">{errors.address}</span>
                                        )}
                                        <small id="emailHelp" className="form-text text-muted">
                                            *Thanh toán trực tiếp khi nhận hàng!!!
                                        </small>
                                    </div>
                                </form>
                            </div>
                            <div className="cart-right col-xl-6">
                                <p className="cart-right-text">Thông tin đơn hàng</p>
                                <ul className="table cart-right-items">
                                    <li className="cart-right-header col-xl-12">
                                        <span className="cart-right-header-item col-xl-4">Tên</span>
                                        <span className="cart-right-header-item col-xl-3">
                                            Số lượng
                                        </span>
                                        <span className="cart-right-header-item col-xl-2">
                                            Size
                                        </span>
                                        <span className="cart-right-header-item col-xl-3">
                                            Tổng
                                        </span>
                                    </li>

                                    {this.renderListProduct(this.props.listproducts)}
                                    <div className="cart-right-footer">
                                        <span>Tổng tiền:</span>
                                        <span> {formatter.format(this.state.sumProduct)}</span>
                                    </div>
                                </ul>

                                <h3>Thanh toán khi nhận hàng</h3>
                                <div className={"div-btn"}>
                                    <button
                                        type="submit"
                                        className="btn  btn-submit"
                                        onClick={() => this.submitCart()}
                                    >
                                        Xác nhận
                                    </button>

                                </div>
                                <h3>Thanh toán trực tuyến</h3>
                                <div className="paypal ">
                                    {this.state.currentPrice > 0 ? <PayPalButton
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            currency_code: "USD",
                                                            value: this.state.currentPrice.toString()
                                                        }
                                                    }
                                                ],
                                                application_context: {
                                                    shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                                }
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            this.submitCart()
                                            return actions.order.capture().then(function (details) {
                                                console.log(this)

                                                alert(
                                                    "Transaction completed by " + details.payer.name.given_name
                                                );
                                                return fetch("/paypal-transaction-complete", {
                                                    method: "post",
                                                    body: JSON.stringify({
                                                        orderID: data.orderID
                                                    })
                                                });
                                            });
                                        }}

                                    /> : <p>Vui lòng chọn sản phẩm</p>}


                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </CartStyled>
        );
    }
}


export default Cart;
