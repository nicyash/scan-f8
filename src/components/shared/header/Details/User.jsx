import React, { useState, useEffect } from 'react';
import UserAccount from './UserAccount';
import AboutUser from './AboutUser';

import u_pic from '../../../../assets/images/u_pic.png';
import s from './Details.module.css'


const User = ({ Authorized, userName, userPicture, setUserName, setUserPicture }) => {
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const userData = {
                name: 'Алексей А.',
                picture: u_pic,
            };
            setUserName(userData.name);
            setUserPicture(userData.picture);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className={s.user}>
            {Authorized && (
                <>
                    <UserAccount isLoading={Loading} />
                    <AboutUser userName={userName} userPicture={userPicture} isLoading={Loading} />
                </>
            )}
        </div>
    );
};

export default User;