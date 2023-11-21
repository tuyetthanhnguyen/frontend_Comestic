import React, { Component } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import bg from "./../images/dribbble_1.gif"
const NotFoundStyled = styled.div`
    .page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
}
.page_404  img{ width:100%;}

.four_zero_four_bg{
    background-image:url(${bg}) ;
    height: 400px;
    background-position: center;
}
.col-sm-offset-1{
    margin: auto;
}

.four_zero_four_bg h1{
    font-size:80px;
}

.four_zero_four_bg h3{
    font-size:80px;
}

.link_404{
    color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;}
.contant_box_404{ margin-top:-50px;}
`
class NotFound extends Component {

    render() {
        return (
            <NotFoundStyled>
                <section className="page_404">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-10 col-sm-offset-1  text-center">
                                    <div className="four_zero_four_bg">
                                        <h1 className="text-center ">404</h1>


                                    </div>

                                    <div className="contant_box_404">
                                        <h3 className="h2">
                                            Trang bạn tìm kiếm không tồn tại
                                        </h3>

                                        <p>Vui lòng quay lại!</p>

                                        <Link to={"/"} className="link_404">Quay lại</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </NotFoundStyled>
        );
    }
}

export default NotFound;
