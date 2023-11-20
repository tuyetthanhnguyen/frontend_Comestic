/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import bg1 from "./../../images/banner/bg-1.jpg";
import bg2 from "./../../images/banner/bg-2.jpg";
import bg3 from "./../../images/banner/bg-3.jpg";
const StyledHomeBanner = styled.div`
    .div-banner {
        .banner {
            height: 750px;
        }
    }

`;

class HomeBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      //   appendDots: (dots) => (
      //     <div>
      //       <ul style={{ margin: "-100px -80% 0 0" }}> {dots} </ul>
      //     </div>
      //   ),
    };
    return (
      <StyledHomeBanner className="div-banner">
        <Slider {...settings}>
          <div>
            <img src={bg1} alt="bannerTree" className="banner" />
          </div>
          <div>
            <img src={bg2} alt="bannerTree" className="banner" />
          </div>
          <div>
            <img src={bg3} alt="bannerTree" className="banner" />
          </div>
        </Slider>
      </StyledHomeBanner>
    );
  }
}

export default HomeBanner;
