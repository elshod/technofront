import React, { useEffect, useState } from "react";
import Pagination from "../pagination";
import Menu from "./menu";

import { useCookies } from 'react-cookie';

import './user.scss'
import axios from "axios";
const History = () => {

    const [cookies, setCookie] = useCookies(['user'])
    const [orders,setOrders] = useState([])
    useEffect(()=>{
        if (cookies){
            let {user} = cookies
            axios.post('http://localhost:3003/checkout/getorders',{user})
            .then(res => {            

                setOrders(res.data)
            })
        } 
    },[])

    return (
        <>
          <div className="userpage">
            <div className="btitle mb-3">Личные данные</div>
                <div className="row">
                    <div className="col-3">
                    <Menu/>
                    </div>
                    <div className="col-9">
                        <div className="table">
                        <div className="table__title">
                            История покупок
                        </div>
                        <table>
                            <tbody>
                                {orders.map(order =>{
                                    return (
                                        <tr key={order._id}>
                                            <td>
                                                Заказ #{order._id} <span> <br /> от {order.createdAt}</span>
                                                
                                            </td>
                                            <td dangerouslySetInnerHTML={{__html: order.products}}>
                                            </td>
                                            <td className="wait">{order.status}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default History