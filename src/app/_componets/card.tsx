"use clinet";

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";

import { Product } from "~/types";

const CardContainer = styled.div`
  position: relative;

  .brand {
    padding: 0.5rem 0;
    font-weight: 600;
  }

  .name {
    height: 10%;
    word-break: keep-all;
  }

  .cunsumer-price {
    height: 5%;
    color: #dfdfdf;
  }

  .discount-rate {
    padding-right: 0.5rem;
    color: #f54819;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .sell-price {
    font-size: 1.05rem;
    font-weight: 700;
  }

  .heart-count {
    text-align: end;
  }
`;

const StyledImage = styled(Image)`
  position: relative !important;
  height: 68% !important;
`;

export const Card = ({ product }: { product: Product }) => {
  const router = useRouter();

  const {
    id,
    name,
    image,
    brand,
    consumerPrice,
    sellPrice,
    discountRate,
    isSoldOut,
    heartCount
  } = product;

  return (
    <CardContainer key={id} onClick={() => router.push(`/detail/${id}`)}>
      <StyledImage alt={`${name} 이미지`} src={image} fill />
      <div className="brand">{brand}</div>
      <div className="name">{name}</div>
      <div className="cunsumer-price">
        {consumerPrice === sellPrice
          ? " "
          : `${consumerPrice.toLocaleString()} 원`}
      </div>
      {isSoldOut ? (
        "품절"
      ) : (
        <div>
          {discountRate !== 0 && (
            <span className="discount-rate">{`${discountRate}%`}</span>
          )}
          <span className="sell-price">{sellPrice.toLocaleString()}</span> 원
        </div>
      )}
      <div className="heart-count">❤️ {heartCount}</div>
    </CardContainer>
  );
};
