"use client";

import { FilterBar } from "./_componets/filter";
import { ItemList } from "./_componets/list";
import { ListPageLayout } from "./styles";

export default function List() {
  return (
    <ListPageLayout>
      <FilterBar />
      <ItemList />
    </ListPageLayout>
  );
}
