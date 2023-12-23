"use client";

import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { filteredListState, productListState } from "~/stores/product";
import { FilterType, Product, PropsFilter } from "~/types";
import ProductList from "~/mocks/item.json";
import { Card } from "./card";

const ListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  .last-ref {
    width: 100%;
    height: 200px;
  }
`;

export const ItemList = ({ filterType, setFilterType }: PropsFilter) => {
  const lastRef = useRef<HTMLDivElement>(null);

  const [productList, setProductList] = useRecoilState(productListState);
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

  useIntersectionObserver(([entry]) => {
    const totalPage = productList.length / 10;
    const hasNextPage = filterType.currentPageNumber < totalPage ? true : false;

    if (entry.isIntersecting && hasNextPage) {
      setFilterType((prevState: FilterType) => ({
        ...prevState,
        currentPageNumber: prevState.currentPageNumber + 1
      }));
    }
  }, lastRef);

  return (
    <ListSection>
      {renderList}
      <div ref={lastRef} className="last-ref" />
    </ListSection>
  );
};
