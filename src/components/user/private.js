import React,{useState,useEffect} from "react";
import Menu from "./menu";
import './user.scss'
import { useCookies } from 'react-cookie';
import axios from "axios";

const Private = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const [user,setUser] = useState({
        name:'',
        address:'',
        phone:'',
        email:'',
        delivery:'',
        payment:'',
        index:'',
        city:''
    })

    const save = async(event) =>{
        event.preventDefault()
        let form = document.forms.profileform
        let formData = new FormData(form)

        
        axios.post('http://localhost:3003/api/user/save',formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            console.log(res.data)
            if (res.data == 'ok'){
                form.reset()
            }
        })
                
    }

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
            <div className="btitle mb-3">Личные данные</div>
            <div className="row">
                <div className="col-3">
                <Menu/>
                </div>
                <div className="col-6 offset-col-1">
                    <form onSubmit={(e)=>{ save(e) }} name="profileform" className='feedform'>
                        <input type="hidden" name="id" value={cookies.user._id}/>
                        <input type="hidden" name="token" value={cookies.user.token}/>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="">
                                    Имя
                                <input type="text" name='name'          
                                    className="form__element" 
                                    onChange={(e)=>{
                                        setUser({...user,name:e.target.value})
                                    }} 
                                value={user.name}/>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                    Адрес
                                <input type="text" value={user.address} name='address' className="form__element" placeholder="Не указан"
                                onChange={(e)=>{
                                    setUser({...user,address:e.target.value})
                                }} 
                                />
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                    Эл. почта
                                <input type="text" 
                                onChange={(e)=>{
                                    setUser({...user,email:e.target.value})
                                }} 
                                name='email' className="form__element" value={user.email}/>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                Предпочитаемый способ оплаты
                                    <select type="text" name='payment' className="form__element" 
                                    value={user.payment}
                                    onChange={(e)=>{
                                        setUser({...user,payment:e.target.value})
                                    }} 
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="0">0</option>
                                    </select>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                    Телефон
                                <input type="text" name="phone"
                                onChange={(e)=>{
                                    setUser({...user,phone:e.target.value})
                                }} 
                                className="form__element" value={user.phone}/>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                Предпочитаемый способ доставки
                                    <select type="text" name='delivery' 
                                    onChange={(e)=>{
                                        setUser({...user,delivery:e.target.value})
                                    }} 
                                    className="form__element" value={user.delivery}>
                                        <option value="0">0</option>
                                    </select>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                Город
                                <input type="text" name='city'
                                className="form__element" 
                                onChange={(e)=>{
                                    setUser({...user,city:e.target.value})
                                }} 
                                value={user.city}/>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                Аватар
                                    <input type="file" name="avatar"/>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                Индекс
                                <input type="text" name='index'
                                onChange={(e)=>{
                                    setUser({...user,index:e.target.value})
                                }} 
                                className="form__element"value={user.index} />
                                </label>
                            </div>
                            <div className="col-6">
                                <button type="submit" className="btn formbtn">
                                Сохранить
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Private