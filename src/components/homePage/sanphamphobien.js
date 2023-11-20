import styled from 'styled-components';
import Logo from "./../../images/logo/logo.png"

import { useEffect, useState } from 'react';


function Sanphamphobien({ setCart }) {
    const [product, setProduct] = useState([])
    const [sp1, setSp1] = useState()
    const [sp2, setSp2] = useState()
    useEffect(() => {

        async function fetchMyAPI() {
            const config = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },

            }
            const response = await fetch(" http://localhost:3030/admin/get-product", config)
            const data = await response.json()
            console.log("data", data)
            setProduct({
                perfume: data.perfume,
                makeup: data.makeup,
                facialCare: data.facialCare
            });
            let arr = [...data.perfume, ...data.makeup, ...data.facialCare]
            const sortedArr = arr.sort((a, b) => b.currentSold - a.currentSold);
            const twoLargest = sortedArr.slice(0, 2);
            console.log(twoLargest);
        }

        fetchMyAPI()

    }, [])
    const sanphamphobien = [
        {
            id: 1,
            token: "sanphamphobien-1",
            name: "Kem Chống Nắng La Roche-Posay Kiểm Soát Dầu SPF50+ 50ml",
            img: "https://res.cloudinary.com/nfttokenasa/image/upload/v1694535289/fbmjghcexvrrnyrjf1wf.jpg",
            price: 401000,
            des: `Kem chống nắng giúp bảo vệ da khỏi tia UVB & UVA dài và giảm bóng nhờn La Roche-Posay Anthelios UV Mune 400 Oil Control Gel-Cream 50ml là kem chống nắng dành cho da dầu phiên bản công thức cải tiến mới đến từ thương hiệu dược mỹ phẩm La Roche-Posay, giúp kiểm soát bóng nhờn và bảo vệ da trước tác hại từ ánh nắng & ô nhiễm, ngăn chặn các tác nhân gây lão hóa sớm. Sản phẩm có công thức chống thấm nước thích hợp dùng hằng ngày và cả những hoạt động ngoài trời.`,
        },
        {
            id: 2,
            token: "sanphamphobien-2",
            name: "Nước Tẩy Trang L'Oreal Tươi Mát Cho Da Dầu, Hỗn Hợp 400ml",
            img: "https://res.cloudinary.com/nfttokenasa/image/upload/v1694535289/hzxdfwkpmwn9afcx3xie.jpg",
            price: 155000,
            des: `
            Nước Tẩy Trang L'Oréal là dòng sản phẩm tẩy trang dạng nước đến từ thương hiệu L'Oreal Paris, được ứng dụng công nghệ Micellar dịu nhẹ giúp làm sạch da, lấy đi bụi bẩn, dầu thừa và cặn trang điểm chỉ trong một bước, mang lại làn da thông thoáng, mềm mượt mà không hề khô căng.
        `,
        },
    ];
    const renderProduct = () => {
        return sanphamphobien.map((item, i) => {
            return (<div className="col-lg-6 col-sm-12 mb-20">
                <div className="card" style={{ width: "100%" }}>
                    <div>
                        <img className="card-img-top" src={item.img} alt="Card image cap" />
                        <div className="card-body">
                            <h4 className="card-title">{item.name}</h4>
                            <p className="card-text custom__name-product" style={{ fontWeight: "400" }}>{item.des}</p>
                            <div title="GIÀY ADIDAS 4D FUTURECRAFT"
                                className="btn btn-buynow" >Xem ngay <i className="fas fa-arrow-right"
                                    style={{ fontSize: "16px", marginLeft: "5px" }}></i></div>
                        </div>
                    </div>
                </div>
            </div>)
        })
    }

    return (
        <div>
            <div className="product">
                <div className="container">
                    <div className="product_popular">
                        <h3 className="product__popular title-product">Sản phẩm phổ biến</h3>
                        <div className="row" id="spphobien">
                            {renderProduct()}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Sanphamphobien;
