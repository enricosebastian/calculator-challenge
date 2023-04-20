import Calculator from '@/components/Calculator';
import styles from '@/styles/Home.module.scss'
import Mexp from 'math-expression-evaluator';
import { useEffect, useRef, useState } from 'react';

export default function Home({ipAddress}) {

  const [calculatorHistory, setCalculatorHistory] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [equationText, setEquationText] = useState("");
  const [previousValue, setPreviousValue] = useState("");

  const mexp = new Mexp();

  const submitHistory = (event) => {
    const input = document.getElementById("form__input__equation");
    const equation = input.value;
    input.value = "";

    event.preventDefault();

    fetch('/api/calculator/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ipAddress: ipAddress, equation: equation}),
    });

    setHasSubmitted(true);
  }

  const clearHistory = (event) => {
    fetch('/api/calculator/deleteAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ipAddress: ipAddress}),
    });

    setHasSubmitted(true);
  }

  const onClickButton = (event) => {
    let button = event.target;
    let buttonName = event.target.id;

    if(buttonName === "") {
      buttonName = event.target.innerText;
    }

    if(buttonName == "AC") {
      setInputText("");
      setEquationText("");
    } else if(buttonName == "+" || buttonName == "-" || buttonName == "×" || buttonName == "÷") {
      button.classList.add(styles.is__clicked);

      if(equationText.includes("+") || equationText.includes("-") || equationText.includes("×") || equationText.includes("÷")) {
        setEquationText(inputText+buttonName);
      } else if(equationText.includes(inputText)) {
        if(equationText.length >= 1) {
          setEquationText(prevValue => prevValue+buttonName);
        } else {
          button.classList.remove(styles.is__clicked);
        }
      } else {
        setEquationText(inputText+buttonName);
      }
      
    } else if(buttonName == "+/-") {
      let isNegative = parseFloat(inputText) < 0;
      setPreviousValue(inputText);

      if (isNegative) {
        // turn positive
        setInputText(inputText.replace("-",""));
        
      } else {
        // turn negative
        setInputText("-"+inputText);
      }
        
    } else if(buttonName == "=") {
      let expression = equationText.replaceAll("×","*").replaceAll("÷","/");
      let lexed = mexp.lex(expression);
      let postfixed = mexp.toPostfix(lexed);  
      let result = mexp.postfixEval(postfixed);  
      setInputText(result);
    } else {
      let clickedButtons = document.getElementsByClassName(styles.is__clicked);
      if(clickedButtons.length < 1) {
        if(equationText.includes("+") || equationText.includes("-") || equationText.includes("×") || equationText.includes("÷")) {
          setEquationText(buttonName);
          setInputText(buttonName);
        } else {
          setEquationText(prevValue => prevValue+buttonName);
          setInputText(prevValue => prevValue+buttonName);
        }
      } else {
        for(let i=0; i<clickedButtons.length; i++) {
          clickedButtons[i].classList.remove(styles.is__clicked);
        }

        setEquationText(prevValue => prevValue+buttonName);
        setInputText(buttonName);
      }
      
    }
  }

  useEffect(()=> {
    if(equationText.includes(previousValue)) {
      setEquationText(prevState => prevState.replace(previousValue, inputText));
    } else {
      setEquationText(inputText);
    }
  }, [previousValue]);

  useEffect(() => {
    if(hasSubmitted) setHasSubmitted(false);

    async function fetchData() {
      const response = await fetch('/api/calculator/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ipAddress: ipAddress}),
      });
  
      const data = await response.json();
      if(data) setCalculatorHistory(data.calculatorHistory);
    }

    fetchData();
  },[hasSubmitted]);

  // return (
  //   <>
  //     <form action="/api/calculator/insert" method="post">
  //       <input id = "form__input__equation" type="text"/>
  //       <button type="submit" onClick={submitHistory}>=</button>
  //     </form>
      
  //     <div>
  //       <ul>
  //         {calculatorHistory.map(history => <li key={history._id}>{history.equation}</li>)}
  //       </ul>
  //       <button type="submit" onClick={clearHistory}>clear</button>
  //     </div>
  //   </>
    
  // );

  return (
    <div className={styles.wrapper}>
      <Calculator 
        onClickButton={onClickButton} 
        inputText={inputText}
        equationText={equationText}
      />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.API_URL}/api/ip`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { ipAddress: data.ipAddress } }
}