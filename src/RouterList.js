import React, { useEffect, useState } from "react";
import {Routes,Route,Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import NewsList from "./pages/NewsList";
import NewsView from "./pages/NewsView";
import Page from "./pages/Page";
import Category from "./pages/Category";
import PromoList from "./pages/Promo";
import Fav from "./pages/Fav";
import Seen from "./pages/Seen";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PromoView from "./pages/PromoView";
import User from './pages/User'
import Vakansi from "./pages/Vakansi";
import axios from "axios";




const RouterList = () => {
  
    return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/news' element={<NewsList/>}/>
        <Route path='/category/:id' element={<Category/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/promo' element={<PromoList/>}/>
        <Route path='/fav' element={<Fav/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/seen' element={<Seen/>}/>
        <Route path='/user/*' element={<User/>}/>
        <Route path='/vakansi' element={<Vakansi/>}/>
        <Route path='/news/:id' element={<NewsView/>}/>
        <Route path='/promo/:id' element={<PromoView/>}/>
        <Route path='/*' element={<Page/>}/>
      </Routes>
    )
}

export default RouterList