import React, { useState, useEffect } from 'react';

import Article from './Article/Article';

import s from "./Articles.module.css"


function Articles({ articles }) {
    const [data, set_data] = useState([]);
    const [show_articles, set_show_articles] = useState(2);

    useEffect(() => {
        if (articles && Array.isArray(articles)) {
            const get_articles = articles.map(doc => ({
                date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
                url: doc.ok.url,
                sourceName: doc.ok.source.name,
                isTechNews: doc.ok.attributes.isTechNews,
                isAnnouncement: doc.ok.attributes.isAnnouncement,
                isDigest: doc.ok.attributes.isDigest,
                title: doc.ok.title.text,
                content: doc.ok.content.markup,
                wordCount: doc.ok.attributes.wordCount,
                picture: null,
            }));

            set_data(get_articles);
        }
    }, [articles]);

    const more_articles = () => {
        set_show_articles(prev => prev + 2);
    };

    return (
        <div className={s.articles_container}>
            <h2 className={s.articles_h2}>Список документов</h2>
            <div className={s.article}>
                {data.slice(0, show_articles).map((article, index) => (
                    <Article key={index} {...article} />
                ))}
            </div>
            {show_articles < data.length && (
                <div className={s.articles_button}>
                    <button className={s.more_articles} onClick={more_articles} >Показать больше</button>
                </div>
            )}
        </div>
    );
}

export default Articles;