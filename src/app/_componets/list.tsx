"use client";

import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { filteredListState, productListState } from "~/stores/product";
import { FilterType, Product } from "~/types";
import ProductList from "~/mocks/item.json";
import { Card } from "./card";

const ListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const ItemList = ({ filterType }: { filterType: FilterType }) => {
  const setProductList = useSetRecoilState(productListState);
  const filteredList = useRecoilValue(filteredListState(filterType));

  const renderList = (() => {
    if (!filteredList) {
      return;
    }

    return filteredList.map((item: Product, idx: number) => (
      <Card product={item} key={idx} />
    ));
  })();

  useEffect(() => {
    setProductList(ProductList);
  }, []);

  return <ListSection>{renderList}</ListSection>;
};
