"use client";

import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { categoryState, isSaleState, isSoldOutState } from "~/stores";
import { SearchInput } from "./search";

const FilterBarContainer = styled.section`
  .category-container {
    padding: 2rem 0;

    .title {
      padding-bottom: 2rem;
      font-size: 2rem;
    }
  }
`;

const Category = styled.div`
  padding: 0.25rem 0;
  color: ${(props) => props.color};
  font-size: 1.25rem;
  cursor: pointer;
`;

export const FilterBar = () => {
  const setIsSale = useSetRecoilState(isSaleState);
  const setIsSoldOut = useSetRecoilState(isSoldOutState);
  const [clickedCategory, setClickedCategory] = useRecoilState(categoryState);

  const categoryList = [
    "전체",
    "EXCLUSIVE",
    "크로스백",
    "토트백",
    "숄더백",
    "백팩",
    "에코,캔버스백",
    "랩탑백"
  ];

  const handleCategoryButtonClick = (ev: React.MouseEvent<HTMLElement>) => {
    const event = ev.target as HTMLDivElement;

    setClickedCategory(event.id === "전체" ? undefined : event.id);
  };

  const handleCheckBoxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (name === "isSoldOut") {
      setIsSoldOut(checked);
    }

    if (name === "isSale") {
      setIsSale(checked);
    }
  };

  return (
    <FilterBarContainer>
      <div className="category-container">
        <h1 className="title">CATEGORY</h1>
        {categoryList.map((category, idx) => (
          <Category
            key={idx}
            color={category === clickedCategory ? "#F54419" : "#000000"}
            id={category}
            onClick={handleCategoryButtonClick}
          >
            {category}
          </Category>
        ))}
      </div>
      <div>
        <input
          type="checkbox"
          id="sold-out"
          name="isSoldOut"
          onChange={handleCheckBoxClick}
        />
        <label>품절상품 포함</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="sale"
          name="isSale"
          onChange={handleCheckBoxClick}
        />
        <label>할인상품만</label>
      </div>
      <SearchInput />
    </FilterBarContainer>
  );
};
