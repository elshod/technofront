import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "../components/home/slider";
import CardList from "../components/news/card-list";
import Products from "../components/products/products";
import Promo from "../components/promo";

const Home = () => {
    const [newProducts, setNewProducts] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [fpromo, setFpromo] = useState([])
    const [spromo, setSpromo] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3003/api/promo/skip/0')
        .then(res => {
            setFpromo(res.data)
        })
        axios.get('http://localhost:3003/api/promo/skip/1')
        .then(res => {
            setSpromo(res.data)
        })
        axios.get('http://localhost:3003/api/newproduct')
        .then(res => {
            setNewProducts(res.data)
        })
        axios.get('http://localhost:3003/api/topproduct')
        .then(res => {
            console.log(res.data)
            if (res.data){
                res.data = res.data.map(product => {
                    // product.img = product.img[0]
                    return product
                })
            }
            setTopProducts(res.data)
        })
    },[])
    return (
        <>
            <div className="container mb-4">
                <Slider/>
            </div>
            <Products title='Хиты продаж' link='/products/top' products={topProducts}/>
            <Products title='Новинки' link='/products/new' products={newProducts}/>
            <div className="container">
                <div className="row mb-8">
                    {fpromo.map(promo => (
                        <div className="col-6 col-md-12 mb-2" key={promo._id}>
                            <Promo promo={promo}/>
                        </div>

                    ))}
                    
                </div>
            </div>
            <CardList/>
        </>
    )
}

export default Home