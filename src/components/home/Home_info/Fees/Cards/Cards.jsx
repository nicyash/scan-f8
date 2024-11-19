import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './Cards.module.css';
import "./Cards_var.css"
import green_checkbox from "../../../../../assets/icons/green_checkbox.svg";

const Cards = ({
    name,
    description,
    icon,
    color,
    active_color,
    isActive,
    Authorized,
    text_color,
    price,
    old_price,
    text,
    features
    }) => {

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/auth');
    };

    return (
        <div className={`card ${isActive && Authorized ? active_color : ''}`}>
            <div className={`colored ${color}`}>
                <div className={s.fee_name_container}>
                    <h3 style={{ color: `var(--main-${text_color})` }}>{name}</h3>
                    <p style={{ color: `var(--main-${text_color})` }} >{description}</p>
                </div>
                <div className={s.fee_icon_container}>
                    <img className={s.fee_icon} src={icon} alt="icon" />
                </div>
            </div>
            <div className={s.your_fee_container}>
                {isActive && Authorized && (
                    <div className={s.your_fee}>Текущий тариф</div>
                )}
            </div>
            <div className={s.fee_text_container}>
                <div className={s.fee_price_container}>
                    <div className={s.fee_prices}>
                        <h3>{price}</h3>
                        <p className={s.old_fee_price}>{old_price}</p>
                    </div>
                </div>
                <p className={s.text}>{text}</p>
            </div>
            <div>
                <p className={s.card_text_2}>В тариф входит:</p>
                {features.map((feature, index) => (
                    <div key={index} className={s.fee_info}>
                        <img className={s.green_checkbox} src={green_checkbox} alt="checkbox" />
                        <p className={s.card_text}>{feature}</p>
                    </div>
                ))}
                {Authorized && (
                    <div className={s.fee_global_button}>
                        {isActive && Authorized
                            ? <button className={s.fees_button_grey} id="requestDataButton">Перейти в личный кабинет</button>
                            : <button className={s.fees_button} id="requestDataButton">Подробнее</button>
                        }
                </div>)}
                {!Authorized && (
                    <div className={s.fee_global_button}>
                        {isActive && Authorized
                            ? <button className={s.fees_button_grey} id="requestDataButton">Перейти в личный кабинет</button>
                            : <button className={s.fees_button} id="requestDataButton" onClick={handleLoginClick}>Подробнее</button>
                        }
                    </div>)}
            </div>
        </div>
    );
};

export default Cards;