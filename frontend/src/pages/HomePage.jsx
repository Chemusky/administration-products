import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";

function HomePage() {
  // inicio fetch del listado de productos
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("productos: ", products);
  // fin fetch del listado de productos

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        {/* Código para cuando no existan los productos en la BB.DD */}
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              {/* Link que necesita react-router-dom para funcionar */}
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
