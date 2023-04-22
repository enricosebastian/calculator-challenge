import Calculator from '@/components/Calculator';
import History from '@/components/History';
import styles from '@/styles/Home.module.scss'
import Mexp from 'math-expression-evaluator';
import { useEffect, useRef, useState } from 'react';

export default function Home({ipAddress}) {

  const [calculatorHistory, setCalculatorHistory] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [equationText, setEquationText] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [isHistoryPage, setIsHistoryPage] = useState(false);
  const [wasSolved, setWasSolved] = useState(false);

  const mexp = new Mexp();

  function submitEquation(equation) {
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

  const closeHistoryPage = () => {
    setIsHistoryPage(false);
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
      setWasSolved(false);

      let clickedButtons = document.getElementsByClassName(styles.is__clicked);

      for(let i=0; i<clickedButtons.length; i++) {
        clickedButtons[i].classList.remove(styles.is__clicked);
      }
    } else if(buttonName === "%") {
      const floatInputText = parseFloat(inputText)*.01;
      setEquationText(prevEquationText => prevEquationText.replace(inputText, floatInputText));
      setInputText(floatInputText);
    } else if(buttonName == "+" || buttonName == "-" || buttonName == "×" || buttonName == "÷") {
      button.classList.add(styles.is__clicked);
      setWasSolved(false);

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
      
    } else if(buttonName === "history") {

      setIsHistoryPage(true);
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
      submitEquation(equationText);
      let expression = equationText.replaceAll("×","*").replaceAll("÷","/");
      let lexed = mexp.lex(expression);
      let postfixed = mexp.toPostfix(lexed);  
      let result = mexp.postfixEval(postfixed);  
      setInputText(result);
      setWasSolved(true);
    } else {
      let clickedButtons = document.getElementsByClassName(styles.is__clicked);
      if(clickedButtons.length < 1) {
        if((equationText.includes("+") || equationText.includes("-") || equationText.includes("×") || equationText.includes("÷")) && inputText.length < 1) {
          setEquationText(buttonName);
          setInputText(buttonName);
        } else {
          if (wasSolved) {
            setEquationText("");
            setInputText(buttonName);
            setWasSolved(false);
          } else {
            setEquationText(prevValue => prevValue+buttonName);
            setInputText(prevValue => prevValue+buttonName);
          }
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

  return (
    <div className={styles.wrapper}>
      {
        (isHistoryPage)?
        <History calculatorHistory={calculatorHistory} closeHistoryPage={closeHistoryPage}/> :
        <Calculator 
          onClickButton={onClickButton} 
          inputText={inputText}
          equationText={equationText}
        />
      }
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