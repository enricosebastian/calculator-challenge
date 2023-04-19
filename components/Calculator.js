import React from "react";
import styles from '@/styles/Home.module.scss'

export default function Calculator() {
    return (
        <div className={styles.calculator__body__wrapper}>
            <div className={styles.calculator__equation__wrapper}>equation</div>
            <div className={styles.calculator__answer__wrapper}>answer</div>
        </div>
    );
}