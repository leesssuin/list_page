import { atom, selectorFamily } from "recoil";

import { chunkArray } from "~/utils/chunkArray";
import { Product } from "~/types";

export const productListState = atom<Product[]>({
  key: "productListState",
  default: []
});

export const pageNumberState = atom<number>({
  key: "pageNumberState",
  default: 0
});

export const isSoldOutState = atom<boolean>({
  key: "isSoldOutState",
  default: false
});

export const isSaleState = atom<boolean>({
  key: "isSaleState",
  default: false
});

export const categoryState = atom<undefined | string>({
  key: "categoryState",
  default: undefined
});

export const searchKeywordState = atom<undefined | string>({
  key: "searchKeywordState",
  default: undefined
});

export const filteredListState = selectorFamily({
  key: "filteredListState",
  get:
    (pageNumber: number) =>
    ({ get }) => {
      const list = get(productListState);
      const isSoldOut = get(isSoldOutState);
      const isSale = get(isSaleState);
      const category = get(categoryState);
      const searchKeyword = get(searchKeywordState);

      const initState = !isSale && !isSoldOut && !category && !searchKeyword;

      const filteredList = (() => {
        if (initState) {
          return list.filter((item) => !item.isSoldOut);
        }

        // 품절 미포함
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

        // 품절 포함
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

      for (let i = 0; i <= pageNumber; i++) {
        if (seperateList[i]) {
          combinedList = [...combinedList, ...seperateList[i]];
        }
      }

      return combinedList;
    }
});
