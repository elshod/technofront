import React from "react";
import './page.scss'
import email from '../../assets/img/email.svg'
import clock from '../../assets/img/clock.svg'
import Feedback from "../feedback";

const Contact = () => {
    return (
        <div className="container">
            <div className="btitle mb-3">Контакты</div>
            <div className="row">
                <div className="col-4 col-md-6 col-sm-12 sm-order-2">
                    <div className="contact__list">
                        <div className="contact__item">
                            <div className="contact__address">СПб, Ул. Дыбенко д.23 к.1</div>
                            <a href="tel:+78125092343" className="contact__phone">+7 (812) 509-23-43</a>
                        </div>
                        <div className="contact__item">
                            <div className="contact__address">СПб, Ул. Дыбенко д.23 к.1</div>
                            <a href="tel:+78125092343" className="contact__phone">+7 (812) 509-23-43</a>
                        </div>
                        <div className="contact__item">
                            <div className="contact__address">СПб, Ул. Дыбенко д.23 к.1</div>
                            <a href="tel:+78125092343" className="contact__phone">+7 (812) 509-23-43</a>
                        </div>
                        <div className="contact__item">
                            <div className="contact__address">СПб, Ул. Дыбенко д.23 к.1</div>
                            <a href="tel:+78125092343" className="contact__phone">+7 (812) 509-23-43</a>
                        </div>
                        <div className="contact__body">
                            <div className="contact__email">
                                <img src={email} />
                                smart-tekhnika@gmail.com
                            </div>
                            <div className="contact__worktime">
                                <img src={clock}/>
                                <div>
                                    <div className="contact__worktime--top">Режим работы</div>
                                    <div className="contact__worktime--bottom">Пн-вс с 10:00 до 21:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-md-6 col-sm-12 sm-order-1">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.2441986587987!2d69.2918634156883!3d41.3687789051108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef380777063a1%3A0xdcb14b7be3d8b30b!2s5f%20Group!5e0!3m2!1sru!2s!4v1647609320933!5m2!1sru!2s" width="860" height="512" style={{border:0}} className='map' allowFullScreen="" loading="lazy"></iframe>
                </div>
            </div>
            <Feedback title='Связаться с нами'/>
        </div>
    )
}

export default Contact
