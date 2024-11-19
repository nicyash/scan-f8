import React, { useRef, useEffect, useState } from 'react';
import { combine_data } from './Data';

import s from "./Table.module.css"
import GlobalSVGSelector from "../../../assets/icons/shared/GlobalSVGSelector";


const Table = ({ search, loading, error }) => {
    const [data, set_data] = useState([]);
    const [total_number, set_total_number] = useState(0);

    const table_scroll = useRef(null);

    useEffect(() => {
        if (table_scroll.current) {
            table_scroll.current.scrollLeft = 0;
        }
    }, [data]);

    useEffect(() => {
        if (search && !error) {

            const total_articles = search.data.find(histogram => histogram.histogramType === 'totalDocuments');
            if (total_articles) {
                const total = total_articles.data.reduce((acc, item) => acc + item.value, 0);
                set_total_number(total);
            }

            const final = combine_data(search.data);
            set_data(final);
        }
    }, [search, error]);

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300;
        if (table_scroll.current) {
            table_scroll.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className={s.table_container}>
            <h2 className={s.results_h2}>Общая сводка</h2>
            <p className={s.results_table_p}>Найдено данных: {total_number}</p>
            <div className={s.table_scroll_container}>
                <button className={s.scroll_button_left} onClick={() => scroll('left')}></button>
                <div className={s.table_wrapper_container}>
                    <div className={s.table_headers}>
                        <div className={s.period}>Период</div>
                        <div className={s.total}>Всего</div>
                        <div className={s.risks}>Риски</div>
                    </div>
                    <div className={s.table_wrapper} ref={table_scroll}>
                        {loading ? (
                            <div className={s.loading}>
                                <GlobalSVGSelector className={s.loading_icon} id={"loading_icon"} />
                                <p className={s.loading_info}>Загружаем данные...</p>
                            </div>
                        ) : error ? (
                            <div>
                                <p className={s.error_message}>Ошибка сервера. Попробуйте чуть позже или проверьте свой тариф.</p>
                            </div>
                        ) : (
                            <div className={s.table_data}>
                                {data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className={s.row}>
                                            <div className={s.item}>{item.period}</div>
                                            <div className={s.item}>{item.total}</div>
                                            <div className={s.item}>{item.risks}</div>
                                        </div>
                                        {index < data.length - 1 && <div className={s.item_divider}></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button className={s.scroll_button_right} onClick={() => scroll('right')}></button>
            </div>
        </div>
    );
};

export default Table;