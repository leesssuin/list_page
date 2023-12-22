"use client";

import styled from "styled-components";
import items from "~/mocks/item.json";
import { Card } from "./card";

const ListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const ItemList = () => {
  return (
    <ListSection>
      {items.map((item, idx) => (
        <Card product={item} key={idx} />
      ))}
    </ListSection>
  );
};
