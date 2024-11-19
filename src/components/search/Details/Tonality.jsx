import React from 'react';

import s from "./Tonality.module.css";

const Tonality = ({ tonality, set_tonality }) => {
    return (
        <div className={s.form_field && s.form_field_inputs}>
            <label htmlFor="tonality">Тональность</label>
            <div className={s.tonality_wrapper}>
                <select className={s.sel} id="tonality" name="tonality" value={tonality} onChange={(e) => set_tonality(e.target.value)}>
                    <option className={s.opt} value="Любая">Любая</option>
                    <option className={s.opt} value="Позитивная">Позитивная</option>
                    <option className={s.opt} value="Негативная">Негативная</option>
                </select>
            </div>
        </div>
    );
};

export default Tonality;