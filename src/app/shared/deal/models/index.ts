export interface Deal {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export interface Filter {
  sortBy?: string;
  desc?: string;
  lowerPrice?: string;
  upperPrice?: string;
  metacritic?: string;
  store?: string;
  onSale?: boolean;
  title?: string;
  AAA?: boolean;
}
