import React from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useColorMode, IconButton, Select } from "@chakra-ui/react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

import "../Styles/styles.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { toggleColorMode, colorMode } = useColorMode();

  const navigate = useNavigate();

  let UserData = JSON.parse(localStorage.getItem("UserData"));

  function logOutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    navigate("/login");
  }

  return (
    <div className="Navbar-Main">
      <div className="Navbar-One">
        <h1>SocioMeet</h1>
        <InputGroup cursor="no-drop">
          <Input placeholder="Search..." />
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        </InputGroup>
      </div>

      <div className="Navbar-Two">
        <IconButton
          aria-label="toggle theme"
          rounded="full"
          h="10"
          cursor="no-drop" // Change cursor style to 'not-allowed' for a disabled look
          pointerEvents="none"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        />
        <FaEnvelope size={40} cursor="no-drop" />
        <FaBell size={40} cursor="no-drop" />
        <FaQuestionCircle size={40} cursor="no-drop" />
        <Select
          variant="filled"
          placeholder={`Hi, ${UserData.firstName}`}
          onChange={logOutUser}
        >
          <option>Logout</option>
        </Select>
      </div>
    </div>
  );
}
