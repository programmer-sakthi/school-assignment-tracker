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

const isHexColor = (color) => {
  return typeof color === "string" && color.startsWith("#");
};

const SubjectBadge = ({ color, children }) => {
  if (isHexColor(color)) {
    // For hex colors, we need to define custom styles
    return (
      <Badge
        px={2}
        py={1}
        borderRadius="md"
        fontSize="xs"
        fontWeight="medium"
        bg={`${color}20`} // Adding 20 for opacity to create a lighter background
        color={color}
        minWidth="70px" // Set a minimum width
        textAlign="center" // Center the text
        display="inline-block" // Ensure consistent box model
      >
        {children}
      </Badge>
    );
  }

  // For named colors, we can use Chakra's colorScheme
  return (
    <Badge
      colorScheme={color}
      px={2}
      py={1}
      borderRadius="md"
      fontSize="xs"
      fontWeight="medium"
      minWidth="70px" // Set a minimum width
      textAlign="center" // Center the text
      display="inline-block" // Ensure consistent box model
    >
      {children}
    </Badge>
  );
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
        <Box width="80px" marginRight={3}>
          {" "}
          <SubjectBadge color={subject.colorCode}>
            {subject.subjectCode}
          </SubjectBadge>
        </Box>
        <Box>
          <Text fontWeight="medium" color={textColor}>
            {subject.subjectName}
          </Text>
          <Text fontSize="sm" color={subTextColor}>
            {"Sample professor"}
          </Text>
        </Box>
      </Flex>
      <Flex alignItems="center" color={subTextColor}>
        <DocumentIcon />
        <Text fontSize="sm" ml={1}>
          {subject.assignments || 0} assignments
        </Text>
      </Flex>
    </Box>
  );
};

export default SubjectListItem;
