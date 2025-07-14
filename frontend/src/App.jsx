import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./Components/NavBar";

function App() {
  // Si en el navegador escribo /create, etc, me va enlazando a las diferentes páginas
  // el gray.100 es para el modo claro y el gray.900 para el modo oscuro

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
