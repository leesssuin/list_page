import { Metadata } from "next";

import { getMetaData } from "~/utils/getMetaData";
import ProductDetail from "./_components/detail";
import { DetailPageContainer } from "./styles";
import ProductList from "~/mocks/item.json";

type PageParams = {
  id: number;
};

export const getData = (id: number) => {
  const productInfo = ProductList.find((item) => Number(id) === item.id);

  return productInfo;
};

export const generateMetadata = async ({
  params
}: {
  params: PageParams;
}): Promise<Metadata> => {
  const { id } = params;

  const productInfo = getData(id);

  return getMetaData({
    title: productInfo?.name,
    description: productInfo?.brand
  });
};

export default function DetailPage({ params }: { params: PageParams }) {
  const { id } = params;

  const productInfo = getData(id);

  return (
    <DetailPageContainer>
      <ProductDetail item={productInfo} />
    </DetailPageContainer>
  );
}
