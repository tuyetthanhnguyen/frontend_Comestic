import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';
import CoffeeIcon from "@mui/icons-material/Coffee";
import ContactsIcon from "@mui/icons-material/Contacts";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


function AdminDashboard({ statusLogin, setStatusLogin }) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState()

    useEffect(() => {
        const adminInfo = JSON.parse(localStorage.getItem('profile'));
        setUserName(adminInfo.name)
    }, [])
    const logoutAdmin = () => {
        setStatusLogin(!statusLogin)
        localStorage.clear()
        navigate('/')
    }
    return (
        // Quản lí user, sp, bản tin, khuyến mãi
        <div className="adminPage-dashboard col-xl-3">

            <p className="name-admin">
                <ContactsIcon className="icon" />
                Admin: {userName}
            </p>
            <h3 className="manage">
                <ManageAccountsIcon className="icon" />
                Quản lí cửa hàng
            </h3>

            <ul className="dashboard-items">
                <li className="dashboard-item">
                    <NavLink
                        className="nav-link"
                        to="admin/order"
                       
                    >
                        <ShoppingCartIcon className="icon" />
                        Danh sách đơn hàng
                    </NavLink>

                    <NavLink
                        className="nav-link"
                        to="admin/revenue"
                    >
                        <CalculateIcon className="icon" />
                        Thống kê doanh thu
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to="admin/add-product"
                    >
                        <AddIcon className="icon" />
                        Thêm sản phẩm
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to="admin/view-products"
                    >
                        <CoffeeIcon className="icon" />
                        Xem tất cả sản phẩm
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to="admin/history"
                    >
                        <ReceiptIcon className="icon" />
                        Lịch sử đơn hàng
                    </NavLink>
                </li>

                <li className="dashboard-item">
                    <NavLink
                        className="nav-link"
                        to="admin/add-user"
                    >

                        <PersonAddIcon className="icon" />
                        Thêm người dùng
                    </NavLink>
                </li>
                <li className="dashboard-item">
                    <NavLink
                        className="nav-link"
                        to="admin/view-users"
                        activeStyle={{
                            opacity: "1",
                            fontWeight: "bold",
                            color: "black",
                            lineHeight: "60px",
                            borderTopLeftRadius: "25px",
                            borderBottomLeftRadius: "25px",
                            width: "100%",
                            background: "white",

                        }}
                    >

                        <PeopleAltIcon className="icon" />
                        Tài khoản người dùng
                    </NavLink>
                </li>


                <li className="dashboard-item">
                    <NavLink
                        className="nav-link"
                        to="admin/sale"
                    >
                        {" "}
                        <GitHubIcon className="icon" />
                        Khuyến mãi
                    </NavLink>
                </li>
                
                <li className="dashboard-item" onClick={logoutAdmin} >
                    <LogoutIcon /> Đăng xuất
                </li>
            </ul>
        </div>
    );
}


export default AdminDashboard;
