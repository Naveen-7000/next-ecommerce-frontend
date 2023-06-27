import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useState,useEffect } from "react";

export default function ProductsPage() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    (async()=>{
      const {products} = await fetch('/api/product').then(res=>res.json());
      setProducts(products);
    })()
  }, []);

  console.log(products,"product page");
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

