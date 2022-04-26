import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';

import './index.scss'

import logo from '../../assets/img/logo.svg'
import search from '../../assets/img/search.svg'
import fav from '../../assets/img/fav.svg'
import eye from '../../assets/img/eye.svg'
import cart from '../../assets/img/cart.svg'
import compare from '../../assets/img/compare.svg'
import user from '../../assets/img/user.svg'

import product from '../../assets/img/product.jpg'

import Reg from "../auth/reg"
import Auth from "../auth/auth"
import axios from "axios";
const Header = () => {
    const [cookies, setCookie] = useCookies(['user','favs','carts'])
    const [regToggle,setRegToggle] = useState(false)
    const [authToggle,setAuthToggle] = useState(false)
    const [toggleProfile,setToggleProfile] = useState(false)
    const [userAuth,setUserAuth] = useState(false)
    const [toggleSearch,setToggleSearch] = useState(false)
    const [searchText,setSearchText] = useState('')
    const [resultList,setResultList] = useState([])
    const history = useNavigate()
    const clear = () => {
        let {user} = cookies
        axios.get(`http://localhost:3003/api/user/clear/${user._id}`)
        .then(res => {
            if (res.data=='ok'){
                setUserAuth(false)
                setToggleProfile(false)
                history('/')
            }
        })
    }


    const searching = () => {
        if (searchText.length>2){
            axios.get(`http://localhost:3003/api/search/${searchText}`)
            .then(res => {
                if (res.data.length>0 && res.data !=='error'){
                    setResultList(res.data)
                } else {
                    setResultList([])
                }
            })

        } else {
            console.log('kam')
        }
    }

    const checkToken = () => {
        if (cookies){
            let {user} = cookies
            axios.post('http://localhost:3003/api/user/checkuser',user)
            .then(res => {
                setUserAuth(res.data)
            })
        } else {
            setUserAuth(false)
        }
    }
    let favs = cookies.favs || []
    let carts = cookies.carts || []

    useEffect(()=>{
        checkToken()

    },[])

    return (
        <>
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-3 col-sm-6">
                        <Link to='/' className="header__logo">
                            <img src={logo}/>
                        </Link>
                    </div>
                    <div className="col-9 col-sm-6 d-flex align-items-center pos">
                        <div className="header__contact">
                            <a href="tel:+78126605054">+7 (812) 660-50-54</a>
                            <a href="tel:+78126605054">+7 (958) 111-95-03</a>
                            <div className="header__worktime">Пн-вс: с 10:00 до 21:00</div>
                        </div>
                        <form className="header__search" onClick={()=>{ setToggleSearch(true) }}>
                            <button><img src={search}/></button>
                            <input placeholder="Поиск" type='text'/>
                        </form>
                        <Link to='/seen' className="btn no">
                        <img src={eye}/>
                        </Link>
                        <Link to='/fav' className="btn no before " data-count={favs.length}>
                        <img src={fav}/>
                        </Link>
                        <Link to='/compare' className="btn no">
                        <img src={compare}/>
                        </Link>
                        <Link to='/cart' className="btn no cart before" data-count={carts.length}>
                        <img src={cart}/>
                        </Link>
                        {userAuth?(
                            <>
                            <button onClick={()=>{setToggleProfile(!toggleProfile)}} className="btn no user">
                            <img src={user} alt="" />
                            </button>
                            <ul className={toggleProfile?'header__profile show':'header__profile'}>
                                <li><Link to='/user/information'>Общие сведения</Link></li>
                                <li><Link to='/user/private'>Личные данные</Link></li>
                                <li><Link to='/user/history'>История покупок</Link></li>
                                <li><Link to='/user/favourite'>Избранное</Link></li>
                                <li><Link to='/user/pass'>Сменить пароль</Link></li>
                                <li><Link to='/user/logout' onClick={(e)=>{
                                    e.preventDefault()
                                    clear()
                                    

                                }}>Выйти</Link></li>
                            </ul>
                            </>
                        ):(
                            <button className="btn auth" onClick={()=>{setAuthToggle(true)}}>Войти</button>
                        )}
                        
                    </div>
                </div>
            </div>
        </header>
        {toggleSearch?(
            <div className="searchbox" onClick={(event)=>{ 
                if (event.target == document.querySelector('.searchbox')){
                    setToggleSearch(false)
                } 
            }}>
                <div className="searchbox__modal">
                    <div className="container">
                        <input type="text" 
                            onInput={(event)=> { 
                                setSearchText(event.target.value)
                                searching() 
                            }}
                            placeholder='Введите запрос, например «Smart balance»'
                            value={searchText}
                            />
                        <button onClick={()=>{
                            setSearchText('')
                            setResultList([])
                        }}></button>
                    </div>
                </div>
                <div className="searchbox__result">
                    <div className="container">
                        <ul>
                            {resultList.map(item => (
                                <li key={item._id}>
                                    <span className="searchbox__item"
                                    onClick={()=>{ 
                                        setSearchText('')
                                        setResultList([])
                                        setToggleSearch(false)
                                        history(`/product/${item._id}`)
                                    }}
                                    >
                                        <span style={{
                                            backgroundImage: `url(http://localhost:3003/uploads/${item.img})`
                                        }}
                                        
                                        className="searchbox__img"
                                        ></span>
                                        <span className="searchbox__title">{item.title}</span>
                                        <span className="searchbox__price">
                                            <div className="old">{item.sale>0?item.price:''}</div>
                                            <div className="new">{item.sale>0?item.price*(100-item.sale)/100:item.price}</div>
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        ):''}
            <Reg toggle={regToggle} 
                setRegToggle={()=>{
                    setRegToggle(false)
                }}
                setAuthToggle={()=>{
                    setAuthToggle(true)
                }}
            />
            <Auth toggle={authToggle} 
                changeUserAuth={(b)=>{
                    setUserAuth(b)
                }}
                setRegToggle={()=>{
                    setRegToggle(true)
                }}
                setAuthToggle={()=>{
                    setAuthToggle(false)
                }}/>
        </>
    )
}

export default Header