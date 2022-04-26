import React from "react";
import { Link } from "react-router-dom";
import './index.scss'

const Breadcrumbs = () => {
    return (
        <ul className="breadcrumbs">
            <li><Link to='/'>Главная</Link></li>
            <li><Link to='/'>Новости</Link></li>
        </ul>
    )
}

export default Breadcrumbs