import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "../components/breadcrumbs";
import '../assets/css/fav.scss'
import Menu from "../components/user/menu";
import axios from 'axios'
import Item from "../components/products/item";

const Fav = () => {

    const [cookies, setCookie] = useCookies(['favs'])
    const [products, setProducts] = useState([])

    useEffect(()=>{
        let favs = []
        if(cookies.favs){
            favs = cookies.favs
            axios.post('http://localhost:3003/api/products/byid',{favs})
            .then(res => {
                setProducts(res.data)
            })
        }
    },[cookies])


    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="btitle mb-3">Избранное</div>
            <div className="row">
                <div className="col-3 col-md-12">
                    <Menu/>
                    <div className="authbox">
                        <div className="authbox__title">Войдите или зарегистрируйтесь</div>
                        <Link to='/'>Войти</Link>
                    </div>
                </div>
                <div className="col-9 col-md-12">
                    <div className="row justify-content-between mb-2">
                        <select className="select">
                            <option>Все товары</option>
                        </select>
                        <select className="select">
                            <option>Сначала дорогие</option>
                        </select>
                    </div>
                    <div className="row col3">
                        {products.map(product => {
                            return (
                                <Item product={product}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fav