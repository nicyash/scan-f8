import React, { useState, useEffect } from 'react';

import s from "./Date.module.css";
import "./Details_var.css"

const DateInput = ({ start_date, set_start_date, end_date, set_end_date }) => {
    const [error, set_error] = useState('');
    const [input_start, set_input_start] = useState('text');
    const [input_end, set_input_end] = useState('text');

    useEffect(() => {
        Date_valid();
    }, [start_date, end_date]);

    const Date_valid = () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (!start_date || !end_date) {
            set_error("Обязательное поле");
        } else if (new Date(start_date) > new Date(end_date)) {
            set_error("Введите корректные данные");
        } else if (new Date(start_date) > now || new Date(end_date) > now) {
            set_error("Дата не может быть позже текущей даты");
        } else {
            set_error("");
        }
    };

    return (
        <div className={s.form_field}>
            <label className={s.lab} htmlFor="startDate">Диапазон поиска <span className={error ? "required error" : "required"}>*</span></label>
            <div className={s.date_input}>
                <div className={s.date_input_container}>
                    <input
                        type={input_start}
                        onFocus={() => set_input_start('date')}
                        onBlur={() => {
                            Date_valid();
                            if (!start_date) set_input_start('text');
                        }}
                        id="startDate"
                        name="startDate"
                        placeholder="Дата начала"
                        value={start_date}
                        onChange={(e) => set_start_date(e.target.value)}
                        className={error ? s.input_error : s.company_input}
                    />
                    <input
                        type={input_end}
                        onFocus={() => set_input_end('date')}
                        onBlur={() => {
                            Date_valid();
                            if (!end_date) set_input_end('text');
                        }}
                        id="endDate"
                        name="endDate"
                        placeholder="Дата конца"
                        value={end_date}
                        onChange={(e) => set_end_date(e.target.value)}
                        className={error ? s.input_error : s.company_input}
                    />
                </div>
                {error && <div className={s.error_message}>{error}</div>}
            </div>
        </div>
    );
};

export default DateInput;