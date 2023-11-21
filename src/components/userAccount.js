import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";


const UserAccountSytled = styled.div`
.login-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
    color: rgb(36, 32, 82);
}

.login {
    padding: 0 4%;

    form {
        padding: 24px;
        border-radius: 5px;
        border: 1px solid black;
    }

    .div-btn {
        display: flex;
        justify-content: center;

        .btn-submit {
            color: white;
            background-color: #2d7b78
        }
    }

    .login-left {
        .login-left-header {
            font-size: 24px;
            font-weight: bold;
        }

        .error {
            color: red;
        }

        input {
            border-radius: 25px;
        }


        input:focus {
            border: 1px solid rgb(36, 32, 82);
        }
    }

    .login-right {
        padding: 36px;

        .login-right-header {
            font-size: 24px;
            font-weight: bold;
        }

        .error {
            color: red;
        }

        input {
            border-radius: 25px;
        }

    }
}
.login {
    .login-left {
        .login-left-header-items {
            margin-left: 36px;

            .login-left-header-item {
                cursor: pointer;

                .icon {
                    margin: 0 12px;
                }
            }

            .active {
                font-weight: bold;
            }

            .login-left-header-logout {
                cursor: pointer;

            }
        }

    }

    .login-right {
        .user-form {
            border: none;
        }

        .div-btn {
            display: flex;
            justify-content: space-around;

            .btn-clear {}

            .btn-submit {
                border: 1px solid;
                border-radius: 250px;
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
                font-size: 18px;
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

}`

