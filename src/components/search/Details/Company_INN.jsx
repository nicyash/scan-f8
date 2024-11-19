import React, { useState, useEffect } from 'react';

import s from "./Company_INN.module.css";
import "./Details_var.css"

const Company_INN = ({ company_INN, set_company_INN }) => {
    const [error, set_error] = useState('');

    const INN_valid = (inn) => {
        let this_error = {message: '' };
        let result = false;

        if(inn.toString().length >= 11) {
            this_error.message = 'Введите корректные данные';
        } else if (isNaN(inn)) {
            this_error.message = 'Введите корректные данные';
        } else if (!inn.length) {
            this_error.message = 'Обязательное поле';}

        set_error(this_error.message);
        return result;
    };

    useEffect(() => {
        INN_valid(company_INN);
    }, [company_INN]);

    return (
            <div className={s.form_field_inputs}>
                <label className={s.lab} htmlFor="companyINN">ИНН компании <span
                    className={error ? "required error" : "required"}>*</span></label>
                <input
                    type="text"
                    id="companyINN"
                    name="companyINN"
                    className={error ? s.input_error : s.company_input}
                    value={company_INN}
                    onChange={(e) => set_company_INN(e.target.value)}
                    onBlur={() => INN_valid(company_INN)}
                    placeholder="10 цифр"
                />
                {error && <div className={s.error_message}>{error}</div>}
            </div>
    );
};

export default Company_INN;