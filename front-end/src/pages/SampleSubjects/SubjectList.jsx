import { Badge, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const DocumentIcon = () => (
  <Box as="span" w={5} h={5}>
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
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  </Box>
);

// Re-using helper function for badge colors
const getBadgeProps = (colorName) => {
  const colorMap = {
    blue: { colorScheme: "blue" },
    green: { colorScheme: "green" },
    purple: { colorScheme: "purple" },
    orange: { colorScheme: "orange" },
    red: { colorScheme: "red" },
    teal: { colorScheme: "teal" },
    pink: { colorScheme: "pink" },
    yellow: { colorScheme: "yellow" },
  };
  return colorMap[colorName] || { colorScheme: "gray" };
};

const SubjectListItem = ({ subject, isLast }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={isLast ? "0" : "1px"}
      borderColor={borderColor}
      _hover={{ bg: cardHoverBg }}
      transition="background 0.2s"
    >
      <Flex alignItems="center">
        <Badge
          {...getBadgeProps(subject.color)}
          px={2}
          py={1}
          borderRadius="md"
          fontSize="xs"
          fontWeight="medium"
          mr={3}
          minW="64px"
          textAlign="center"
        >
          {subject.code}
        </Badge>
        <Box>
          <Text fontWeight="medium" color={textColor}>
            {subject.name}
          </Text>
          <Text fontSize="sm" color={subTextColor}>
            {subject.professor}
          </Text>
        </Box>
      </Flex>
      <Flex alignItems="center" color={subTextColor}>
        <DocumentIcon />
        <Text fontSize="sm" ml={1}>
          {subject.assignments} assignments
        </Text>
      </Flex>
    </Box>
  );
};

export default SubjectListItem;
