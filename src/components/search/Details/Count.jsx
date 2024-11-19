import React, { useState, useEffect } from 'react';

import s from "./Count.module.css";
import "./Details_var.css"

const Count = ({ count, set_count }) => {
    const [error, set_error] = useState('');

    const Count_valid = () => {
        const this_count = parseInt(count, 10);

        if (!count) {
            set_error("Обязательное поле");
        } else if (isNaN(this_count) || this_count < 1) {
            set_error("Введите корректные данные");
        } else if (this_count > 1000) {
            set_error("Введите корректные данные");
        } else {
            set_error("");
        }
    };

    useEffect(() => {
        Count_valid();
    }, [count]);

    return (
        <div className={s.form_field_inputs}>
            <label className={s.lab} htmlFor="documentCount">Количество документов в выдаче <span className={error ? "required error" : "required"}>*</span></label>
            <input
                type="number"
                id="documentCount"
                name="documentCount"
                className={error ? s.input_error : s.company_input}
                value={count}
                onChange={(e) => {
                    const this_value = e.target.value;
                    set_count(this_value);
                    Count_valid();
                }}
                onBlur={Count_valid}
                placeholder="от 1 до 1000"
            />
            {error && <div className={s.error_message}>{error}</div>}
        </div>
    );
};

export default Count;