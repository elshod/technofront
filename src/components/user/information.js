import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Menu from "./menu";

import './user.scss'
import axios from "axios";

const Information = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const [user,setUser] = useState({})
    useEffect(()=>{
        let {user} = cookies
        axios.get(`http://localhost:3003/api/user/get/${user._id}/${user.token}`)
        .then(res => {
            
            if (res.data){
                console.log(res.data)
                setUser(res.data)
            }
        })
    },[])
    return (
        <div className="userpage">
            <div className="btitle mb-3">Общие сведения</div>
            <div className="row">
                <div className="col-3">
                <Menu/>
                </div>
                <div className="col-5 offset-col-1">
                    <div className="userpage__name">{user.name}</div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="userpage__img" style={{
                            backgroundImage: `url(http://localhost:3003/${user.avatar})`
                        }}></div>
                        <div className="userpage__info">
                            <p>Дата регистрации: {user.createdAt}</p>
                            <p>Заказов: 1</p>
                        </div>
                    </div>
                    <p className="mb-3">Добро пожаловать в панель управления. Здесь вы можете <Link to='/user/private'>изменить свои регистрационные данные</Link> и <Link to='/user/pass'>cменить пароль</Link>. Зарегистрированные пользователи имеют доступ к <Link to='/user/history'>истории заказов</Link> и возможность <Link to='/user/favourite'>добавлять в избранное товары для будущих покупок</Link>.</p>
                    <Link to='/user/private' className="btn">Панель управления</Link>
                </div>
            </div>
        </div>
    )
}

export default Information