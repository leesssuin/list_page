import { GenerateMetaDataProps } from "~/types";

export const getMetaData = (metaDataProps?: GenerateMetaDataProps) => {
  const { title, description } = metaDataProps || {};

  const TITLE = title ? `가방 | ${title}` : "상품 리스트";
  const DESCRIPTION = description ? description : "가방";

  return {
    title: TITLE,
    description: DESCRIPTION
  };
};
