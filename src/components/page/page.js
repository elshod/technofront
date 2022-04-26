import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './page.scss'
import Feedback from "../feedback";
const PageView = () => {
    const [page,setPage] = useState({})
    let {slug} = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:3003/api/page/slug/${slug}`)
        .then(res => {
            if (res.data !=='error'){
                setPage(res.data)
            }
        })
    },[slug])
    const [info,setInfo] = useState(false)
    const sendFeed = (event) =>{
        event.preventDefault()
        let form = document.forms.feed
        let data = {}
        let formData = new FormData(form)
        formData.forEach((value,name)=>{
            data[name] = value
        })
        data.type = 1
        form.reset()
        axios.post('http://localhost:3003/api/feedback',data)
        .then(res => {
            if (res.data == 'ok'){
                setInfo(true)
            }
        })
    }
    return (
            <div className="container">
                <div className="btitle mb-3">{page.title}</div>
                <div className="row">
                    <div className="col-9 col-md-12">
                        <div dangerouslySetInnerHTML={{__html: page.text}}>

                        </div>
                        {page.feedback == 1 ? (<div className="credit">
                            <form className="credit__form" name="feed" onSubmit={(event)=>{ sendFeed(event) }}>
                                <h5>Оформить РАССРОЧКУ</h5>
                                {info?(<div className="feed__info">Ваша заявка отправлено!</div>):''}
                                <label>
                                    Имя
                                    <input type='text' name="name"/>
                                </label>
                                <label>
                                    Номер телефона
                                    <input type='text' name="phone"/>
                                </label>
                                <button type='submit'>Отправить</button>
                            </form>
                            <div className="credit__info">
                                <h5>Мобильное приложение <br/>«Совкомбанк – Халва»</h5>
                                <p>Мобильный банковский офис, который всегда с вами:
                                    <ul className="circle">
                                        <li>контроль вашей карты «Халва»</li>
                                        <li>наиболее востребованные банковские функции</li>
                                        <li>круглосуточный чат с поддержкой</li>
                                    </ul>
                                </p>
                            </div>
                        </div>): page.feedback == 2 ? (<Feedback title='Заполните форму и мы свяжемся с вами'/>):''}
                    </div>
                </div>
            </div>
    )
}

export default PageView