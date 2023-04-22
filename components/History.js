import React from "react";
import styles from '@/styles/History.module.scss'

import Mexp from 'math-expression-evaluator';

export default function History({calculatorHistory, closeHistoryPage}) {

    const mexp = new Mexp();

    const historyList = calculatorHistory.map(history => {

        let expression = history.equation.replaceAll("×","*").replaceAll("÷","/");
        let lexed = mexp.lex(expression);
        let postfixed = mexp.toPostfix(lexed);  
        let result = mexp.postfixEval(postfixed);  

        return (
        <div key={history._id} className={styles.history__entry__wrapper}>
            <div className={styles.history__equation__wrapper}>
                {history.equation}
            </div>
            <div className={styles.history__solution__wrapper}>
                = {result}
            </div>
        </div>
        );
    });
    
    return(
        <div className={styles.calculator__body__wrapper}>

            <div className={styles.calculator__header__wrapper}>
                <div className={styles.button__close__wrapper}>
                    <svg className={styles.button__close__svg} onClick={closeHistoryPage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-box-outline</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" /></svg>
                </div>
                <div className={styles.header__history__wrapper}>
                    History
                </div>
                <div className={styles.button__trash__wrapper}>
                    <svg className={styles.button__trash__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                </div>
            </div>
            <div className={styles.calculator__history__wrapper}>
                {historyList}
            </div>
        </div>

    );
    
}