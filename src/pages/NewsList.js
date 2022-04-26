import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import CardNews from "../components/news/card";
import axios from "axios";
const NewsList = () => {
    const [list,setList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3003/api/blog/all')
        .then(res => {
            setList(res.data)
        })
    },[])
    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="btitle mb-3">Новости</div>
            <div className="row">
                {list.map(item=>(
                    <div className="col-6 col-md-12 mb-2" key={item._id}>
                        <CardNews news={item}/>
                    </div>
                ))}
                
            </div>    
        </div>
    )
}

export default NewsList