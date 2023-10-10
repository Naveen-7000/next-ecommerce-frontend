import Header from "@/components/Header";
import Feature from "@/components/Feature";
import NewProducts from "@/components/NewProducts";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function HomePage({featuredProduct, newProducts}) {

  return (
    <div>
          <Header />
          <Feature product={featuredProduct} />
          <NewProducts products={newProducts} />
    </div>
  );
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