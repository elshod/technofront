import React, { useState } from "react";
import { Link } from "react-router-dom";
import right from '../../assets/img/right.svg'
import Item from "./item";
import Oneclick from "./oneclick";
const Products = ({title,link,products}) => {
    const [toggle,setToggle] = useState(false)
    const [oneid,setOneId] = useState('')

    const showOneClick = (id) => {
        setToggle(true)
        setOneId(id)
    }
    



    return (
        <>
            <div className="products mb-4">
                <div className="container">
                    <div className="d-flex align-items-center mb-4">
                        <div className="btitle">{title}</div>
                        <Link to={link} className="products__more">
                            Все товары
                            <img src={right}/>
                        </Link>
                    </div>
                    <div className="d-flex">
                        {products.map(product=>(
                            <Item 
                                key={product._id} 
                                product={product}
                                showOneClick={(id)=>{showOneClick(id)}}
                            />
                        ))}
                    </div>    
                </div>
            </div>
            {toggle?(<Oneclick id={oneid} toggle={toggle} changeToggle={()=>{ setToggle(false) }}/>):''}
            
        </>
    )
}

export default Products