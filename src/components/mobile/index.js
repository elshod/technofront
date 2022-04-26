import React, { useState } from "react";
import home from '../../assets/img/m-home.svg'
import catalog from '../../assets/img/m-catalog.svg'
import cart from '../../assets/img/m-cart.svg'
import search from '../../assets/img/m-search.svg'
import more from '../../assets/img/m-more.svg'
import { Link, NavLink } from "react-router-dom";
import './index.scss'
import fav from '../../assets/img/favred.svg'
import eye from '../../assets/img/eye.svg'
import compare from '../../assets/img/compare.svg'
const Mobile = () => {
    const list = [
        {
            icon: 'cat1.svg',
            title: 'Гироскутеры',
            link: ''
        },
        {
            icon: 'cat2.svg',
            title: 'Электросамокаты',
            link: ''
        },
        {
            icon: 'cat1.svg',
            title: 'Гироскутеры',
            link: ''
        },
        {
            icon: 'cat2.svg',
            title: 'Электросамокаты',
            link: ''
        },
        {
            icon: 'cat1.svg',
            title: 'Гироскутеры',
            link: ''
        },
        {
            icon: 'cat2.svg',
            title: 'Электросамокаты',
            link: ''
        },
    ]

    const [catalogToggle,setCatalogToggle] = useState(false)
    const [searchToggle,setSearchToggle] = useState(false)
    const [moreToggle,setMoreToggle] = useState(false)

    return (
        <div className="show-mobile">
            <div className="mobile">
                <NavLink to='/' className='mobile__link'>
                    <img src={home} />
                    Главная
                </NavLink>
                <button className="mobile__link" onClick={()=>{
                    setCatalogToggle(!catalogToggle)
                    setSearchToggle(false)
                    setMoreToggle(false)
                    }}>
                    <img src={catalog}/>
                    Каталог
                </button>
                <NavLink to='/cart' className='mobile__link'>
                    <img src={cart} />
                    Корзина
                </NavLink>
                <button className="mobile__link" onClick={()=>{
                    setCatalogToggle(false)
                    setSearchToggle(!searchToggle)
                    setMoreToggle(false)
                }}>
                    <img src={search}/>
                    Поиск
                </button>
                <button className="mobile__link" onClick={()=>{
                    setCatalogToggle(false)
                    setSearchToggle(false)
                    setMoreToggle(!moreToggle)
                }}>
                    <img src={more}/>
                    Ещё
                </button>
            </div>
            <div className={"modal " + (catalogToggle ? 'show' : '')}>
                <div className="modal__box">
                    <div className="modal__title mb-2">
                        Каталог
                        <button className="modal__close" onClick={()=>{
                            setCatalogToggle(!catalogToggle)
                            setSearchToggle(false)
                            setMoreToggle(false)
                        }}></button>
                    </div>
                    <div className="modal__body">
                        <ul className="modal__catalog">
                            {list.map((item,index) => (
                                <li key={index}>
                                    <NavLink to={item.link}>
                                        <img src={require('../../assets/img/'+item.icon)}/>
                                        {item.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"modal " + (searchToggle ? 'show' : '')}>
                <div className="modal__box">
                    <div className="modal__title mb-2">
                        Поиск
                        <button className="modal__close" onClick={()=>{
                            setCatalogToggle(false)
                            setSearchToggle(!searchToggle)
                            setMoreToggle(false)
                        }}></button>
                    </div>
                    <div className="modal__body">
                        <form className="modal__search">
                            <input placeholder="Введите запрос, например «Smart balance»"/>
                        </form>
                    </div>
                </div>
            </div>
            <div className={"modal " + (moreToggle ? 'show' : '')}>
                <div className="modal__box">
                    <div className="modal__title mb-2">
                        Еще
                        <button className="modal__close" onClick={()=>{
                            setCatalogToggle(false)
                            setSearchToggle(false)
                            setMoreToggle(!moreToggle)
                        }}></button>
                    </div>
                    <div className="modal__body">
                        <div className="modal__btns">
                            <Link to='/' className="btn no">
                                <span className="count">13</span>
                                <img src={eye}/>
                            </Link>
                            <Link to='/' className="btn no">
                                <span className="count">13</span>
                                <img src={fav}/>
                            </Link>
                            <Link to='/' className="btn no">
                                <span className="count">13</span>
                                <img src={compare}/>
                            </Link>
                        </div>
                        <ul className="modal__more">
                            <li><Link to='/'>О компании</Link></li>
                            <li><Link to='/'>Акции</Link></li>
                            <li><Link to='/'>Рассрочка 0–0-12</Link></li>
                            <li><Link to='/'>Сервис и ремонт</Link></li>
                            <li><Link to='/'>Опт/дропшиппинг</Link></li>
                            <li><Link to='/'>Контакты</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mobile