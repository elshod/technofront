import React from "react";
import { NavLink } from "react-router-dom";
import './oneclick.scss'
const OneClick = ({id,toggle}) => {

    const sendOneClick = (e) =>{
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

    return (
        <div className={`rmodal ${toggle?'show':''}`}>
                <div className="rmodal__box">
                    <div className="rmodal__title">Купить в один клик
                        <button className="rmodal__close" onClick={()=>{}}></button>
                    </div>
                    <form onSubmit={(event)=>sendOneClick(event)}
                        name='oneClickform'
                        className="rmodal__form"
                    >
                        <div className="rmodal__inp">
                            <label>Номер телефона</label>
                            <input type="text" name="phone"/>
                        </div>
                        <div className="rmodal__check">
                            <input type="checkbox" id="agree"/>
                            <label htmlFor="agree">
                                Согласен с условиями
                            </label>
                        </div>
                        <NavLink to='/'>Правил пользования торговой площадки и правилами возврата</NavLink>
                        {toggleInfo?(<div className="rmodal__info">
                            Ваш отзыв успешно отправлено!
                        </div>):''}
                        
                        <button type="submit" className="btn">Оформить заказ</button>
                    </form>
                </div>
            </div>
    )
}

export default OneClick