import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth_ } from "../../provider/AuthProvider";


import Company_INN from "./Details/Company_INN";
import Tonality from "./Details/Tonality";
import Count from "./Details/Count";
import Date from "./Details/Date";
import Checkbox from "./Details/Checkbox";

import s from "./Search.module.css";
import GlobalSVGSelector from "../../assets/icons/shared/GlobalSVGSelector";

const Search = () => {
    const [company_INN, set_company_INN] = useState('');
    const [tonality, set_tonality] = useState('Любая');
    const [count, set_count] = useState('');
    const [start_date, set_start_date] = useState('');
    const [end_date, set_end_date] = useState('');
    const [checkbox, set_checkbox] = useState({
        max: false,
        mentions: false,
        main_role: false,
        risk_factors: false,
        market_news: true,
        announcements: true,
        news_summaries: true,
    });

    const { Authorized } = Auth_();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Authorized) {
            navigate('/auth');
        }
    }, [Authorized, navigate]);

    const [form_valid, set_form_valid] = useState(false);

    useEffect(() => {

        const valid = company_INN && count && start_date && end_date;
        set_form_valid(valid);
    }, [company_INN, count, start_date, end_date, checkbox]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;
        set_checkbox(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let choose_tonality;
        switch (tonality) {
            case 'Любая':
                choose_tonality = 'any';
                break;
            case 'Позитивная':
                choose_tonality = 'positive';
                break;
            case 'Негативная':
                choose_tonality = 'negative';
                break;
            default:
                choose_tonality = 'any';
        }

        if (form_valid) {

            const search = {
                issueDateInterval: {
                    startDate: `${start_date}T00:00:00+03:00`,
                    endDate: `${end_date}T23:59:59+03:00`
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [{
                            type: "company",
                            inn: company_INN,
                            maxFullness: checkbox.max,
                        }],
                        onlyMainRole: checkbox.main_role,
                        tonality: choose_tonality,
                        onlyWithRiskFactors: checkbox.risk_factors,
                    }
                },
                attributeFilters: {
                    excludeTechNews: !checkbox.market_news,
                    excludeAnnouncements: !checkbox.announcements,
                    excludeDigests: !checkbox.news_summaries,
                },
                limit: Number(count),
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: "month",
                histogramTypes: ["totalDocuments", "riskFactors"]
            };

            console.log('Request is sent!', search);

            navigate('/results', { state: { searchParams: search } });
        } else {
            console.log('Error. Form is not valid!');
        }
    };

    return (
        <div className={s.content}>
            <div className={s.search_title}>
                <div>
                    <h1 className={s.search_h1}>Найдите необходимые <br />данные в пару кликов.</h1>
                    <p className={s.search_p}>Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск</p>
                </div>
                <GlobalSVGSelector className={s.sheet} id={"sheet"} />
                <GlobalSVGSelector className={s.folder} id={"folder"} />
            </div>
            <div className={s.search_container}>
                <form onSubmit={handleSubmit} className={s.search_form}>
                    <div className={s.left_container}>
                        <Company_INN company_INN={company_INN} set_company_INN={set_company_INN} />
                        <Tonality tonality={tonality} set_tonality={set_tonality} />
                        <Count count={count} set_count={set_count} />
                        <Date start_date={start_date} set_start_date={set_start_date} end_date={end_date} set_end_date={set_end_date} />
                    </div>
                    <div className={s.right_container}>
                        <Checkbox checkbox={checkbox} handleCheckbox={handleCheckbox} />
                        <div className={s.submit_button_container}>
                            <button className={form_valid ? s.sub_button : s.sub_button_error} type="submit" disabled={!form_valid}>Поиск</button>
                            <p className={s.message}>* Обязательные к заполнению поля</p>
                        </div>
                    </div>
                </form>
                <GlobalSVGSelector className={s.look_image} id={"look_image"} />
            </div>
        </div>
    );
};

export default Search;