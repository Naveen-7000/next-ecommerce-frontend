import Header from "@/components/Header";
import Feature from "@/components/Feature";
import NewProducts from "@/components/NewProducts";
import { useContext } from "react";
import UserContext from "@/components/UserContext";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";

export default function HomePage() {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const {user} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
   (async()=>{
    const {featuredProduct, newProducts} = await fetch('/api/product').then(res=>res.json());
    setFeaturedProduct(featuredProduct);
    setNewProducts(newProducts);
   })()
  }, []);

  useEffect(()=>{
    if(user === null) {
      router.push("/login");
    }
  },[])
  console.log(featuredProduct,"userhome");

  return (
    <div>
      <Header />
      <Feature product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

// export async function getStaticProps() {
//   const featuredProductId =  '64917e6124a69896fe51d71f';
//   await mongooseConnect();
//   const featuredProduct = await Product.findById(featuredProductId);
//   const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});

//   if (user === null) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
//       newProducts: JSON.parse(JSON.stringify(newProducts)),
//     },
//   };
// }