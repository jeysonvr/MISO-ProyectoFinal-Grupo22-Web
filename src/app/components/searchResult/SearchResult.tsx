import React from 'react';

import ResultCard from './resultCard/ResultCard';
import ISearchResult from './ISearchResult';

const SearchResult = ({ results, countryMetadata, ctaLabel }: ISearchResult) => {
  return (
    <div className='m-auto'>
      {results?.map(({ usuario, id_pais, idiomas }) => (
        <ResultCard
          usuario={usuario}
          key={usuario.id}
          country={countryMetadata?.find((country: any) => country.id == id_pais)?.pais}
          idiomas={idiomas}
          ctaLabel={ctaLabel}
        />
      ))}
    </div>
  )
}

export default SearchResult;
