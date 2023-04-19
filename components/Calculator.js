import React from "react";
import styles from '@/styles/Home.module.scss'

export default function Calculator() {
    return (
        <div className={styles.calculator__body__wrapper}>

            <div className={styles.calculator__equation__wrapper}>equation</div>
            <div className={styles.calculator__input__wrapper}>input</div>
            <div className={styles.calculator__buttons__wrapper}>


                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`}>
                    AC
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`}>
                    +/-
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`}>
                    %
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    ÷
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    7
                </div>

                <div className={styles.buttons__box__wrapper}>
                    8
                </div>

                <div className={styles.buttons__box__wrapper}>
                    9
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    ×
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    4
                </div>

                <div className={styles.buttons__box__wrapper}>
                    5
                </div>

                <div className={styles.buttons__box__wrapper}>
                    6
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    -
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    1
                </div>

                <div className={styles.buttons__box__wrapper}>
                    2
                </div>

                <div className={styles.buttons__box__wrapper}>
                    3
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    +
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    .
                </div>

                <div className={styles.buttons__box__wrapper}>
                    0
                </div>

                <div className={styles.buttons__box__wrapper}>
                    c
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    =
                </div>

                {/*  */}


            </div>
        </div>
    );
}