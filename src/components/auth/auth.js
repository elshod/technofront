import React, { useState } from "react";
import { Link, NavLink, useNavigate   } from "react-router-dom";
import '../oneclick/oneclick.scss'
import axios from "axios";
import { useCookies } from 'react-cookie';

const Auth = (props) => {
    let {toggle,setRegToggle,setAuthToggle,changeUserAuth} = props
    const history = useNavigate()
    const [cookies, setCookie] = useCookies(['user']);
    const [checkUser, setCheckUser] = useState({
        login:false,
        password:false
    })
    const sendAuthClick = (e) =>{
        e.preventDefault()
        let regform = document.forms.authform
        let formData = new FormData(regform)
        let user = {}
        formData.forEach((value,name)=>{
            user[name] = value
        })
        
        axios.post('http://localhost:3003/api/user/login',user)
        .then(res => {
            let user = res.data
            if (user == 'password invalid'){
                console.error(user)
                changeUserAuth(false)
            } else if (user == 'not exists'){
                console.error(user)
                changeUserAuth(false)
            } else if (user._id && user.token){
                setCookie('user', user, { path: '/' })
                setAuthToggle()
                changeUserAuth(true)
                regform.reset()
                history('/user/information')
            }
        })
        
    }


    return (
        <div className={`rmodal ${toggle?'show':''}`}>
                <div className="rmodal__box rmodal__sm">
                    <div className="rmodal__title">Вход
                        <button className="rmodal__close" onClick={()=>{setAuthToggle()}}></button>
                    </div>
                    <form onSubmit={(event)=>sendAuthClick(event)}
                        name='authform'
                        className="rmodal__form"
                    >
                        <div className="rmodal__inp">
                            <label>Эл. почта или телефон</label>
                            <input type="text" name="login" onInput={(event)=>{
                                if (event.target.value){
                                    setCheckUser({...checkUser,login:true})
                                    event.target.classList.remove(...event.target.classList)
                                    event.target.classList.add('good')
                                } else {
                                    setCheckUser({...checkUser,login:false})
                                    event.target.classList.remove(...event.target.classList)
                                    event.target.classList.add('bad')
                                }
                            }}/>
                        </div>
                        <div className="rmodal__inp">
                            <label>Пароль</label>
                            <input type="password" className="password" name="password" onInput={(event)=>{
                                if (event.target.value && event.target.value.length>5){
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
                        <div className="rmodal__text"><Link to='/'>Забыли пароль?</Link>
                        </div>
                        <button type="submit" className={checkUser.login && checkUser.password ? 'btn':'btn disabled'} disabled={checkUser.login && checkUser.password ? false:true}>Войти</button>
                        <button type="button" className="rmodal__link" onClick={()=>{
                            setAuthToggle()
                            setRegToggle()
                        }}>Зарегистрироваться</button>
                    </form>
                </div>
            </div>
    )
}

export default Auth