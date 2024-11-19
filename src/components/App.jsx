import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "./shared/header/Header";
import Home from "./home/Home";
import Auth from "./auth/Auth";
import Search from "./search/Search";
import Results from "./results/Results";
import Footer from "./shared/footer/Footer";
import u_pic from "../assets/images/u_pic.png"
import {Auth_} from "../provider/AuthProvider";

import '../styles/index.css';
import '../styles/App.css';

function App() {
    const { Authorized, checkAuthStatus } = Auth_();
    const [user_fee] = useState('beginner_card');
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState(u_pic);

    useEffect(() => {
        if (!Authorized) {
            console.log("Пользователь не залогинен, обновите UI");
        }
    }, [Authorized]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return (
        <div className="global_container">
            <div className="container">
                <Header Authorized={Authorized} userName={userName} setUserName={setUserName} userPicture={userPicture} setUserPicture={setUserPicture}/>
                <Routes>
                    <Route path="/" element={<Home Authorized={Authorized} user_fee={user_fee} />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/search" element={Authorized ? <Search /> : <Auth redirect_back="/search" />} />
                    <Route path="/results" element={Authorized ? <Results /> : <Auth redirect_back="/results" />} />
                </Routes>
                <Footer />
            </div>
        </div>
    );
}

export default App;
