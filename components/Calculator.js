import React from "react";
import styles from '@/styles/Home.module.scss'

export default function Calculator({onClickButton, inputText}) {
    return (
        <div className={styles.calculator__body__wrapper}>

            <div className={styles.calculator__equation__wrapper}>equation</div>
            <div className={styles.calculator__input__wrapper}>{inputText}</div>
            <div className={styles.calculator__buttons__wrapper}>


                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`} onClick={onClickButton}>
                    AC
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`} onClick={onClickButton}>
                    +/-
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`} onClick={onClickButton}>
                    %
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`} onClick={onClickButton}>
                    ÷
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    7
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    8
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    9
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`} onClick={onClickButton}>
                    ×
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    4
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    5
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    6
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`} onClick={onClickButton}>
                    -
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    1
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    2
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    3
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`} onClick={onClickButton}>
                    +
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    .
                </div>

                <div className={styles.buttons__box__wrapper} onClick={onClickButton}>
                    0
                </div>

                <div className={styles.buttons__box__wrapper} id="history" onClick={onClickButton}>
                    <svg id="history" className={styles.button__icon__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path id="history" d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" />
                    </svg>
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`} onClick={onClickButton}>
                    =
                </div>

                {/*  */}


            </div>
        </div>
    );
}