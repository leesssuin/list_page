"use client";

import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { filteredListState, productListState, pageNumberState } from "~/stores/product";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import ProductList from "~/mocks/item.json";
import { Product } from "~/types";
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

export const ItemList = () => {
  const lastRef = useRef<HTMLDivElement | null>(null);

  const [productList, setProductList] = useRecoilState(productListState);
  const [currentPageNumber, setCurrentPageNumber] = useRecoilState(pageNumberState);
  const filteredList = useRecoilValue(filteredListState(currentPageNumber));

  const renderList = (() => {
    if (!filteredList) {
      return;
    }

    return filteredList.map((item: Product, idx: number) => (
      <Card product={item} key={idx} />
    ));
  })();

  useIntersectionObserver(([entry]) => {
    const totalPage = productList.length / 10;
    const hasNextPage = currentPageNumber < totalPage ? true : false;
    
    if (entry.isIntersecting && hasNextPage) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  }, lastRef);
  
  useEffect(() => {
    setProductList(ProductList);
  }, []);

  return (
    <ListSection>
      {renderList}
      <div ref={lastRef} className="last-ref" />
    </ListSection>
  );
};
