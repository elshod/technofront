import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../oneclick/oneclick.scss'
import axios from "axios";

const Reg = ({toggle,setRegToggle,setAuthToggle}) => {
    // let {toggle} = props
    const [checkUser, setCheckUser] = useState({
        name:false,
        email:false,
        phone:false,
        password:false
    })
    const sendOneClick = (e) =>{
        e.preventDefault()
        console.log(123)
        let regform = document.forms.regform

        let formData = new FormData(regform)
        let user = {}
        formData.forEach((value,name)=>{
            user[name] = value
        })
   
        axios.create({withCredentials: true})
        .post('http://localhost:3003/api/user/reg',user)
        .then(res => {
            console.log(res.data)
            // cookies user ni ro'yhatdan o'tib srazu avtorizatsiya qilish kerak

        })
    }

    const checkEmail = (input) => {
        if (input.value)
        axios.get(`http://localhost:3003/api/user/checkemail/${input.value}`)
        .then(res => {
            input.classList.remove(...input.classList)
            input.classList.add(res.data)
            if (res.data=='good'){
                setCheckUser({...checkUser,email:true})
            } else {
                setCheckUser({...checkUser,email:false})
            }
        })
    }
    const checkPhone = (input) => {
        if (input.value)
        axios.get(`http://localhost:3003/api/user/checkphone/${input.value}`)
        .then(res => {
            input.classList.remove(...input.classList)
            input.classList.add(res.data)
            if (res.data=='good'){
                setCheckUser({...checkUser,phone:true})
            } else {
                setCheckUser({...checkUser,phone:false})
            }
        })
    }

    return (
        <div className={`rmodal ${toggle?'show':''}`}>
                <div className="rmodal__box rmodal__sm">
                    <div className="rmodal__title">Регистрация
                        <button className="rmodal__close" onClick={()=>{setRegToggle()}}></button>
                    </div>
                    <form onSubmit={(event)=>sendOneClick(event)}
                        name='regform'
                        className="rmodal__form"
                    >
                        <div className="rmodal__inp">
                            <label>Имя</label>
                            <input type="text" name="name" onBlur={(event)=>{
                                if (event.target.value){
                                    setCheckUser({...checkUser,name:true})
                                } else {
                                    setCheckUser({...checkUser,name:false})
                                }
                                
                            }}/>
                        </div>
                        <div className="rmodal__inp">
                            <label>Эл. почта</label>
                            <input type="email" name="email" onBlur={(event)=>{
                                checkEmail(event.target)
                            }}/>
                        </div>
                        <div className="rmodal__inp">
                            <label>Номер телефона</label>
                            <input type="text" name="phone" onBlur={(event)=>{
                                checkPhone(event.target)
                            }}/>
                        </div>
                        <div className="rmodal__inp">
                            <label>Придумайте пароль</label>
                            <input type="password" name="password" onInput={(event)=>{
                                if (event.target.value && event.target.value.length>6){
                                    setCheckUser({...checkUser,password:true})
                                    event.target.classList.remove(...event.target.classList)
                                    event.target.classList.add('good')
                                } else {
                                    setCheckUser({...checkUser,password:false})
                                    event.target.classList.remove(...event.target.classList)
                                    event.target.classList.add('bad')
                                }
                            }}/>
                        </div>
                        <div className="rmodal__text">
                        Регистрируясь, вы соглашаетесь с <Link to='/'>пользовательским соглашением</Link>
                        </div>

                        <button type="submit" className={checkUser.name && checkUser.phone && checkUser.email && checkUser.password ? 'btn':'btn disabled'} disabled={checkUser.name && checkUser.phone && checkUser.email && checkUser.password ? false:true}>Зарегистрироваться</button>
                        <button type="button" className="rmodal__link" onClick={()=>{
                            setRegToggle()
                            setAuthToggle()
                            }}>Я уже зарегистрирован</button>
                    </form>
                </div>
            </div>
    )
}

export default Reg