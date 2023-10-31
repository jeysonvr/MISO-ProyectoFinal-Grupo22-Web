import React from 'react';

import ResultCard from './resultCard/ResultCard';
import ISearchResult from './ISearchResult';

const SearchResult = ({ results }: ISearchResult) => {

  return (
    results?.map(({ name, desc }, id) => (
      <ResultCard name={name} desc={desc} key={name + '-' + id} />
    ))
  )
}

export default SearchResult;
