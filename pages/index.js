import styles from '@/styles/Home.module.scss'
import { useEffect } from 'react';

export default function Home({data}) {
  const ipAddress = data.ipAddress;

  const submitHistory = (event) => {
    const input = document.getElementById("form__input__equation");
    const equation = input.value;

    event.preventDefault();

    fetch('/api/calculator/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ipAddress: ipAddress, equation: equation}),
    });
  }

  return (
    <>
      <form action="/api/calculator/insert" method="post">
        <input id = "form__input__equation" type="text"/>
        <button type="submit" onClick={submitHistory}>submit</button>
      </form>
      
      <div>hello world</div>
    </>
    
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.API_URL}/api/ip`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data } }
}