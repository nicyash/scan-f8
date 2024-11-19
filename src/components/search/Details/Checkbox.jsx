import React from 'react';
import s from "./Checkbox.module.css";
import "./Details_var.css"

const CheckboxBlock = ({ checkbox, handleCheckbox }) => {
    const boxes = {
        max: "Признак максимальной полноты",
        mentions: "Упоминания в бизнес-контексте",
        main_role: "Главная роль в публикации",
        risk_factors: "Публикации только с риск-факторами",
        market_news: "Включать технические новости рынков",
        announcements: "Включать анонсы и календари",
        news_summaries: "Включать сводки новостей",
    };

    return (
        <div className={s.checkbox_container}>
            {Object.keys(checkbox).map((key) => (
                <div key={key} className={s.checkbox}>
                    <input
                        type="checkbox"
                        id={`checkbox-${key}`}
                        name={key}
                        checked={checkbox[key]}
                        onChange={handleCheckbox}
                        className="hidden-checkbox"
                    />
                    <label htmlFor={`checkbox-${key}`} className={checkbox[key] ? "checked-label" : ""}>
                        <span className={s.custom_checkbox}></span>
                        <span className={s.label_text}>{boxes[key]}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxBlock;