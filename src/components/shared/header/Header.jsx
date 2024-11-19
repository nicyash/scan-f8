import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import User from './Details/User';
import { Auth_ } from '../../../provider/AuthProvider';

import s from './Header.module.css'
import GlobalSVGSelector from "../../../assets/icons/shared/GlobalSVGSelector";


const Header = ({ Authorized, userName, userPicture, setUserName, setUserPicture }) => {
    const { setAuthorized } = Auth_();

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const tokenExpire = localStorage.getItem('tokenExpire');
            const now = new Date();

            if (!tokenExpire || new Date(tokenExpire) <= now) {
                setAuthorized(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tokenExpire');
            }
        }, 1000 * 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <header>
            <div className={s.content}>
                <GlobalSVGSelector classname={s.logo} id="green_logo"/>
                <nav className={s.info}>
                    <a href="/">Главная</a>
                    <a href="#">Тарифы</a>
                    <a href="#">FAQ</a>
                </nav>
                {Authorized && (
                    <div>
                        <User
                            Authorized={Authorized}
                            userName={userName}
                            userPicture={userPicture}
                            setUserName={setUserName}
                            setUserPicture={setUserPicture}
                        />
                    </div>
                )}
                {!Authorized && (
                    <div>
                        <div className={s.registration}>
                            <a href="/auth" className={s.login}>Зарегистрироваться</a>
                            <div className={s.vertical_divider}></div>
                            <button className={s.login_button} id="loginButton" onClick={handleLoginClick}>Войти</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};


export default Header;