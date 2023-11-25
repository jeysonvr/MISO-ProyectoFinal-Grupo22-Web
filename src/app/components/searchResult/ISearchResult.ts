export interface ICardResult {
  usuario: {
    email: string;
    id: number;
    nombre_completo: string;
  }
  id_pais?: number;
  country: string;
  idiomas: any;
  ctaLabel?: string;
  habilidadesTecnicas?: any;
}

export default interface ISearchResult {
  labelResults: string;
  results: ICardResult[];
  countryMetadata?: any;
  ctaLabel: string;
}
