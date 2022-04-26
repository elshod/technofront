import axios from "axios";
import React, { useState } from "react";
import './index.scss'
const Feedback = ({title}) => {
    const [info,setInfo] = useState(false)
    const sendFeed = (event) =>{
        event.preventDefault()
        let form = document.forms.feed
        let data = {}
        let formData = new FormData(form)
        formData.forEach((value,name)=>{
            data[name] = value
        })
        form.reset()
        axios.post('http://localhost:3003/api/feedback',data)
        .then(res => {
            if (res.data == 'ok'){
                setInfo(true)
            }
        })
    }
    return (
        <div className="feed">
            <div className="btitle">{title}</div>
            {info?(
                <div className="feed__info">Ваша заявка отправлено!</div>
            ):''}
            <form className="feed__form" name="feed" onSubmit={(event)=>{ sendFeed(event) }}>
                <div className="row">
                    <div className="col-3 col-md-6 col-sm-12">
                        <label> 
                            Имя
                            <input placeholder="Введите имя" name='name'/>
                        </label>
                        <label> 
                        Телефон
                            <input placeholder="Введите номер телефон" name="phone"/>
                        </label>
                        
                    </div>
                    <div className="col-5 col-md-6 col-sm-12">
                        <label>
                            Сообщение
                            <textarea className="feed__text" name="text" placeholder="Введите сообщение"></textarea>
                        </label>
                        
                    </div>
                    <div className="col-4 col-md-12 col-sm-12"></div>
                    <div className="col-3 col-md-6 col-sm-12 sm-order-2">
                        <button type="submit" className="feed__submit">Отправить</button>
                    </div>
                    <div className="col-5 col-md-6 col-sm-12 sm-order-1">
                        <div className="filtr__radio">
                            <input type='checkbox' id="agree"/>
                            <label htmlFor='agree'>
                                Отправляя данную форму вы соглашаетесь с политикой конфиденциальности
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Feedback