import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import { UserProvider } from "@/components/UserContext";

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <UserProvider>
        <Component {...pageProps} />
        </UserProvider>
      </CartContextProvider>
    </>
  );
}