import { atom, selector, selectorFamily } from "recoil";

import { chunkArray } from "~/utils/chunkArray";
import { FilterType, Product } from "~/types";

export const productListState = atom<Product[]>({
  key: "productListState",
  default: []
});

export const pageState = atom<number>({
  key: "pageState",
  default: 0
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
      const { currentPageNumber, isSale, isSoldOut, category } = params;

      const list = get(productListState);

      const initState = !isSale && !isSoldOut && !category;

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

            return saleCondition && categoryCondition;
          });
        }

        return list.filter((item) => {
          const soldOutCondition = !isSoldOut || list;
          const saleConition = !isSale || item.discountRate !== 0;
          const categoryCondition =
            !category || item.category.includes(category);

          return soldOutCondition && saleConition && categoryCondition;
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
