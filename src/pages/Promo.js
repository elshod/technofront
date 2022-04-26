import React, {useState, useEffect} from "react";
import Breadcrumbs from "../components/breadcrumbs";
import Pagination from "../components/pagination";
import Promo from "../components/promo";
import axios from "axios";
const PromoList = () => {
    const [promos, setPromos] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3003/api/promo/all')
        .then(res => {
            setPromos(res.data)
        })
    },[])
    return (
        <div className="container">
            <Breadcrumbs/>
            <div className="btitle mb-3">Акции</div>
            <div className="row mb-8">
                {promos.map(promo => (
                    <div className="col-6 col-md-12 mb-2" key={promo._id}>
                        <Promo promo={promo}/>
                    </div>

                ))}
                
            </div>
            <Pagination/>
        </div>
    )
}

export default PromoList