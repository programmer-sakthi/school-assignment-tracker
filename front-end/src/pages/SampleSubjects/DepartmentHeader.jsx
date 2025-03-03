import { Badge, Box, Button, Flex, Heading, HStack, Text, useColorModeValue } from "@chakra-ui/react";

const DepartmentHeader = ({ department, viewType, setViewType }) => {
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={8}
      flexDir={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 0 }}
    >
      <Box>
        <Heading fontSize="3xl" fontWeight="bold" color={textColor}>
          {department.name} Department
        </Heading>
        <Text color={subTextColor} mt={1}>
          {department.description}
        </Text>
        <HStack mt={3}>
          <Badge colorScheme="gray" px={2} py={1} borderRadius="md">
            {department.code}
          </Badge>
          <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
            {department.totalSubjects} Subjects
          </Badge>
        </HStack>
      </Box>

      <HStack spacing={2}>
        <Button
          px={3}
          py={2}
          borderRadius="md"
          variant={viewType === "grid" ? "solid" : "outline"}
          colorScheme={viewType === "grid" ? "blue" : "gray"}
          onClick={() => setViewType("grid")}
          size="sm"
        >
          Grid View
        </Button>
        <Button
          px={3}
          py={2}
          borderRadius="md"
          variant={viewType === "list" ? "solid" : "outline"}
          colorScheme={viewType === "list" ? "blue" : "gray"}
          onClick={() => setViewType("list")}
          size="sm"
        >
          List View
        </Button>
      </HStack>
    </Flex>
  );
};

export default DepartmentHeader;
