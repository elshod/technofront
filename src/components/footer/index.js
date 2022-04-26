import React from "react";
import { NavLink } from "react-router-dom";
import './index.scss'
import logo from '../../assets/img/logo.svg'
const Footer = () => {
    const social = [
        {
            icon: 'facebook.svg',
            link: ''
        },
        {
            icon: 'instagram.svg',
            link: ''
        },
    ]
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-3 col-md-6 mb-6 col-sm-12">
                        <img src={logo} className="footer__logo"/>
                        <a href="#" className="footer__phone">+7 (958) 111-95-03</a>
                        <a href="#" className="footer__phone">+7 (958) 111-95-03</a>
                        <div className="footer__worktime">Пн-вс: с 10:00 до 21:00</div>
                        <ul className="footer__address">
                            <li>Проспект Стачек 67 к.5</li>
                            <li>Лиговский проспект 205</li>
                            <li>Гражданский проспект, 116 к.5</li>
                        </ul>
                    </div>
                    <div className="col-3 col-md-6 mb-6 col-sm-12">
                        <div className="footer__title">Для клиента</div>
                        <ul className="footer__menu">
                        <li><NavLink to='/'>Как купить</NavLink></li>
                        <li><NavLink to='/'>Доставка и оплата</NavLink></li>
                        <li><NavLink to='/'>Кредит</NavLink></li>
                        <li><NavLink to='/'>Политика конфиденциальности</NavLink></li>
                        <li><NavLink to='/'>Вопросы и ответы (F.A.Q.)</NavLink></li>
                        <li><NavLink to='/'>Сервис и гарантия</NavLink></li>
                        </ul>
                    </div>
                    <div className="col-3 col-md-6 mb-6 col-sm-12">
                    <div className="footer__title">Для клиента</div>
                        <ul className="footer__menu">
                        <li><NavLink to='/'>Как купить</NavLink></li>
                        <li><NavLink to='/'>Доставка и оплата</NavLink></li>
                        <li><NavLink to='/'>Кредит</NavLink></li>
                        <li><NavLink to='/'>Политика конфиденциальности</NavLink></li>
                        <li><NavLink to='/'>Вопросы и ответы (F.A.Q.)</NavLink></li>
                        <li><NavLink to='/'>Сервис и гарантия</NavLink></li>
                        </ul>
                    </div>
                    <div className="col-3 col-md-6 mb-6 col-sm-12">
                    <div className="footer__title">Для клиента</div>
                        <ul className="footer__menu">
                        <li><NavLink to='/'>Как купить</NavLink></li>
                        <li><NavLink to='/'>Доставка и оплата</NavLink></li>
                        <li><NavLink to='/'>Кредит</NavLink></li>
                        <li><NavLink to='/'>Политика конфиденциальности</NavLink></li>
                        <li><NavLink to='/'>Вопросы и ответы (F.A.Q.)</NavLink></li>
                        <li><NavLink to='/vakansi'>Вакансии</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="footer__copy">SmartТехника © 2021 Все права защищены
                    <a href="#" className="footer__author show-mobile">Разработка: websl.ru</a>
                    </div>
                    <ul className="footer__social">
                    {social.map((item,index) => (
                        <li key={index}>
                            <NavLink to={item.link}>
                                <img src={require('../../assets/img/'+item.icon)}/>
                            </NavLink>
                        </li>
                    ))}
                    </ul>
                    <a href="#" className="footer__author hide-mobile">Разработка: websl.ru</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer