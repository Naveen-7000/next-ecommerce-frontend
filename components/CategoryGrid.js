import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import ShowAll from "./ShowAll";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

const StyledCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom:10px ;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function CategoryGrid({category,products}) {

  const filteredProducts = products?.filter((product) => {
    return (
      product?.category === category ||
      (product?.categoryData && product?.categoryData?.parent === category) ||
      (product?.parentCategoryData && product?.parentCategoryData?._id === category)
      );
    });

    let productToShow;
    if(filteredProducts.length > 2){
      productToShow = filteredProducts.slice(0,3);
    }else if(filteredProducts.length > 1){
      productToShow = filteredProducts.slice(0,2);
    }else{
      productToShow = filteredProducts[0];
    }
  return (
    <StyledCategoryGrid>
      {productToShow?.length > 0 && productToShow?.map(product => (
        <React.Fragment key={uuidv4()}>
        <ProductBox {...product} />
        </React.Fragment>
      ))}
      <ShowAll route={`/categories/${category}`} />
    </StyledCategoryGrid>
  );
}
