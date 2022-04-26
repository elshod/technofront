import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import '../assets/css/vakansi.scss'
import { useParams } from "react-router-dom";
import axios from "axios";

const Vakansi = () => {
    const [info,setInfo] = useState(false)
    const [vakansi,setvakansi] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const sendVakansform = async(event) =>{
        event.preventDefault()
        let form = document.forms.feed
        let formData = new FormData(form)
       
        axios.post('http://localhost:3003/api/vakansi/condi',formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            console.log(res.data)
            if (res.data == 'ok'){
                
                setInfo(true)
                form.reset()
            }
        })
                
    }
    useEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        axios.get(`http://localhost:3003/api/vakansi/all`)
        .then(res => {
           
            setvakansi(res.data)
        })
    },[])
    return (
        <div className="vakan">
            <div className="container">
                <Breadcrumbs/>
                <div className="btitle mb-3">Вакансии</div>
                <div className="row">
                    <div className="col-7 col-md-12"  >
                        {vakansi.map((vakan,index)=>(
                            <div className="vakan__box" key={index}>
                                <div className="vakan__title" onClick={(e)=>{
                                    if (document.querySelector('.vakan__title.show') && e.target !== document.querySelector('.vakan__title.show')){
                                        document.querySelector('.vakan__title.show').classList.remove('show')
                                    }
                                    e.target.classList.toggle('show')
                                }}> {vakan.title}</div>
                                <div className="vakan__body"  dangerouslySetInnerHTML={{ __html: vakan.text }}></div>
                            </div>
                            ))}
                    </div>
                    <div className="offset-col-1 col-4  col-md-12">
                        <form className="feed__form vakan__form" name="feed" onSubmit={(event)=>{ sendVakansform(event) }}>
                            <div className="vakan__form--title">Присоединяйся к команде</div>
                            <label>
                                Вакансии
                                <select name="vakan">
                                    {vakansi.map(vak=>(
                                        <option value={vak._id} key={vak._id}>{vak.title}</option>
                                    ))}
                                </select>
                            </label>
                            <label> Имя<input placeholder="Введите имя" name='name'/>
                            </label>
                            <label> Фамилия<input placeholder="Введите фамилию" name='sname'/>
                            </label>
                            <label> Отчество<input placeholder="Введите отчество" name='fname'/>
                            </label>
                            <label>Телефон
                                <input placeholder="Введите номер телефон" name="phone"/>
                            </label>
                            <label>Добавьте файл резюме <input type='file' onChange={handleFileSelect}  name="file"/> </label>
                            <label>Сопроводительное письмо
                                <textarea className="feed__text" name="text" placeholder="Введите сообщение"></textarea>
                            </label>
                            <button type="submit" className="feed__submit">Отправить</button>
                            <div className="filtr__radio">
                                <input type='checkbox' id="agree"/>
                                <label htmlFor='agree'>Отправляя данную форму вы соглашаетесь с политикой конфиденциальности</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Vakansi