import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import UserContext from "../components/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
  const {user,setUser} = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [pinCode,setPinCode] = useState('');
  const [country,setCountry] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();


  const clearState=()=>{
    setName('');
    setEmail('');
    setCity('');
    setPinCode('');
    setCountry('');
    setPassword('');
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    setLoading(true);
    const address = {city,pincode:pinCode,country};
    const data = {name,email,address,password};
    const res = await axios.post("/api/auth/register",data);
    setUser(res?.data?.newUser);
    setIsRegister(false);
    clearState();
    setLoading(false);
    router.push("/");
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    const data = {email,password};
    const res = await axios.post('/api/auth/login',data);
    console.log(res.data,"login");
    setUser(res.data?.user);
    clearState();
    setLoading(false);
    router.push("/");
  }

  return (
    <Container>
      <FormContainer>
        <FormTitle>Welcome to ecommerce</FormTitle>
          {
            !isRegister ? (
              <>
              <Form onSubmit={(e)=>handleLogin(e)}>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </FormGroup>
          {
            loading ? <Button disabled>Loading...</Button> : <Button type="submit">Login</Button>
          }
          <Button onClick={()=>setIsRegister(true)} >Dont have account</Button>
          </Form>
           </>
            ) : (
           <>
           <Form onSubmit={(e)=>handleRegister(e)}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
          </FormGroup>
          <FormGroup>
            <Label>Pincode</Label>
            <Input type="text" value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>Country</Label>
            <Input type="text" value={country} onChange={(e)=>setCountry(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </FormGroup>
          {
            loading ? <Button disabled>Loading...</Button> : <Button type="submit">Register</Button>
          }
          <Button onClick={()=>setIsRegister(false)} >Already have account</Button>
          </Form>
          </>
            )
          }
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #222222;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display:flex ;
  flex-direction: column;
`;

const Label = styled.label`
  color: gray;
`;

const Input = styled.input`
  border: 1px solid gray;
  padding: 5px;
  border-radius:6px ;
`;

const Button = styled.button`
  background-color: #222222;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  margin-bottom:15px;
`;

export default LoginPage;
