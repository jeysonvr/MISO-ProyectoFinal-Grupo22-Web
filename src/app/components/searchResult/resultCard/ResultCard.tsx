import React from 'react';

import { ICardResult } from '../ISearchResult';

const ResultCard = ({ name }: ICardResult) => {
  return (
    <div>{name}</div>
  )
}

export default ResultCard;
