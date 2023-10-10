import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import { UserProvider } from "@/components/UserContext";
import StyledComponentsRegistry from "@/lib/registry";

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
      <CartContextProvider>
        <UserProvider>
      <GlobalStyles />
        <Component {...pageProps} />
        </UserProvider>
      </CartContextProvider>
    </>
  );
}