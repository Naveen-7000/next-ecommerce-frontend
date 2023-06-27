import React from "react";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import CategoryGrid from "@/components/CategoryGrid";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { v4 as uuidv4 } from 'uuid';

const Categories = ({ category, commonProducts }) => {
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
                  products={commonProducts}
                  category={categoryItem._id}
                />
              </React.Fragment>
            );
          })}
      </Center>
    </>
  );
};

export async function getServerSideProps() {
  await mongooseConnect();
  const category = await Category.find({ parent: { $exists: false } }, null, {
    sort: { _id: 1 },
  });
  const commonProduct = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    {
      $unwind: "$categoryData",
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryData.parent",
        foreignField: "_id",
        as: "parentCategoryData",
      },
    },
    {
      $match: {
        $or: [
          { category: { $exists: true } },
          { "categoryData.parent": { $exists: true } },
          { "parentCategoryData._id": { $exists: true } },
        ],
        _id: { $exists: true }, // Added condition for _id field
      },
    },
  ]);

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      commonProducts: JSON.parse(JSON.stringify(commonProduct)),
    },
  };
}

export default Categories;
