import React from 'react';

import ResultCard from './resultCard/ResultCard';
import ISearchResult from './ISearchResult';

const SearchResult = ({ results }: ISearchResult) => {

  return (
    results?.map(({ name, desc }) => (
      <ResultCard name={name} desc={desc} />
    ))
  )
}

export default SearchResult;
