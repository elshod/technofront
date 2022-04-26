import React, { useEffect, useState } from "react";
import trash from '../assets/img/trash.svg'
import { useNavigate } from "react-router-dom";
import '../assets/css/cart.scss'
import { useCookies } from "react-cookie";
import axios from "axios";
const Cart = () => {
    const history = useNavigate()
    const [cookies, setCookie] = useCookies(['carts','users'])
    const [toggle, setToggle] = useState(false)
    const [products,setProducts] = useState([])
    const [stage,setStage] = useState(0)
    const [user,setUser] = useState({
        _id:''
    })
    const [cart,setCart] = useState('')
    const [authinfo,setAuthInfo] = useState(true)
    const [msg,setMsg] = useState('')
    const [deliveryType,setDeliveryType] = useState(user.delivery)

    const [status,setStatus] = useState(false)

    let carts = cookies.carts
    
    const removeCart = ()=>{
        let carts = []
        if (cookies.carts){
            carts = cookies.carts
        }
        let index = carts.findIndex(cart => cart == products._id)
        console.log(index)
        if(index == -1){
            carts.splice(index,1)
        }
        setCookie('carts',carts)
    }

    const send = () => {
        let form = document.forms.checkout
        let formData = new FormData(form)
        axios.post('http://localhost:3003/api/checkout',formData)
        .then(res => {
            if (res.data == 'ok'){
                setStatus(true)
                setCookie('carts','')
                form.reset()
            }
        })
    }

    useEffect(()=>{
        let carts = []
        if (cookies){
            let {user} = cookies
            axios.post('http://localhost:3003/api/user/checkuser',user)
            .then(res => {            
                if (!res.data) {
                    setAuthInfo(false)
                    return false
                }
            })
            axios.get(`http://localhost:3003/api/user/get/${user._id}/${user.token}`)
            .then(res => {
                
                if (res.data){
                    console.log(res.data)
                    setUser(res.data)
                }
            })
        } else {
            setAuthInfo(false)
        }
        if(cookies.carts){
            carts = cookies.carts
            axios.post('http://localhost:3003/api/products/cartid',{carts})
            .then(res => {
                setProducts(res.data)
                calcSumma(res.data)
            })
        }
    },[cookies])
    let [summa, setSumma] = useState(0)
    const calcSumma = (products) => {
        let sum = 0
        let c = []
        products.forEach(product => {
            if(product.sale>0){
               sum += (product.price-(product.price*product.sale/100))*product.count
            } else {
                sum += product.price * product.count
            }
            c.push({_id:product._id,count:product.count})
        })
        setCart(JSON.stringify(c))
        setSumma(sum)
    }
    const calcCount = (index,value,t=true) => {
        let data = products
        if (value == -1 && data[index].count==0) return false
        if (t)
            data[index].count += +value
        else 
            data[index].count = +value
        console.log(data)
        setProducts(data)
        calcSumma(data)
    }
    
    return (
        <div className="container">
            {authinfo?(
            <>
                {status?(
                    <>
                        <div className="btitle mb-5">Ваш заказ оформлено!</div>
                        <button onClick={()=>{history('/user/history')}}>Перейти истории заказов</button>
                    </>
                ):(
                <>
                    <div className="btitle mb-5">Оформление заказа</div>
                    <form name='checkout' className="checkout">
                    <input type="hidden" name="cart" value={cart}/>
                    <input type="hidden" name="user" value={user._id} />
                    <div className="row">
                        <div className="col-8 col-md-12">
                            <div className="cart__item">
                                <h5>Ваш заказ</h5>
                                {products.map((product,index) => (
                                    <div className="cart__product" key={index}>
                                        <div className="cart__img" style={{
                                            backgroundImage: 'url(http://localhost:3003/'+product.img[0]+')'
                                        }}></div>
                                        <div className="cart__title">{product.title}</div>
                                        <div className="cart__count">
                                            <button type="button" className="cart__less" onClick={()=> {
                                                calcCount(index,-1)
                                            }}>-</button>
                                            <input type="number" value={products[index].count} onChange={(e)=>{
                                                if (parseInt(e.target.value) > 0)
                                                calcCount(index,e.target.value,false)
                                            }}/>
                                            <button type="button" className="cart__more" onClick={()=> {
                                                calcCount(index,1)
                                            }}>+</button>
                                        </div>
                                        <div className="cart__price">
                                            <div className="old">{product.price+' ₽'}</div>
                                            <div className="new">{product.sale>0?product.price-(product.price*product.sale/100):product.price} ₽</div>
                                        </div>
                                        <button 
                                            className="cart__trash"
                                            onClick={removeCart}
                                        ><img src={trash} alt="" /></button>
                                    </div>
                                ))}
                            </div>
                            {stage>=1?(
                                <div className="cart__item">
                                    <h5>Способ получения</h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <select className="select" name="city">
                                                <option value="0">Ташкент</option>
                                                <option value="1">Бухара</option>
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <div className="checkout__radio mb-2">
                                                <input type="radio" id="del0" name="delivery" value='0' onChange={()=>{setDeliveryType(0)}}/>
                                                <label htmlFor="del0">
                                                    Доставка
                                                </label>
                                            </div>
                                            <div className="checkout__radio">
                                                <input type="radio" id="del1" name="delivery" value='1' onChange={()=>{setDeliveryType(1)}}/>
                                                <label htmlFor="del1">
                                                    Самовывоз
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {deliveryType==0?(
                                        <div className="checkout__delivery">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="rmodal__inp">
                                                        <label>Дата</label>
                                                        <input type="date" name="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="rmodal__inp">
                                                        <label>Улица, дом/корпус</label>
                                                        <input type="text" name="street" 
                                                        defaultValue={user.address}
                                                        onChange={(event)=>{
                                                            setUser({...user,address:event.target.value})
                                                        }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="rmodal__inp">
                                                        <label>Время</label>
                                                        <input type="time" name="time"/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="rmodal__inp">
                                                        <label>Квартира</label>
                                                        <input type="text" name="flat"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rmodal__inp">
                                                <label>Комментарий курьеру</label>
                                                <input type="text" name="comment"/>
                                            </div>
                                        </div>
                                    ):''}
                                </div>
                            ):''}
                            {stage>=2?(
                                <div className="cart__item">
                                    <h5>Способ оплаты</h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <select className="select" name="payment" defaultValue={user.payment}>
                                                <option value="0">Наличными</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ):''}
                            {stage>=3?(
                                <div className="cart__item">
                                    <h5>Получатель</h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="rmodal__inp">
                                                <label>Имя</label>
                                                <input type="text" name="name" defaultValue={user.name}
                                                placeholder="Например, Иван"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="rmodal__inp">
                                                <label>Фамилия</label>
                                                <input type="text" name="lname" placeholder="Например, Иванов"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="rmodal__inp">
                                                <label>Номер телефона</label>
                                                <input type="number" defaultValue={user.phone} name="phone" placeholder="+99899123456"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="rmodal__inp">
                                                <label>Эл. почта</label>
                                                <input type="email" name="email"
                                                defaultValue={user.email} placeholder="Например,  smart@gmail.com"/>
                                            </div>
                                        </div>
                                    </div>
                                    <label className="clear">
                                        <input type="checkbox"/> 
                                        Не перезванивать мне для подтверждения заказа
                                    </label>
                                </div>
                            ):''}
                            {msg.length>0?(
                                <div className="cart__msg">{msg}</div>
                            ):''}
                            <button type="button" className="btn cart__next" onClick={()=>{
                                if (stage==1 && (deliveryType!==0 && deliveryType!==1 )){
                                    setMsg('Выберите способ доставки')
                                    return false
                                } 
                                if (stage<=3 ){
                                    setMsg('')
                                    setStage(stage+1)
                                }
                            }}>Далее</button>
                        </div>
                        <div className="col-4 col-md-12">
                            <div className="cart__all">
                                <h5>Итого</h5>
                                <div className="cart__all--row">
                                    <div className="cart__all--item">
                                        <span>{carts.length} товара на сумму</span>
                                        <span>{summa} ₽</span>
                                    </div>
                                    <div className="cart__all--item">
                                        <span>Стоимость доставки</span>
                                        <span>бесплатно</span>
                                    </div>
                                </div>
                                <div className="cart__summa">
                                    <div className="cart__summa--title">К оплате</div>
                                    <div className="cart__summa--value">{summa} ₽</div>
                                </div>
                                <button type="button" onClick={()=>{send()}} className={stage>=3?"btn cart__checkout":"btn cart__checkout disabled"}>Оформить заказ</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </>
                )}
            </>
            ):(
                <div className="btitle mb-5">Для оформление заказа требуется авторизация</div>
            )}
        </div>
    )
}

export default Cart

// Vecnfaf1305