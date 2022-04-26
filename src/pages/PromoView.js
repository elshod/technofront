import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import '../assets/css/news.scss'
import { useParams } from "react-router-dom";
import axios from "axios";

const PromoView = () => {
    const [blog,setBlog] = useState({
        title:'',
        text:'',
        img:''
    })
    let {id} = useParams()    
    useEffect(()=>{
        axios.get(`http://localhost:3003/api/promo/get/${id}`)
        .then(res => {
            console.log(res.data)
            setBlog(res.data)
        })
    },[])
    return (
        <div className="newspage">
            <div className="container">
                <Breadcrumbs/>
                <div className="btitle mb-3">{blog.title}</div>
                <div className="row">
                    <div className="col-7 col-md-12" dangerouslySetInnerHTML={{ __html: blog.text }}>
                    </div>
                    <div className="col-5 col-md-12">
                        <img src={'http://localhost:3003/'+blog.bigimg} alt='' className="img__full img__sticky"/>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default PromoView