import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import React from "react";

function NavBar() {
  // para el modo claro/oscuro se declara una variable de estado con {} con un hook propio de Chakra Ui
  // abajo se añade al evento onClick y se utiliza el operador ternario
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxWidth={"1140px"} px={4}>
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          {/* Nos enlaza a HomePage.jsx */}
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          {/* Nos enlaza a CreatePage.jsx */}
          <Link to={"/create"}>
            <Button title="Add Product">
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button title="Dark/Light Mode" onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;
