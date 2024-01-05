"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { filteredListState, pageNumberState, searchKeywordState } from "~/stores";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0;

  .search-button {
    padding-left: 0.25rem;
  }
`;

const Search = styled.input`
  width: 80%;
  height: 100%;
  padding-left: 10px;
  border: 0;
  background-color: #eaeaea;
  outline: none;
`;

const AutoSearchContainer = styled.div`
  position: absolute;
  width: 73%;
  height: 10rem;
  top: 40px;
  border: 1px solid;
  z-index: 3;
  background-color: #ffffff;
`;

const AutoSearchData = styled.div`
  position: relative;
  width: 100%;
  padding: 0.75rem 0 0.75rem 0.5rem;
  z-index: 4;
  list-style-type: none;

  &:hover {
    color: #f54819;
    cursor: pointer;
  }
`;

export const SearchInput = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchedData, setSearchedData] = useState<string[]>([]);

  const pageNumber = useRecoilValue(pageNumberState);
  const filteredList = useRecoilValue(filteredListState(pageNumber));
  const setSearchKeyword = useSetRecoilState(searchKeywordState);

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  const handleKeywordClick = (ev: React.MouseEvent<HTMLElement>) => {
    const event = ev.target as HTMLDivElement;

    setSearchKeyword(event.id);
  };

  const searchData = () => {
    filteredList.flatMap((products) => {
      if (products.name.includes(keyword)) {
        setSearchedData((prevState) => [...prevState, products.name]);
      }

      if (products.brand.includes(keyword)) {
        setSearchedData((prevState) => [...prevState, products.brand]);
      }
    });
  };

  const renderKeyword = (() => {
    const uniqueKeyword = Array.from(new Set(searchedData));

    if (uniqueKeyword.length) {
      return uniqueKeyword.map((keyword: string, idx: number) => (
        <AutoSearchData id={keyword} key={idx} onClick={handleKeywordClick}>
          {keyword.length > 20 ? `${keyword.slice(0, 20)}...` : keyword}
        </AutoSearchData>
      ));
    }
  })();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword.length) {
        searchData();
      }

      if (!keyword.length) {
        setSearchedData([]);
        setSearchKeyword(undefined);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [keyword]);

  return (
    <SearchContainer>
      <Search placeholder="SEARCH" onChange={onChangeInput} />
      {keyword.length > 0 && (
        <AutoSearchContainer>{renderKeyword}</AutoSearchContainer>
      )}
    </SearchContainer>
  );
};
