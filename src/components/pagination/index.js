import React from "react";
import { NavLink } from "react-router-dom";

import leftPag from '../../assets/img/left_pag.svg'
import rightPag from '../../assets/img/right_pag.svg'

import './index.scss'

const Pagination = () => {
    return (
        <ul className="pagination">
            <li>
                <NavLink to='/'><img src={leftPag}/></NavLink>
            </li>
            <li><NavLink to='/'>1</NavLink></li>
            <li><NavLink to='/'>2</NavLink></li>
            <li><NavLink to='/'>3</NavLink></li>
            <li><NavLink to='/'>...</NavLink></li>
            <li><NavLink to='/'>245</NavLink></li>
            <li><NavLink to='/'><img src={rightPag}/></NavLink></li>
        </ul>
    )
}

export default Pagination