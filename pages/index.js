import styles from '@/styles/Home.module.scss'
import { useEffect } from 'react';

export default function Home({data}) {
  console.log(data);

  return (
    <div>hello world</div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.API_URL}/api/ip`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data } }
}