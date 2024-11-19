import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth_ } from '../../provider/AuthProvider';


import Table from './Table/Table';
import Articles from './Articles/Articles';

import s from  './Results.module.css';
import GlobalSVGSelector from "../../assets/icons/shared/GlobalSVGSelector";

const Results = () => {
    const location = useLocation();
    const [loading, set_loading] = useState(true);
    const [search, set_search] = useState(null);
    const [articles, set_articles] = useState(null);
    const [error, set_error] = useState(false);

    const { Authorized } = Auth_();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Authorized) {
            navigate('/auth');
        }
    }, [Authorized, navigate]);

    useEffect(() => {
        const fetchResults = async () => {
            const searchParams = location.state?.searchParams;
            if (!searchParams) {
                console.error('Search parameters are missing.');
                set_loading(false);
                return;
            }

            set_loading(true);
            set_error(false);

            try {

                const histograms = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify(searchParams),
                    credentials: 'omit',
                });

                if (!histograms.ok) {
                    throw new Error(`HTTP error! status: ${histograms.status}`);
                }

                const histograms_data = await histograms.json();


                const IDs_Response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify(searchParams),
                    credentials: 'omit',
                });

                if (!IDs_Response.ok) {
                    throw new Error(`HTTP error! status: ${IDs_Response.status}`);
                }

                const IDs_data = await IDs_Response.json();
                const IDs = IDs_data.items.map(item => item.encodedId);

                console.log("Number of articles:", IDs.length);


                const Articles_Response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify({ ids: IDs }),
                    credentials: 'omit',

                });

                const articles = await Articles_Response.json();

                set_search(histograms_data);
                set_articles(articles);
            } catch (error) {
                console.error("Request error!:", error.message);
                set_error(true);
            } finally {
                set_loading(false);
            }
        };

        fetchResults();

    }, [JSON.stringify(location.state?.searchParams)]);


    return (
        <div className={s.results_container}>
            {loading && (
                <>
                    <div className={s.results_title_container}>
                        <div>
                            <h1 className={s.results_h1}>Ищем. Скоро будут результаты</h1>
                            <p className={s.results_p}>Поиск может занять некоторое время, просим сохранять терпение.</p>
                        </div>
                        <GlobalSVGSelector className={s.results_picture} id={"results_picture"} />
                    </div>
                    <Table search={search} loading={loading} set_loading={set_loading}/>
                </>
            )}
            {!loading && error && (
                <>
                    <Table search={search} loading={loading} set_loading={set_loading} error={error}/>
                </>
            )}
            {!loading && !error && (
                <>
                    <Table search={search} loading={loading} set_loading={set_loading} error={error}/>
                    <Articles articles={articles}/>
                </>
            )}
        </div>
    );
}

export default Results;