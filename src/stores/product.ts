import { atom, selector, selectorFamily } from "recoil";

import { chunkArray } from "~/utils/chunkArray";
import { FilterType, Product } from "~/types";

export const productListState = atom<Product[]>({
  key: "productListState",
  default: []
});

export const categoryState = selector({
  key: "categoryState",
  get: ({ get }) => {
    const productList = get(productListState);

    const categoryList = Array.from(
      new Set(productList.flatMap((item) => item.category))
    );

    return categoryList;
  }
});

export const filteredListState = selectorFamily({
  key: "filteredListState",
  get:
    (params: FilterType) =>
    ({ get }) => {
      const { currentPageNumber, isSale, isSoldOut, category, searchKeyword } =
        params;

      const list = get(productListState);

      const initState = !isSale && !isSoldOut && !category && !searchKeyword;

      const filteredList = (() => {
        if (initState) {
          return list.filter((item) => !item.isSoldOut);
        }

        if (!isSoldOut) {
          return list.filter((item) => {
            const saleCondition =
              !isSale || (item.discountRate !== 0 && !item.isSoldOut);
            const categoryCondition =
              !category ||
              (item.category.includes(category) && !item.isSoldOut);
            const searchCondition =
              !searchKeyword ||
              item.name.includes(searchKeyword) ||
              (item.brand.includes(searchKeyword) && !item.isSoldOut);

            return saleCondition && categoryCondition && searchCondition;
          });
        }

        return list.filter((item) => {
          const soldOutCondition = !isSoldOut || list;
          const saleConition = !isSale || item.discountRate !== 0;
          const categoryCondition =
            !category || item.category.includes(category);
          const searchCondition =
            !searchKeyword ||
            item.name.includes(searchKeyword) ||
            item.brand.includes(searchKeyword);

          return (
            soldOutCondition &&
            saleConition &&
            categoryCondition &&
            searchCondition
          );
        });
      })();

      const seperateList = chunkArray(filteredList, 9);

      let combinedList: Product[] = [];

      for (let i = 0; i <= currentPageNumber; i++) {
        if (seperateList[i]) {
          combinedList = [...combinedList, ...seperateList[i]];
        }
      }

      return combinedList;
    }
});
