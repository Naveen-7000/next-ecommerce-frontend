import React from "react";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import CategoryGrid from "@/components/CategoryGrid";
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from "react";

const Categories = () => {
  const [category,setCategory] = useState([]);
  const [commonProduct,setCommonProduct] = useState([]);

  useEffect(()=>{
    (async()=>{
      const {category,commonProduct} = await fetch('/api/category').then(res=>res.json());
      setCategory(category);
      setCommonProduct(commonProduct);
    })()
  },[]);

  console.log(category,"category",commonProduct,"commonProduct");

  return (
    <>
      <Header />
      <Center>
        {category?.length > 0 &&
          category?.map((categoryItem) => {
            return (
              <React.Fragment key={uuidv4()}>
                <Title >{categoryItem.name}</Title>
                <CategoryGrid
                  products={commonProduct}
                  category={categoryItem._id}
                />
              </React.Fragment>
            );
          })}
      </Center>
    </>
  );
};

export default Categories;
