import Header from "@/components/Header";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { useRouter } from "next/router";
import { useState } from "react";
import  {v4 as uuidv4} from "uuid";
import { useEffect } from "react";
import FilterContainer from "@/components/FilterContainer";
import Filters from "@/components/Filteres";
import FilterButton from "@/components/FiltereButton";
export default function CategoryProductsPage({products,category}) {

  const [color,setColor] = useState('all');
  const [storage,setStorage] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const colorOption = [{
    value: "all",
    label: "All",
  },
  {
    value: "Black",
    label: "Black",
  },
  {
    value: " Purple",
    label: "Purple",
  },{
    value: " Green",
    label: "Green",
  },
  {
    value: " Gray",
    label: "Gray",
  },
]

const storageOption = [
  {
    value: 'all',
    label : "All"
  },
  {
    value: '64',
    label: '64'
  },
  {
    value: '128',
    label: '128'
  },
  {
    value: '256',
    label: '256'
  },
  {
    value: '512',
    label: '512'
  },
  {
    value: '1TB',
    label: '1TB'
  },

]

  const router  = useRouter();
  const id = router?.query?.id;
  const pathName = category?.filter(category=>category._id === id);
  // const filteredProductsRef = useRef([]);

  const Products = products?.filter((product) => {
    return (
      product.category === id ||
      (product?.categoryData && product?.categoryData?.parent === id) ||
      (product?.parentCategoryData && product?.parentCategoryData?._id === id)
      );
    });


    const filterProducts = (color, storage) => {
      let filtered = Products;

      if (color !== 'all') {
        filtered = filtered.filter((product) => product.properties?.Color === color);
      }
      if (storage !== 'all') {
        filtered = filtered.filter((product) => product.properties?.['Storage(GB)'] === storage);
      }
      setFilteredProducts(filtered);
    };
    useEffect(()=>{
     filterProducts(color,storage);
    },[color,storage]);





  return (
    <>
      <Header />
      <Center>
        <FilterContainer>
        <Title>{pathName[0]?.name}</Title>
        <Filters>
        {
              pathName[0]?.name === 'Mobiles' &&   (
                <>
          <FilterButton value={color} onChange={e=>setColor(e.target.value)} style={{marginRight:10}}>
            {
                colorOption.map((colorOption)=>{
                  return (
                    <option key={uuidv4()} value={colorOption.value}>color: {colorOption.label}</option>
                  )
                })
            }
          </FilterButton>
          <FilterButton value={storage} onChange={e=>setStorage(e.target.value)}>
            {
                storageOption.map((storageOption)=>{
                  return (
                    <option key={uuidv4()} value={storageOption.value}>storage: {storageOption.label}</option>
                  )
                })
            }
          </FilterButton>
          </>
              )
          }
        </Filters>
        </FilterContainer>
        <ProductsGrid products={filteredProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const category = await Category.find({ parent: { $exists: false } }, null, {
    sort: { _id: 1 },
  });
  // const products = await Product.find({}, null, { sort: { _id: -1 } });
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
      // products: JSON.parse(JSON.stringify(products)),
      products: JSON.parse(JSON.stringify(commonProduct)),
    },
  };
}