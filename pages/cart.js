import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { CartContext } from "@/components/CartContext";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }
  
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldsRequired, setFieldsRequired] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch cart products:", error);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // if url contains success = 1 then i want to clearCart and setIsSuccess to true
  useEffect(() => {
    if (router.query.success === "1") {
      setIsSuccess(true);
      clearCart();
    }
  }, [router.query.success]);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    // Validate if all required fields are filled
    if (!name || !email || !city || !postalCode || !streetAddress || !country) {
      setFieldsRequired(true);
      return;
    }
    setFieldsRequired(false);

    try {
      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Failed to submit checkout:", error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    
    for (const productId of cartProducts) {
      const price = products.find((p) => p._id === productId)?.price || 0;
      total += price;
    }
    
    return total;
  };

  const handleRedirect = () => {
    router.push("/");
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
              <Button onClick={handleRedirect}>
                Go back to home page
              </Button>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {cartProducts.filter((id) => id === product._id).length}
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        ₹
                        {cartProducts.filter((id) => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>₹{calculateTotalPrice()}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              {fieldsRequired && (
                <p style={{ color: "red", fontSize: 14, fontWeight: 600 }}>
                  Fill all the fields!
                </p>
              )}
              <Button black="true" block="true" onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
