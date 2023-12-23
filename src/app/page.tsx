"use client";

import { useState } from "react";

import { FilterBar } from "./_componets/filter";
import { ItemList } from "./_componets/list";
import { ListPageLayout } from "./styles";
import { FilterType } from "~/types";

export default function List() {
  const [filterType, setFilterType] = useState<FilterType>({
    currentPageNumber: 0,
    isSale: false,
    isSoldOut: false,
    category: undefined
  });

  return (
    <ListPageLayout>
      <FilterBar filterType={filterType} setFilterType={setFilterType} />
      <ItemList filterType={filterType} setFilterType={setFilterType} />
    </ListPageLayout>
  );
}
