import Header from "@/components/Header";
import Feature from "@/components/Feature";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useContext } from "react";
import UserContext from "@/components/UserContext";

export default function HomePage({featuredProduct,newProducts}) {
  const {user} = useContext(UserContext);

  if (user === null) {
    // You can return a redirect object directly in getServerSideProps
    return {
      redirect: {
        destination: "/login",
        permanent: false, // Set this to true if the redirect is permanent
      },
    };
  }else{
  return (
    <div>
      <Header />
      <Feature product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
  }
}

export async function getServerSideProps() {
  const featuredProductId =  '64917e6124a69896fe51d71f';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}