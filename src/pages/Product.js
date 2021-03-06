import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '../assets/css/product.scss'
import '../components/oneclick/oneclick.scss'

import star from '../assets/img/star.svg'
import comment from '../assets/img/comment.svg'
import fav from '../assets/img/fav.svg'
import compare from '../assets/img/compare.svg'
import shipping from '../assets/img/shipping.svg'
import pay from '../assets/img/pay.svg'
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
    const [toggleReview,setToggleReview] = useState(false)
    const [toggleInfo,setToggleInfo] = useState(false)
    const [product,setProduct] = useState({
        img:[],
        title:'',
        review:[],
        atributes:[]
    })

    let {id} = useParams()
    useEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        axios.get(`http://localhost:3003/api/product/get/${id}`)
        .then(res=> {
            setProduct(res.data)
        })
    },[id])

    const sendReview = (e) =>{
        e.preventDefault()
        
        let reviewform = document.forms.reviewform

        let formData = new FormData(reviewform)
        let review = {}
        formData.forEach((value,name)=>{
            review[name] = value
        })
        review.product = id
        console.log(review)
        axios.create({withCredentials: true})
        .post('http://localhost:3003/api/product/review',review)
        .then(res => {
            console.log(res.data)
        })
    }

    const [desc, setDesc] = useState('description')
    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="row">
                <div className="col-5 col-md-12">
                    <div className="product__slider">
                    <Splide hasTrack={false} className="product__mainslider" options={ {
                        arrows:false,
                        autoplay:true,
                        type:'loop',
                    } }>
                        {product.img.map((photo,index)=>(
                            <SplideSlide key={index} style={{
                                backgroundImage: 'url(http://localhost:3003/'+photo+')'
                                }}>
                            </SplideSlide>
                        ))}

                    </Splide>
                    </div>
                </div>
                <div className="col-7 col-md-12">
                    <div className="btitle">{product.title}</div>
                    <div className="product__info">
                        <div className="product__row justify-content-between">
                            <div className="product__info--left">
                                <div className="card__review">
                                    <img src={star} />
                                    <img src={star} />
                                    <img src={star} />
                                    <img src={star} />
                                    <img src={star} />
                                    <span className="card__comments">
                                        <img src={comment}/> ({product.review.length})
                                    </span>
                                </div>
                                <div className="product__price">
                                    {product.sale>0?(
                                        <>
                                        <div className="product__price--row">
                                            <div className="card__oldprice">{product.price} ???</div>
                                                <div className="card__sale">
                                                    <span className="card__percent">{product.sale}%</span>
                                                    <span className="card__econom">?????{product.price-product.price*(100-product.sale)/100}?????</span>
                                            </div>
                                        </div>
                                        <div className="product__newprice">{product.price*(100-product.sale)/100}?????</div>
                                        </>):(
                                            <div className="product__newprice">{product.price}?????</div>
                                        )}
                                        {/* <div className="card__oldprice">
                                            5400?????
                                        </div>
                                        <div className="card__sale">
                                            <span className="card__percent">20%</span>
                                            <span className="card__econom">?????1??000?????</span>
                                        </div> */}
                                    
                                    {/* <div className="product__newprice">4990?????</div> */}
                                </div>
                            </div>
                            <div className="product__info--right">
                                <div className="card__btns">
                                    <button className="btn little"><img src={fav}/></button>
                                    <button className="btn little"><img src={compare}/></button>
                                </div>
                                <div className="card__bottom">
                                    <button className="btn">
                                        ??????????????????
                                    </button>
                                    <button className="btn outline">
                                    ???????????? ????1 ????????
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product__delivery">
                        <div className="product__delivery--item">
                            <img src={shipping} alt="" />
                            <div className="product__delivery--info">
                                <div className="product__delivery--title">????????????????</div>
                                <div className="product__delivery--text">???????????????? ????????????????-???????????????????? ?????????????????? 2???????????? ??????????????????????. ?????????????????? ???????????????? ???????????????? ???????????? ?????????????????? ??????????????????????.</div>
                            </div>
                        </div>
                        <div className="product__delivery--item">
                            <img src={pay} alt="" />
                            <div className="product__delivery--info">
                                <div className="product__delivery--title">????????????</div>
                                <div className="product__delivery--text">?????????????????? ???????????????? ????????????????????????, ?????????????????????????????????? ????????????. ???????????????? ???????????? ???????????????????????? ????????????????????.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="desc">
                <div className="desc__nav">
                    <button onClick={()=>{setDesc('description')}} className={desc=='description'?'active':''}>????????????????</button>
                    <button onClick={()=>{setDesc('xarak')}} className={desc=='xarak'?'active':''}>????????????????????????????</button>
                    <button onClick={()=>{setDesc('review')}} className={desc=='review'?'active':''}>???????????? ({product.review.length})</button>
                </div>
                <div className="row">
                    <div className="col-9 col-md-12">
                        <div className="desc__content">
                            <div className={desc=='description'?'active desc__item':'desc__item'} dangerouslySetInnerHTML={{ __html: product.text }}>
                                
                            </div>
                            <div className={desc=='xarak'?'active desc__item':'desc__item'}>
                                <h5 className="desc__title">
                                ???????????????????????????? ?????????????????????? Smart Balance Well 6.5
                                </h5>
                                <table>
                                    <tbody>
                                        {product.atributes.map(atr =>{
                                            if(atr.value){
                                                return (
                                                    <tr key={atr.atribut._id}>
                                                    <td>{atr.atribut.title}</td>
                                                    <td>{atr.value}</td>
                                                </tr>
                                                )    
                                                
                                            } 
                                                
                                            
                                            
                                        })}
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={desc=='review'?'active desc__item':'desc__item'}>
                    <h5>???????????? ?????????????????????????? Smart Balance Well 6.5</h5>
                    <div className="row">
                        <div className="col-6 col-md-12">
                        <div className="desc__reviews">
                            {product.review.map(review => (
                                <div className="desc__review">
                                    <div className="desc__review--top">
                                        <div className="desc__review--avatar">
                                            {review.name[0].toUpperCase()}
                                        </div>
                                        <div className="desc__review--name">{review.name}</div>
                                        <span>{review.createdAt}</span>
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <span>({review.mark}????????5)</span>
                                    </div>
                                    <div className="desc__review--text">
                                        <b>{review.title}</b>
                                        <p>{review.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                        
                        <div className="offset-col-1 col-5 col-md-12">
                            <b>???????????????? ???????? ???????????? ????????????????</b>
                            <p>???????????????? ?????????? ???????????? ?????????????????????? ??????????</p>
                            <button className="btn desc__btn" onClick={()=>{setToggleReview(true)}}>???????????????? ??????????</button>
                        </div>
                    </div>
                </div>
            
            </div>
            <div className={`rmodal ${toggleReview?'show':''}`}>
                <div className="rmodal__box">
                    <div className="rmodal__title">???????????????? ???????? ???????????? ????????????????
                        <button className="rmodal__close" onClick={()=>{setToggleReview(false)}}></button>
                    </div>
                    <form onSubmit={(event)=>sendReview(event)}
                        name='reviewform'
                        className="rmodal__form"
                    >
                        <div className="rmodal__inp">
                            <label>???????????????? ???????? ??????</label>
                            <input type="text" name="name"/>
                        </div>
                        <div className="rmodal__inp">
                            <label>?????????????????? ???????? ????????????</label>
                            <select name="mark" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="rmodal__inp">
                            <label>?????????????????? ????????????</label>
                            <input type="text" name="title"/>
                        </div>
                        <div className="rmodal__inp">
                            <label>?????????? ????????????</label>
                            <textarea name="text" placeholder=""></textarea>
                        </div>
                        {toggleInfo?(<div className="rmodal__info">
                            ?????? ?????????? ?????????????? ????????????????????!
                        </div>):''}
                        
                        <button type="submit" className="btn">??????????????????</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Product