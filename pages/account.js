import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { useContext } from "react";
import UserContext from "@/components/UserContext";
import { useRouter } from "next/router";

export default function AccountPage() {
  const {clearUser} = useContext(UserContext);
  const router = useRouter();

  const handleLogout = ()=>{
    clearUser();
    router.push("/");
  }
  return (
    <>
      <Header />
      <Center>
        <Title>Account</Title>
        <button onClick={handleLogout}>Logout</button>  
      </Center>
    </>
  );
}
