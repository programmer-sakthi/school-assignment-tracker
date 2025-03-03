import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const EmptyState = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const EmptyStateIcon = () => (
    <Box color={subTextColor} w="64px" h="64px" mx="auto" mb={4}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </Box>
  );

  return (
    <Box
      textAlign="center"
      py={12}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <EmptyStateIcon />
      <Heading fontSize="xl" fontWeight="medium" color={textColor} mb={2}>
        No subjects found
      </Heading>
      <Text color={subTextColor}>Try adjusting your search or filters</Text>
    </Box>
  );
};

export default EmptyState;
