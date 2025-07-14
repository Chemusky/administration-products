import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const nameProductHandler = (e) => {
    setNewProduct({ ...newProduct, name: e.target.value });
  };

  const priceProductHandler = (e) => {
    setNewProduct({ ...newProduct, price: e.target.value });
  };

  const imageProductHandler = (e) => {
    setNewProduct({ ...newProduct, image: e.target.value });
  };

  const toast = useToast(); // se importa de chakra

  // llamada al endpoint de añadir productos
  const { createProduct } = useProductStore();

  const handlerAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    // se añade el toast
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    // se pone para limpiar el formulario tras completarlo (resetear el estado)
    setNewProduct({ name: "", price: "", image: "" });
  };
  // fin llamada al endpoint de añadir productos

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={nameProductHandler}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={priceProductHandler}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={imageProductHandler}
            />
            <Button colorScheme="blue" onClick={handlerAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
