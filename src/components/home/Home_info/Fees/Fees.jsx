import React from 'react';

import Cards from './Cards/Cards';

import lamp from "../../../../assets/icons/lamp.svg"
import laptop from "../../../../assets/icons/laptop.svg"
import target from "../../../../assets/icons/target.svg"

import s from "./Fees.module.css"


const Fees = ({ Authorized, user_fee }) => {
    return (
        <div className={s.fees}>
            <h2>Наши тарифы</h2>
            <div className={s.fees_cards}>
                <Cards
                    name="Beginner"
                    description="Для небольшого исследования"
                    icon={lamp}
                    color="beginner"
                    active_color="beginner_active"
                    isActive={user_fee === 'beginner_card'}
                    Authorized={Authorized}
                    text_color="black"
                    price="799 ₽"
                    old_price="1200 ₽"
                    text="или 150 ₽/мес. при рассрочке на 24 мес."
                    features={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}
                />
                <Cards
                    name="Pro"
                    description="Для HR и фрилансеров"
                    icon={target}
                    color="pro"
                    active_color="pro_active"
                    isActive={user_fee === 'pro_card'}
                    Authorized={Authorized}
                    text_color="black"
                    price="1 299 ₽"
                    old_price="2 600 ₽"
                    text="или 279 ₽/мес. при рассрочке на 24 мес."
                    features={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
                />
                <Cards
                    name="Business"
                    description="Для корпоративных клиентов"
                    icon={laptop}
                    color="business"
                    active_color="business_active"
                    isActive={user_fee === 'business_card'}
                    Authorized={Authorized}
                    text_color="white"
                    price="2 379 ₽"
                    old_price="3 700 ₽"
                    text=""
                    features={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
                />
            </div>
        </div>
    )
}

export default Fees