import React from "react";

export interface Product {
  id: number;
  name: string;
  createAt: string;
  image: string;
  brand: string;
  consumerPrice: number;
  sellPrice: number;
  discountRate: number;
  isSoldOut: boolean;
  category: Array<string>;
  heartCount: number;
  reviewCount: number;
}

export interface PropsFilter {
  filterType: FilterType;
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
}

export type PriceFilter = {
  minPrice: number;
  maxPrice: number;
};

export type FilterType = {
  currentPageNumber: number;
  isSale: boolean;
  isSoldOut: boolean;
  category: undefined | string;
  searchKeyword: undefined | string;
};
