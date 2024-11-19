import React, { useState, useEffect } from 'react';

import s from './Details.module.css'
import loading from "../../../../assets/icons/loading_icon.svg";

const UserAccount = () => {
    const [usedCompanyCount, setUsedCompanyCount] = useState(0);
    const [companyLimit, setCompanyLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            setIsLoading(true);
            const url = 'https://gateway.scan-interfax.ru/api/v1/account/info';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount);
                setCompanyLimit(data.eventFiltersInfo.companyLimit);
            } catch (error) {
                console.error("No data about companies: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyInfo();

        const intervalId = setInterval(fetchCompanyInfo, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={s.user_account}>
            {isLoading ? (
                <img src={loading} alt="loading" className={s.loading}/>
            ) : (
                <div className={s.user_account_data}>
                    <div className={s.item}>Использовано компаний</div>
                    <div className={s.used_number}>{usedCompanyCount}</div>
                    <div className={s.item}>Лимит по компаниям</div>
                    <div className={s.limit_number}>{companyLimit}</div>
                </div>
            )}
        </div>
    );
};

export default UserAccount;