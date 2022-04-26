import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import star from '../../assets/img/star.svg'
import comment from '../../assets/img/comment.svg'
import fav from '../../assets/img/fav.svg'
import compare from '../../assets/img/compare.svg'
import cart from '../../assets/img/cart.svg'
// import img from '../../assets/img/product.jpg'
import './item.scss'
import { useCookies } from "react-cookie";

const Item = ({product,showOneClick}) =>{

    const [cookies, setCookie] = useCookies(['favs','carts'])
    const [toggle, setToggle] = useState(false)
    const [toggle1,setToggle1] = useState(false)

    const addCart = () => {
        let carts =  []
        if (cookies.carts){
            carts = cookies.carts
        }
        let index1 = carts.findIndex(cart => cart == product._id)
        if(index1 == -1){
            carts.push(product._id)
            setToggle1(true)
        }
        // } else {
        //     carts.splice(index1,1)
        //     setToggle1(false)
        // }
        setCookie('carts',carts)
        console.log(carts)
    }

    const addFav = () => {
        let favs = []
        if (cookies.favs){
            favs = cookies.favs
        }
        let index = favs.findIndex(fav => fav == product._id)
        if (index == -1){
            favs.push(product._id)
            setToggle(true)
        } else {
            favs.splice(index,1)
            setToggle(false)
        }
        setCookie('favs',favs)
        console.log(favs)
    }

    useEffect(()=> {
        let favs = []
        if (cookies.favs){
            favs = cookies.favs
        }
        let index = favs.findIndex(fav => fav == product._id)
        if (index == -1){
            setToggle(false)
        } else {
            setToggle(true)
        }
        let carts =  []
        if (cookies.carts){
            carts = cookies.carts
        }
        let index1 = carts.findIndex(cart => cart == product._id)
        if(index1 == -1){
            setToggle1(false)
        } else {
            setToggle1(true)    
        }
    },[cookies])
    
    return (
        <div className={`card ${product._id}`}>
            <div className="card__img">
                <div className="card__badge">
                    {product.news?(<span className="badge badge-success">Новинка</span>):''}
                    {product.top?(<span className="badge badge-danger">Хит продаж</span>):''}
                </div>
                <img src={`http://localhost:3003/${product.img[0]}`} alt="" />
            </div>
            <div className="card__category">{product.category.title}</div>
            <Link to={`/product/${product._id}`} className="card__title">{product.title}</Link>
            <div className="card__review">
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <span className="card__comments">
                    <img src={comment}/> (12)
                </span>
            </div>
            <div className="card__row mb-2">
                <div className="card__val">
                    {product.sale>0?(<><div className="card__oldprice">{product.price} ₽</div>
                    <div className="card__newprice">{product.price*(100-product.sale)/100} ₽</div>
                    <div className="card__sale">
                        <span className="card__percent">{product.sale}%</span>
                        <span className="card__econom">— {product.price-product.price*(100-product.sale)/100} ₽</span>
                    </div></>):(
                    <div className="card__newprice">{product.price} ₽</div>
                    )}
                </div>
                <div className="card__btns">
                    <button  
                        className={toggle?"btn little added":"btn little"}
                        onClick={addFav}
                    ><img src={fav}/></button>
                    <button 
                        className="btn little"
                    ><img src={compare}/></button>
                </div>
            </div>
            <div className="card__bottom">
                <button className="btn outline" onClick={()=>{
                    showOneClick(product._id)
                }}>
                Купить в 1 клик
                </button>
                <button className={toggle1?"btn aded":"btn"}
                    onClick={addCart}
                ><img src={cart}/></button>
            </div>
        </div>
    )
}

export default Item