function UserAccount({ statusLogin, setStatusLogin }) {
    const navigate = useNavigate();
    const [currentActive, setCurrentActive] = useState(0)
    const [listCurrentOrder, setListCurrentOrder] = useState([])
    const [listHistory, setListHistory] = useState([])
    const [profile, setProfile] = useState()
    const [isLogin, setIsLogin] = useState()
    const [bills, setBills] = useState([])
    const [name, setName] = useState()
    const [numberPhone, setNumberPhone] = useState()
    const [date, setDate] = useState()
    const [address, setAddress] = useState()
    const [total, setTotal] = useState(0)
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

        let sum = 0
        bills.length > 0 && bills.map((item, i) => {
            if (item.status === 2) {
                let product = JSON.parse(item.arrProduct)
                product.map(value => {
                    sum += Number(item.price) * (value.sizeS + value.sizeM + value.sizeL)
                })

            }

        })
        setTotal(sum)
    }

    useEffect(() => {
        fetchMyAPI()

    }, [])

    useEffect(() => {
        const getProfile = JSON.parse(localStorage.getItem('profile'))
        console.log('profile', getProfile)
        setName(getProfile.name)
        setAddress(getProfile.address)
        setDate(getProfile.birthday)
        setNumberPhone(getProfile.numberPhone)
        setProfile(getProfile)
    }, [])
    const logoutUser = () => {
        setStatusLogin(!statusLogin)
        localStorage.clear()
        navigate('/')
    }



    const updateUser = async () => {
        if (!name || !address || !numberPhone || !date) {
            toast.warn("Vui lòng nhập đầy đủ thông tin!")
        }
        else {
            const config = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, account: profile.account, password: profile.password, numberPhone: numberPhone, address: address, birthday: date, sex: profile.sex, role: profile.role
                })
            }
            const response = await fetch(` http://localhost:3030/admin/${profile._id}/edit-user`, config)
            const data = await response.json()
            localStorage.setItem('profile', JSON.stringify(data.user));
            setName(data.user.name)
            setAddress(data.user.address)
            setDate(data.user.birthday)
            setNumberPhone(data.user.numberPhone)
            setProfile(data.user)
            if (data.success) {
                toast.success("Chỉnh sửa tài khoản thành công!")
            }
            else {
                toast.warn("Chỉnh sửa tài khoản thất bại, vui lòng thử lại")

            }
        }


    }

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
            toast.success("Xác nhận đã nhận hàng thành công")
            fetchMyAPI()
        }
    }
    return (
        <UserAccountSytled>
            <p className="login-title"> TÀI KHOẢN</p>
            <div className="login col-xl-12 d-flex">
                <div className="login-left col-xl-3 p-4">
                    <p className="login-left-header">Xin chào! </p>
                    <div className="login-left-header-items">
                        <p
                            className={
                                currentActive === 0
                                    ? "login-left-header-item active"
                                    : "login-left-header-item"
                            }
                            onClick={() => setCurrentActive(0)}
                        >
                            <AccountCircleIcon className="icon" />
                            Thông tin tài khoản
                        </p>
                        <p
                            className={
                                currentActive === 1
                                    ? "login-left-header-item active"
                                    : "login-left-header-item"
                            }
                            onClick={() => setCurrentActive(1)}
                        >
                            <ReceiptIcon className="icon" />
                            Đơn hàng hiện tại
                        </p>
                        <p
                            className={
                                currentActive === 2
                                    ? "login-left-header-item active"
                                    : "login-left-header-item"
                            }
                            onClick={() => setCurrentActive(2)}
                        >
                            <HistoryIcon className="icon" />
                            Lịch sử đơn hàng
                        </p>
                        <p className="login-left-header-logout" onClick={logoutUser} >
                            <LogoutIcon className="icon" />
                            Đăng xuất
                        </p>
                    </div>
                </div>
                <div className="login-right col-xl-9">
                    {currentActive === 0 && profile && (
                        <div>
                            <p className="login-right-header">Thông tin tài khoản</p>
                            <form className="user-form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Tên:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        value={name}
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Vui lòng nhập tên của bạn"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        value={profile.account ? profile.account : ''}
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập nhập email"
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPhone">
                                        Số điện thoại liên hệ:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPhone"
                                        name="numberPhone"
                                        value={numberPhone}
                                        onChange={(e) => setNumberPhone(e.target.value)}

                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPhone">
                                        Ngày/tháng/năm sinh:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exampleInputPhone"
                                        name="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="exampleInputAddress"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập địa chỉ"
                                    />
                                </div>
                                <div className={"div-btn"}>
                                    <p
                                        className="btn btn-submit"
                                        onClick={() => updateUser()}
                                    >
                                        Chỉnh sửa
                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                    {currentActive === 1 && (
                        <div>
                            <p className="cart-right-text">Thông tin đơn hàng</p>
                            <ul className="table cart-right-items">
                                <li className="cart-right-header col-xl-12">
                                    <span className="cart-right-header-item col-xl-2">
                                        Mã đơn hàng
                                    </span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Số lượng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Ngày mua
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Tổng
                                    </span>
                                    <span className="cart-right-header-item col-xl-1">
                                        Trạng thái
                                    </span>

                                    <span className="cart-right-header-item col-xl-2">
                                        Xác nhận
                                    </span>
                                </li>
                                {bills.length > 0 && bills.map((item, i) => {
                                    const user = JSON.parse(item.user)
                                    if (user._id === profile._id) {
                                        if (item.status !== 2) {
                                            let product = JSON.parse(item.arrProduct)
                                            return (
                                                <li
                                                    className="cart-right-item col-xl-12"
                                                    key={item._id}
                                                >
                                                    <span className={"cart-right-item-header col-xl-2"} style={{
                                                        wordWrap: "break-word"
                                                    }}>
                                                        {item._id}

                                                    </span>
                                                    <span className={"cart-right-item-header col-xl-3"}>
                                                        {product.map(item => {
                                                            return (<div>{item.sizeS > 0 && <p>{item.item.name} size S : {item.sizeS}</p>}
                                                                {item.sizeM > 0 && <p>{item.item.name} size M : {item.sizeM}</p>}
                                                                {item.sizeL > 0 && <p>{item.item.name} size L : {item.sizeL}</p>}  </div>)
                                                        })
                                                        }
                                                    </span>

                                                    <span className={"col-xl-2"}> {item.createdAt}</span>
                                                    <span className={"col-xl-2 sumPrice"}>
                                                        {item.price} VND
                                                    </span>
                                                    <span className={"col-xl-1 "}>
                                                        {item.status === 0 ? "Chưa xác nhận" : " Đang vận chuyển"}

                                                    </span>
                                                    <span className={"col-xl-2 "}>
                                                        <div>
                                                            {item.status === 1 ? <button type="submit" className="btn btn-submit btn-all-item" onClick={() => updateBill(item._id)} style={{
                                                                width: "100%",
                                                                fontSize: "13px",
                                                                padding: "14px"
                                                            }}>
                                                                Xác nhận
                                                            </button> : <button type="submit" className="btn btn-submit btn-all-item" disabled style={{
                                                                width: "100%",
                                                                fontSize: "13px",
                                                                padding: "14px",
                                                                background: "#ccc"
                                                            }}>
                                                                Chưa thể xác nhận
                                                            </button>}

                                                        </div>
                                                    </span>
                                                </li>
                                            );
                                        }
                                    }

                                })
                                }

                            </ul>
                        </div>
                    )}
                    {currentActive === 2 && (
                        <div>
                            <p className="cart-right-text">Lịch sử đơn hàng</p>
                            <ul className="table cart-right-items">
                                <li className="cart-right-header col-xl-12">
                                    <span className="cart-right-header-item col-xl-3">
                                        Mã đơn hàng
                                    </span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Số lượng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Ngày mua
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Tổng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Trạng thái
                                    </span>
                                </li>
                                {bills.length > 0 && bills.map((item, i) => {
                                    const user = JSON.parse(item.user)
                                    if (user._id === profile._id) {

                                        if (item.status === 2) {
                                            let product = JSON.parse(item.arrProduct)


                                            return (
                                                <li
                                                    className="cart-right-item col-xl-12"
                                                    key={item._id}
                                                >
                                                    <span className={"cart-right-item-header col-xl-3"}>
                                                        {i}

                                                    </span>
                                                    <span className={"cart-right-item-header col-xl-3"}>
                                                        {product.map(item => {
                                                            return (<div>{item.sizeS > 0 && <p>{item.item.name} size S : {item.sizeS}</p>}
                                                                {item.sizeM > 0 && <p>{item.item.name} size M : {item.sizeM}</p>}
                                                                {item.sizeL > 0 && <p>{item.item.name} size L : {item.sizeL}</p>}  </div>)
                                                        })
                                                        }
                                                    </span>

                                                    <span className={"col-xl-2"}> {item.createdAt}</span>
                                                    <span className={"col-xl-2 sumPrice"}>
                                                        {item.price} VND
                                                    </span>
                                                    <span className={"col-xl-2 "}>
                                                        Đã nhận hàng
                                                    </span>
                                                </li>
                                            );
                                        }
                                    }

                                })
                                }



                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </UserAccountSytled>
    );
}

export default UserAccount;
