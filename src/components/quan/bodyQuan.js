import ProductNew from '../productNew';
import ProductSale from '../productSale';
import ProductYouLike from '../productYouLike';

function BodyQuan({ setCart,cart }) {

    return (
        <>
            <div className="product">
                <div className="container">

                    <ProductNew setCart={setCart} cart = {cart}/>
                    <ProductSale setCart={setCart} cart = {cart}/>

                    <section className="awe-section-9">
                        <div className="section_policy clearfix">
                            <div className="col-12">
                                <div className="owl-policy-mobile">
                                    <div className="owl-stage-outer">
                                        <div className="owl-stage">
                                            <div className="owl-item">
                                                <div className="section_policy_content">
                                                    <a href="">
                                                        <img src="https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_1.png?1628514159582"
                                                            alt="" />
                                                        <div className="section-policy-padding">
                                                            <h3>Miễn phí vận chuyển</h3>
                                                            <div className="section_policy_title">Cho các đơn hàng</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="section_policy_content">
                                                    <a href="">
                                                        <img src="https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_2.png?1628514159582"
                                                            alt="" />
                                                        <div className="section-policy-padding">
                                                            <h3>Hỗ trợ 24/7</h3>
                                                            <div className="section_policy_title">Liên hệ hỗ trợ 24h/ngày</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="section_policy_content">
                                                    <a href="">
                                                        <img src="	https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_3.png?1628514159582"
                                                            alt="" />
                                                        <div className="section-policy-padding">
                                                            <h3>Hoàn tiền 100%</h3>
                                                            <div className="section_policy_title">Nếu sản phẩm bị lỗi, hư hỏng</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="section_policy_content">
                                                    <a href="">
                                                        <img src="https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_4.png?1628514159582"
                                                            alt="" />
                                                        <div className="section-policy-padding">
                                                            <h3>Thanh toán</h3>
                                                            <div className="section_policy_title">Được bảo mật 100%</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <ProductYouLike setCart={setCart} />
                </div>
            </div>
        </>
    );
}

export default BodyQuan;
