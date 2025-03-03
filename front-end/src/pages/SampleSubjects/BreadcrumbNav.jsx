import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";

const BreadcrumbNav = ({ department }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={bgColor} shadow="sm" borderBottom="1px" borderColor={borderColor}>
      <Container maxW="6xl" py={4}>
        <Breadcrumb fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink color={subTextColor} _hover={{ color: textColor }}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink color={subTextColor} _hover={{ color: textColor }}>
              Departments
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={textColor} fontWeight="medium">
              {department.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </Box>
  );
};

export default BreadcrumbNav;
