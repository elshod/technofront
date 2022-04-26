import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import InputRange from "react-input-range";
// https://www.npmjs.com/package/react-input-range
import 'react-input-range/lib/css/index.css'
import '../assets/css/filtr.scss'
import Item from "../components/products/item";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
    const [products,setProducts] = useState([])
    const [filtr, setFiltr] = useState({
        light:0,
        speed:0
    })
    const [price, setPrice] = useState({
        min:0,
        max:100
    })
    let {id} = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:3003/api/category/products/${id}`)
        .then(res => {
            if (res.data == 'error'){

            } else {
                setProducts(res.data)
            }
        })
    },[id])
    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="btitle mb-4">Каталог</div>
            <div className="row">
                <div className="col-3 col-md-12">
                    <div className="filtr">
                        <div className="filtr__item">
                            <div className="filtr__title" onClick={(event)=>{ event.target.classList.toggle('show') }}>Цена, ₽</div>
                            <div className="filtr__body">
                                <div className="filtr__price">
                                    <div className="filtr__price--item">
                                        от <input  placeholder="3700" onInput={(event)=>{ 
                                            setPrice({min:event.target.value}) 
                                            }} value={price.min}/>
                                    </div>
                                    <div className="filtr__price--item">
                                    до <input  placeholder="13700" onInput={(event)=>{ 
                                            setPrice({max:event.target.value}) 
                                            }} value={price.max}/>
                                    </div>
                                </div>
                                <div className="filtr__price--range">
                                <InputRange
                                    maxValue={1000}
                                    minValue={0}
                                    value={price}
                                    onChange={value => setPrice(value)} />
                                </div>
                            </div>
                        </div>
                        <div className="filtr__item">
                            <div className="filtr__title" onClick={(event)=>{ event.target.classList.toggle('show') }}>
                                Подсветка
                                <img src={require('../assets/img/arrow_down.png')}/>
                            </div>
                            <div className="filtr__body">
                                <div className="filtr__radio">
                                    <input type='checkbox' id="ch1"/>
                                    <label htmlFor='ch1'>
                                        Есть <span>(78)</span>
                                    </label>
                                </div>
                                <div className="filtr__radio">
                                    <input type='checkbox' id="ch2"/>
                                    <label htmlFor='ch2'>
                                        Нет <span>(78)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-9 col-md-12">
                    <div className="row col3">
                        {products.map(product=>(
                            <Item key={product._id} product={product}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category