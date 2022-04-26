import React from "react";
import Breadcrumbs from "../components/breadcrumbs";
import Item from "../components/products/item";
import '../assets/css/fav.scss'

const Seen = () => {
    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="btitle mb-3">Просмотренные товары</div>
            <div className="row justify-content-between mb-2">
                <select className="select">
                    <option>Все товары</option>
                </select>
                <select className="select">
                    <option>Сначала дорогие</option>
                </select>
            </div>
            <div className="row">
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </div>
        </div>
    )
}

export default Seen