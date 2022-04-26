import React, {useState} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

import Menu from "./menu";

import './user.scss'

import block from '../../assets/img/block.svg'
import eye from '../../assets/img/eye.svg'
import done from '../../assets/img/done.svg'

const Password = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const [eyePass,setEyePass] = useState({old:false,news:false,news2:false}) // pass <-> text
    const [pass,setPass] = useState({old:false,news:false,news2:false})
    const [newpass,setNewpass] = useState({news:'',news2:''})
    let {user} = cookies    
    const checkOldPass = (target) =>{
        let pass = target.value
        axios.post('http://localhost:3003/api/user/checkpass/',{
            pass,
            user
        }).then(res=>{
            setPass({...pass,old:res.data})
        })
    }

    const save = () => {
        axios.post('http://localhost:3003/api/user/savepass/',{
            pass: newpass.news,
            user
        }).then(res=>{
            if (res.data == 'ok'){
                alert('ok')
            } 
        })
    }

    return (
        <>
          <div className="userpage">
            <div className="btitle mb-3">Личные данные</div>
                <div className="row">
                    <div className="col-3">
                    <Menu/>
                    </div>
                    <div className="col-3 offset-col-1">
                    <div className="rmodal__inp">
                            <label className="mt-2">Введите старый пароль</label>
                            <div className="input pos">
                                <img src={block} className='input__block'/>
                                <input 
                                    type={eyePass.old?'text':'password'} 
                                    name="oldpassword"
                                    onBlur={(event)=>{ checkOldPass(event.target) }}
                                />
                                {pass.old?(<img src={done} className='input__done'/>  ):''} 
                                <button onClick={()=>{let old = !eyePass.old
                                    setEyePass({...eyePass,old})}} 
                                    className='input__eye'>
                                        <img src={eye} />
                                </button>  
                            </div>
                            <label className="mt-2">Введите новый пароль</label>
                            <div className="input pos">
                                <img src={block} className='input__block'/>
                                
                                <input 
                                    type={eyePass.news?'text':'password'} 
                                    name="newspassword"
                                    onInput={(event)=>{
                                        setNewpass({...newpass,news:event.target.value})
                                    }}
                                />
                                <button 
                                    onClick={()=>{
                                        let news = !eyePass.news
                                        setEyePass({...eyePass,news})
                                    }} 
                                    className='input__eye'>
                                    <img src={eye} />
                                </button>  
                                {newpass.news==newpass.news2&&newpass.news.length>0?(<img src={done} className='input__done'/>):''}    
                            </div>
                            <label className="mt-2">Повторите новый пароль</label>
                            <div className="input pos">
                                <img src={block} className='input__block'/>
                                
                                <input 
                                    type={eyePass.news2?'text':'password'} 
                                    name="news2password"
                                    onInput={(event)=>{
                                        setNewpass({...newpass,news2:event.target.value})
                                    }}
                                />
                                <button 
                                    onClick={()=>{
                                        let news2 = !eyePass.news2
                                        setEyePass({...eyePass,news2})
                                    }} 
                                    className='input__eye'>
                                    <img src={eye} />
                                </button>  
                                {newpass.news==newpass.news2&&newpass.news.length>0?(<img src={done} className='input__done'/>):''}      
                            </div>
                    </div>
                        {newpass.news==newpass.news2&&newpass.news.length>0&&pass.old?(<button className="btn w100" onClick={()=>{save()}}>Сохранить изменения</button>):''}
                    </div>
                </div>
            </div>  
        </>
    )
}

export default Password