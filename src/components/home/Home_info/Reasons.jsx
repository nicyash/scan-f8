import React from 'react';

import s from "./Info.module.css";

import GlobalSVGSelector from "../../../assets/icons/shared/GlobalSVGSelector";
import move_arrow from "../../../assets/icons/move_arrow.svg";
import watch from "../../../assets/icons/watch.svg";
import shield from "../../../assets/icons/shield.svg";
import magnifier from "../../../assets/icons/magnifier.svg";


const Reasons = () => {

    const move_around = React.useRef(null);

    const scrollLeft = () => {
        if (move_around.current) {
            move_around.current.scrollLeft -= window.innerWidth / 3;
        }
    };

    const scrollRight = () => {
        if (move_around.current) {

            move_around.current.scrollLeft += window.innerWidth / 3;
        }
    };

    return (
        <div className={s.reasons}>
            <h2>Почему именно мы</h2>
            <div className={s.move}>
                <div className={s.move_left} onClick={scrollLeft}>
                    <img src={move_arrow} alt="arrow" role="button"/>
                </div>
                <div className={s.content} ref={move_around}>
                    <div className={s.item}>
                        <img className={s.icon} src={shield} alt="shield" />
                        <p>Защита конфеденциальных сведений, <br/>не подлежащих разглашению по <br/>федеральному
                            законодательству</p>
                    </div>
                    <div className={s.item}>
                        <img className={s.icon} src={watch} alt="watch" />
                        <p>Высокая и оперативная скорость <br/>обработки заявки</p>
                    </div>
                    <div className={s.item}>
                        <img className={s.icon} src={magnifier} alt="magnifier" />
                        <p>Огромная комплексная база <br/>данных, обеспечивающая <br/>объективный ответ на запрос</p>
                    </div>
                    <div className={s.item}>
                        <img className={s.icon} src={shield} alt="shield" />
                        <p>Защита конфеденциальных сведений, <br/>не подлежащих разглашению по <br/>федеральному
                            законодательству</p>
                    </div>
                    <div className={s.item}>
                    <img className={s.icon} src={watch} alt="watch" />
                        <p>Высокая и оперативная скорость <br />обработки заявки</p>
                    </div>
                </div>
                <div className={s.move_right} onClick={scrollRight}>
                    <img src={move_arrow} alt="arrow" role="button"/>
                </div>
            </div>
            <div className={s.image_container}>
                <GlobalSVGSelector className={s.image} id={"image"} />
            </div>
        </div>
    )
}

export default Reasons