import React from 'react';
import { Auth_ } from '../../../../provider/AuthProvider';

import loading from "../../../../assets/icons/loading_icon.svg"
import s from './Details.module.css'

const AboutUser = ({ userName, userPicture, isLoading }) => {
    const { setAuthorized } = Auth_();

    const handleLogout = () => {
        setAuthorized(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
    };

    return (
        <div className={s.user_info}>
            <div className={s.user_details}>
                <div className={s.username}>{userName}</div>

                <a href="#" className={s.logout} onClick={handleLogout}>Выйти</a>
            </div>
            {isLoading ? (
                <img src={loading} alt="loading" className={s.loading} />
            ) : (
                <img src={userPicture} alt="User_Pic" className={s.picture} />
            )}
        </div>
    );
};

export default AboutUser;