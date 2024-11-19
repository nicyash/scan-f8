import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth_ } from "../../provider/AuthProvider"

import s from "./Auth.module.css"
import GlobalSVGSelector from "../../assets/icons/shared/GlobalSVGSelector";

const Auth = () => {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [u_error, set_u_error] = useState(false);
    const [p_error, set_p_error] = useState(false);
    const navigate = useNavigate();
    const { Authorized, checkAuthStatus } = Auth_();

    useEffect(() => {
        if (Authorized) {
            navigate('/');
        }
    }, [Authorized, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    login: username,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('tokenExpire', data.expire);
                checkAuthStatus(true);
                navigate('/');
            } else {
                throw new Error(data.message || 'Ошибка при входе');
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            set_u_error(true);
            set_p_error(true);
        }
    };

    const validateUsername = (input) => {
        set_u_error(false);
    };

    const validatePassword = (input) => {
        set_p_error(false);
    };

    const handleUsernameChange = (e) => {
        const input = e.target.value;
        set_username(input);
        validateUsername(input);
    };

    const handlePasswordChange = (e) => {
        const input = e.target.value;
        set_password(input);
        validatePassword(input);
    };

    return (
        <div className={s.content}>
            <div className={s.wrapper}>
                <h1 className={s.auth_h1}>Для оформления подписки <br />на тариф, необходимо <br />авторизоваться.</h1>
                <div className={s.auth_pic}><GlobalSVGSelector id={"auth_pic"} /></div>
            </div>
            <div className={s.auth_container}>
                <GlobalSVGSelector className={s.lock} id={"lock"} />
                <div className={s.a_form}>
                    <div className={s.wrapper2}>
                        <div className={s.login}>Войти</div>
                        <div className={s.register}><a className={s.inactive} href="#">Зарегистрироваться</a></div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className={s.input}>
                            <label htmlFor="username">Логин или номер телефона:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={s.auth_input_u}
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                style={{ borderColor: u_error ? 'red' : '' }}
                            />
                            {u_error && <div className={s.a_error}>Введите корректные данные</div>}
                        </div>
                        <div className={s.input}>
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={s.auth_input_p}
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                style={{ borderColor: p_error ? 'red' : '' }}
                            />
                            {p_error && <div className={s.a_error}>Введите правильный пароль</div>}
                        </div>
                        <div className={s.a_button_container}>
                            <button className={s.auth_button} type="submit" disabled={!username || !password}>Войти</button>
                        </div>
                        <a href="#" className={s.reset_password}>Восстановить пароль</a>
                    </form>
                    <div className={s.social_media}>
                        <p className={s.media_enter}>Войти через:</p>
                        <div className={s.media_buttons}>
                            <button><GlobalSVGSelector classname={s.icon} id={"Google"}/></button>
                            <button><GlobalSVGSelector classname={s.icon} id={"Facebook"}/></button>
                            <button><GlobalSVGSelector classname={s.icon} id={"Yandex"}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Auth;