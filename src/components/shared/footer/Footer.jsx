import React from 'react';

import s from "./Footer.module.css"
import white_logo from "../../../assets/icons/white_logo.svg"

const Footer = () => {
    return (
        <footer>
            <div className={s.content}>
                <img className="white-logo" src={white_logo} alt="white-logo"/>
                <div className={s.address}>
                    <p style={{marginRight:'22px'}}>г. Москва, Цветной б-р, 40</p>
                    <p>+7 495 771 21 11</p>
                    <p>info@skan.ru</p>
                    <p style={{marginTop:'40px'}}></p>
                    <p style={{fontSize:'12px'}}>Copyright. 2022</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer