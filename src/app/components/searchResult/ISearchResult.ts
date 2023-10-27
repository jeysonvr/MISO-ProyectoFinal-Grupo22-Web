export interface ICardResult {
  name: string;
  desc: string;
}

export default interface ISearchResult {
  labelResults: string;
  results: ICardResult[];
}
