import styled from "styled-components";
import { useRouter } from "next/router";


const GrayBox = styled.button`
  background-color:#E5E4E2;
  padding: 25px;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border:none ;
  cursor:pointer;
`;

const Title = styled.p`
font-size:1rem ;
font-weight:500;
margin-right:5px ;
width:100% ;
`;




export default function ShowAll({route}) {
    const router = useRouter();
  return (
      <GrayBox onClick={()=>router.push(route)}>
        <Title>Show all</Title>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="5 0 30 24" strokeWidth={0.5} stroke="currentColor" className="w-3 h-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>

      </GrayBox>
  );
}