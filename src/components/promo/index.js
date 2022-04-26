import React from "react";
import { Link } from "react-router-dom";
import './index.scss'

const Promo = ({promo}) => {
    return (
        <Link to={`/promo/${promo._id}`} className="promo">
            <div className="promo__title">
                {promo.title}
            </div>
            <img src={`http://localhost:3003/${promo.img}`}/>
        </Link>
    )
}

export default Promo