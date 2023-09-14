import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext, useEffect,useState} from "react";
import {CartContext} from "@/components/CartContext";

const ProductWrapper = styled.div`
  margin-bottom:10px ;
`;

const ProductImg = styled.img`
transform:scale(1.2) ;
`

const ImageWrapper = styled.div`
&:hover ${ProductImg}{
  transition:0.3s ease-in-out ;
  transform:scale(1.4);
}`

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: left;
  @media screen and (min-width: 768px) {
    font-size: 1rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct, cartProducts} = useContext(CartContext);
  const url = '/product/'+_id;
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  useEffect(()=>{
       const added = cartProducts.find(product => product === _id);
       console.log(added,"_id",cartProducts,_id);
  },[]);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <ImageWrapper>
          <ProductImg src={images?.[0]} alt="product image"/>
        </ImageWrapper>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title.length > 21 ? title.slice(0,21) : title}</Title>
        <PriceRow>
          <Price>
           ₹{price}
          </Price>
          <Button block="true" onClick={() => addProduct(_id)} primary="true" outline="true">
           {
            cartProducts.includes(_id) ? "Check Cart" : "Add to cart"
           }
            {/* Add to cart */}
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}