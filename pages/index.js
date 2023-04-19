import styles from '@/styles/Home.module.scss'
import { useEffect, useState } from 'react';

export default function Home({ipAddress}) {

  const [calculatorHistory, setCalculatorHistory] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  console.log(calculatorHistory);
  return (
    <>
      <form action="/api/calculator/insert" method="post">
        <input id = "form__input__equation" type="text"/>
        <button type="submit" onClick={submitHistory}>=</button>
      </form>
      
      <div>
        <ul>
          {calculatorHistory.map(history => <li key={history._id}>{history.equation}</li>)}

        </ul>
      </div>
    </>
    
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.API_URL}/api/ip`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { ipAddress: data.ipAddress } }
}