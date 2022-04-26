import axios from "axios";
import React, { useState } from "react";

const Oneclick = ({toggle,id,changeToggle}) => {
    const [sendbtn,setSendBtn] = useState(false)
    const [info,setInfo] = useState(false)
    const sendOneClick = (e) =>{
        e.preventDefault()
        let oneform = document.forms.oneclickform
        let formData = new FormData(oneform)
        axios.post('http://localhost:3003/api/oneclick',formData)
        .then(res => {
            
            if (res.data == 'ok'){
                setInfo(true)
                oneform.reset()
            } else {
                setInfo(false)
            }
        })
    }

    return (
        <div className={`rmodal ${toggle?'show':''}`}>
                <div className="rmodal__box rmodal__sm">
                    <div className="rmodal__title">Купить в один клик
                        <button className="rmodal__close" onClick={()=>{
                            setInfo(false)
                            changeToggle(false)
                        }}></button>
                    </div>
                    {info?(
                        <div className="rmodal__info">
                            Ваша заявка принята <br />Ждите звонка!
                        </div>
                    ):(
                        <form onSubmit={(event)=>{
                            sendOneClick(event)
                        }}
                            name='oneclickform'
                            className="rmodal__form"
                        >
                            <div className="rmodal__inp">
                                <label>Номер телефона</label>
                                <input type="hidden" name="_id" value={id}/>
                                <input type="text" name="phone" onInput={(event)=>{
                                    if (event.target.value.length>=9){
                                        setSendBtn(true)
                                    } else {
                                        setSendBtn(false)
                                    }
                                }}/>
                            </div>
                            <button type="submit" className={sendbtn ? 'btn':'btn disabled'} disabled={!sendbtn}>Отправить</button>
                        </form>
                    )}
                </div>
            </div>
    )
}

export default Oneclick