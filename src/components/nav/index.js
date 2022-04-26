import React, { useEffect, useState } from "react";
import './index.scss'
import { NavLink } from "react-router-dom";
import navcat from '../../assets/img/menu.svg'
import axios from "axios";
const Nav = () => {
    const [list,setList] = useState([])
    const [catToggle,setCatToggle] = useState(false)
    const [pages,setPages] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3003/api/page/all')
        .then(res => {
            if (res.data !=='error'){
                setPages(res.data)
            }
        })
        axios.get('http://localhost:3003/api/category/getall')
        .then(res => setList(res.data))
        .catch(err => console.error(err))
    },[])

    return (
        <nav className="nav">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button className="nav__cat" onClick={()=>{setCatToggle(!catToggle)}}>
                            <img src={navcat} alt='123'/> Каталог товаров
                        </button>
                    </div>
                    <div className="col-9 d-flex">
                        <ul className="nav__menu">
                            <li>
                                <NavLink to='/about'>О компании</NavLink>
                                <NavLink to='/promo'>Акции</NavLink>
                                {pages.map(page => (
                                    <NavLink key={page._id} to={`/${page.slug}`}>{page.title}</NavLink>
                                ))}
                                <NavLink to='/contact'>Контакты</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                
                
                <ul className={`nav__list ${catToggle?'show':''}`}>
                    {list.map(item => (
                        <li key={item._id}>
                            <NavLink to={`/category/${item._id}`}>
                                <img src={'http://localhost:3003/'+item.img}/>
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Nav