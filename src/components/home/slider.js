import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './slider.scss'
import { Link } from "react-router-dom";
import axios from "axios";
const Slider = () => {
    const [list,setList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3003/api/slider/getall')
        .then(res => {
            setList(res.data)
        })
    },[])
    return (
        <Splide className="slider__slide" options={ {
            arrows:false,
            autoplay:true,
            type:'loop',
          } }>
            {list.map(slide=>(
                <SplideSlide className="slide" key={slide._id}>
                    <img src={`http://localhost:3003/${slide.img}`} alt="" />
                    <div className="slider__text">
                        <div className="slider__title">{slide.title}</div>
                        <div className="slider__info">{slide.text}</div>
                        <Link to={slide.link}>Подробнее</Link>
                    </div>
                </SplideSlide>
            ))}

        </Splide>
    )
}

export default Slider