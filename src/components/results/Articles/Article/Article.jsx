import React, { useEffect, useState } from 'react';

import s from "./Article.module.css"

import article_image_1 from '../../../../assets/images/article_image_1.png';
import article_image_2 from '../../../../assets/images/article_image_2.png';

const images = [
    article_image_1,
    article_image_2,
];


function RawHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function FinalHtml(html_content) {
    const rawHtml = RawHtml(html_content);
    const finalHtml = rawHtml.replace(/(<([^>]+)>)/gi, "");
    return finalHtml;
}

const Article = (props) => {

    const [content, set_content] = useState('');

    useEffect(() => {

        set_content(FinalHtml(props.content)) ;
    }, [props.content]);

    const label = props.isTechNews ? "Технические новости" : props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";

    const [randomImage, setRandomImage] = useState("");

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    };

    useEffect(() => {
        getRandomImage();
    }, []);

    return (
        <div className={s.article_container}>
            <div className={s.article_data}>
                <span className={s.article_date}>{props.date}</span>
                <a href={props.url} className={s.article_source}>{props.sourceName}</a>
            </div>
            <h3 className={s.article_title}>{props.title}</h3>
            <div className={s.article_label}>{label}</div>
                <img src={randomImage} alt="article_picture" className={s.article_picture} />
                <p className={s.article_content}>{content}</p>
            <div className={s.article_footer}>
                <a href={props.url} className={s.read_more}>Читать в источнике</a>
                <span className={s.count_words}>{props.wordCount} слова</span>
            </div>
        </div>
    );
};

export default Article;