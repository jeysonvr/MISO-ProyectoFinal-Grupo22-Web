'use client'

import { useEffect, useState } from 'react';

const SearchContainer = ({ labels, testFn }: any) => {

  const [value, setValue] = useState('');

  const getData = async () => {
    const email = JSON.parse(localStorage.getItem('user') || '{}').email;
    const response = await testFn(email);

    console.log('Test::', response);
    setValue(response);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>{labels.title}</h2>
      <p>{value}</p>
    </>
  )
}

export default SearchContainer;
