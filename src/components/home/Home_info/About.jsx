import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from "./Info.module.css"

import about from "../../../assets/icons/about.svg";

const About = ({ Authorized }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    };

    const handleRequestDataClick = () => {
        navigate('/search');
    };

    return (
        <div className={s.about}>
            <div className={s.about_text}>
                <h1 className={s.about_h1}>Сервис по поиску<br/>публикаций <br/>о компании<br/>по его ИНН</h1>
                <p className={s.about_p}>Комплексный анализ публикаций, получение данных <br/> в формате PDF на
                    электронную
                    почту.</p>
                {Authorized && <button
                    className={s.button} id="requestDataButton" onClick={handleRequestDataClick}>
                    Запросить данные
                </button>
                }
                {!Authorized && <button
                    className={s.button} id="requestDataButton" onClick={handleLoginClick}>
                    Запросить данные
                </button>
                }
            </div>
            <img className={s.picture} src={about} alt="about"/>
        </div>
    )
}

export default About