import React from 'react';

import s from './Home.module.css';

import About from "./Home_info/About";
import Reasons from "./Home_info/Reasons";
import Fees from "./Home_info/Fees/Fees";

const Home = ({ Authorized, user_fee }) => {
    return (
        <div className={s.content}>
            <About Authorized={Authorized} />
            <Reasons />
            <Fees Authorized={Authorized} user_fee={user_fee} />
        </div>
    )
}

export default Home