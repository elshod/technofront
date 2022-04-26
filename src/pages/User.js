import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";

import Breadcrumbs from "../components/breadcrumbs";
import History from "../components/user/history";
import Information from "../components/user/information";
import Password from "../components/user/password";
import Private from "../components/user/private";
import Fav from "./Fav";
const User = () =>{
    const [cookies, setCookie] = useCookies(['user'])
    const history = useNavigate()
    useEffect(()=>{
        if (cookies){
            let {user} = cookies
            axios.post('http://localhost:3003/api/user/checkuser',user)
            .then(res => {            
                if (!res.data) history('/')
            })
        } else {
            history('/')
        }
    },[])
    return(
        <div className="container">
            <Breadcrumbs/>
            <Routes>
                <Route path='/information' element={<Information/>}/>
                <Route path='/private' element={<Private/>}/>
                <Route path='/history' element={<History/>}/>
                <Route path='/fav' element={<Fav />}/>
                <Route path='/pass' element={<Password />}/>
            </Routes>
        </div>
    )
}

export default User