import Header from "@/components/Header";
import Center from "@/components/Center";
import { useContext, useState, useEffect } from "react";
import UserContext from "@/components/UserContext";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 40px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const { user, setUser, clearUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [fieldsRequired, setFieldsRequired] = useState(false);

  useEffect(() => {
    if (user) {
      const {
        name: existingName,
        email: existingEmail,
        address: existingAddress,
      } = user;
      setName(existingName || "");
      setEmail(existingEmail || "");
      setCity(existingAddress?.city || "");
      setPostalCode(existingAddress?.pincode || "");
      setCountry(existingAddress?.country || "");
    }
  }, [user]);

  useEffect(() => {
    if (fieldsRequired) {
      const timeout = setTimeout(() => {
        setFieldsRequired(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [fieldsRequired]);

  const router = useRouter();

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !city || !postalCode || !country) {
      setFieldsRequired(true);
      return;
    }
    if (name && email && city && postalCode && country) {
      const address = { city, pincode: postalCode, country };
      const data = { name, email, address };
      clearUser();
      const res = await axios.put("/api/auth/update", data);
      setUser(res.data?.updatedUser);
    }
  };
  return (
    <>
      <Header />
      <Center>
        <Box>
          <h2>Account details</h2>
          {/* {!user && (
            <>
              <p>Login first to access</p>
              <Button
                block="true"
                black="true"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </>
          )} */}
          <Input
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <CityHolder>
            <Input
              type="text"
              placeholder="City"
              value={city}
              name="city"
              onChange={(ev) => setCity(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              name="postalCode"
              onChange={(ev) => setPostalCode(ev.target.value)}
            />
          </CityHolder>
          <Input
            type="text"
            placeholder="Country"
            value={country}
            name="country"
            onChange={(ev) => setCountry(ev.target.value)}
          />
          <p
            style={{
              color: "red",
              display: fieldsRequired ? "block" : "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Fill all the fields !
          </p>
          <Button
            black="true"
            block="true"
            onClick={(e) => handleUpdateUser(e)}
          >
            Save
          </Button>
          <Button green="true" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Center>
    </>
  );
}
