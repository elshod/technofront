import React, { useEffect } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import Breadcrumbs from "../components/breadcrumbs";
import '../assets/css/news.scss'
import About from "../components/page/about";
import Contact from "../components/page/contact";
import PageView from "../components/page/page";
const Page = ({}) => {

    return (
        <div className="page">
            <div className="container">
                <Breadcrumbs/>
            </div>
            <Routes>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/:slug' element={<PageView/>}/>
            </Routes>
            
        </div>
    )
}

export default Page