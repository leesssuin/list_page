"use client";

import React, { useEffect } from "react";
import styled from "styled-components";

import { FilterType, PropsFilter } from "~/types";
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

export const FilterBar = ({ filterType, setFilterType }: PropsFilter) => {
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

    setFilterType((prevState: FilterType) => ({
      ...prevState,
      category: event.id === "전체" ? undefined : event.id
    }));
  };

  const handleCheckBoxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterType((prevState: FilterType) => ({
      ...prevState,
      [event.target.name]: event.target.checked
    }));
  };

  useEffect(() => {}, [
    filterType.currentPageNumber,
    filterType.isSoldOut,
    filterType.isSale
  ]);

  return (
    <FilterBarContainer>
      <div className="category-container">
        <h1 className="title">CATEGORY</h1>
        {categoryList.map((category, idx) => (
          <Category
            key={idx}
            color={category === filterType.category ? "#F54419" : "#000000"}
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
      <SearchInput filterType={filterType} setFilterType={setFilterType} />
    </FilterBarContainer>
  );
};
