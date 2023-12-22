export type ProductInfo = {
  id: number;
  name: string;
  createAt: string;
  image: string;
  brand: string;
  consumerPrice: number;
  sellPrice: number;
  discountRate: number;
  isSoldOut: boolean;
  category: Array<string>;
  heartCount: number;
  reviewCount: number;
};
