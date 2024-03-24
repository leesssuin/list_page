"use client";

import styled from "styled-components";
import Image from "next/image";

import { Product } from "~/types";

const DetailContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;

  .image-container {
    position: relative;
    flex-basis: 300px;
    flex-grow: 1;
  }

  .information-container {
    flex-basis: 300px;
    flex-grow: 1;
    padding: 1rem 0 1rem 0;
    border-top: 2px solid #000000;

    .name {
      padding: 1rem 0 1rem 0;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .review {
      margin: 1rem 0 1rem 0;
      color: #757575;
      font-size: 0.85rem;
      text-decoration: underline;
    }

    .consumer-price {
      margin: 0.5rem 0 0.5rem 0;
      color: #abaaaa;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .discount-rate {
      margin-right: 0.75rem;
      color: #f54819;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .sell-price {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .delivery-container {
      margin: 1rem 0 1rem 0;
      padding: 1rem 0 1rem 0;
      border-top: 1px solid #abaaaa;

      .delivery-info {
        display: grid;
        grid-template-columns: 1fr 4fr;
        margin: 1rem 0 1rem 0;
      }
    }

    .button-container {
      display: flex;
      flex-grow: 1;
      gap: 1rem;
      margin: 1rem 0 1rem 0;
    }
  }
`;

const StyledImage = styled(Image)`
  position: relative !important;
  height: 100% !important;
`;

const Button = styled.div<{ background?: string; color?: string }>`
  padding: 1rem 0 1rem 0;
  width: 50%;
  border: 1px solid black;
  border-radius: 0.25rem;
  background: ${(props) => props.background || "#ffffff"};
  color: ${(props) => props.color || "#000000"};
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export default function ProductDetail({ item }: { item?: Product }) {
  const {
    image,
    brand,
    name,
    reviewCount,
    discountRate,
    consumerPrice,
    sellPrice
  } = item || {};

  return (
    <DetailContainer>
      <div className="image-container">
        {image && <StyledImage src={image} alt={`${name} ㅣ이미지`} fill />}
      </div>
      <div className="information-container">
        <div>{brand}</div>
        <div className="name">{name}</div>
        <div className="review">{reviewCount}개 리뷰 보기</div>
        {discountRate && (
          <div className="consumer-price">
            {consumerPrice?.toLocaleString()} 원
          </div>
        )}
        <div className="price-box">
          {discountRate && (
            <span className="discount-rate">{discountRate}%</span>
          )}
          {<span className="sell-price">{sellPrice?.toLocaleString()} 원</span>}
        </div>
        <div className="delivery-container">
          <div className="delivery-info">
            <div>배송정보</div>
            <div>일반 출고</div>
          </div>
          <div className="delivery-info">
            <div>배송비</div>
            <div>
              해당 브랜드 제품으로만 50000원 이상 구매시 무료배송 ( 미만시
              배송비 3000원 발생 )제주도를 포함한 도서/산간지역은 추가배송비
              3,500원
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button>장바구니 담기</Button>
          <Button background="#000000" color="#ffffff">
            바로 구매하기
          </Button>
        </div>
      </div>
    </DetailContainer>
  );
}
