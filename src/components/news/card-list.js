import React, { useEffect, useState } from "react";
import CardNews from "./card";
import { Link } from "react-router-dom";
import right from '../../assets/img/right.svg'
import './index.scss'
import axios from "axios";
const CardList = () => {
    const [list,setList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3003/api/blog/home')
        .then(res => {
            setList(res.data)
        })
    },[])
    return (
        <div className="products">
            <div className="container">
                <div className="d-flex align-items-center mb-4">
                    <div className="btitle">Новости</div>
                    <Link to='/news' className="products__more">
                        Читать все
                        <img src={right}/>
                    </Link>
                </div>
                <div className="row">
                    {list.map((item,index)=>(
                        <div className="col-6 col-md-12 mb-2" key={index}>
                            <CardNews news={item}/>
                        </div>
                    ))}
                </div>    
            </div>

        </div>
    )
}

export default CardList