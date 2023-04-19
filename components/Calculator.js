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
                    b
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__function}`}>
                    b
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    b
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    b
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    b
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    b
                </div>

                {/*  */}

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={styles.buttons__box__wrapper}>
                    b
                </div>

                <div className={`${styles.buttons__box__wrapper} ${styles.button__box__operator}`}>
                    b
                </div>

                {/*  */}


            </div>
        </div>
    );
}