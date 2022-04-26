import React from "react";
import { Link } from "react-router-dom";
import right from '../../assets/img/right.svg'

const CardNews = ({news}) => {
    return (
        <div className={"newsbox " + (news.img ? 'img' : '')}>
            <div className="newsbox__img" style={{backgroundImage:`url('http://localhost:3003/${news.img}')`}}>
            </div>
            <div className="newsbox__item">
                <Link to={`/news/${news._id}`} className="newsbox__title">{news.title}</Link>
                <div className="newsbox__text">{news.description}</div>
                <div className="d-flex align-items-center justify-content-between newsbox__bottom">
                    <Link to={`/news/${news._id}`} className="products__more">
                    Подробнее
                        <img src={right}/>
                    </Link>
                    <div className="newsbox__date">{news.createdAt}</div>
                </div>
            </div>
        </div>
    )
}

export default CardNews