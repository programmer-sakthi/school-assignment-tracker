import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

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

// Check if a string is a hex color
const isHexColor = (color) => {
  return typeof color === "string" && color.startsWith("#");
};

// Function to handle the top color bar
const getTopBarColor = (color) => {
  if (isHexColor(color)) {
    return color; // Return the hex color directly
  }
  // Return a template string for theme colors
  return `${color}.500`;
};

// Function to create Badge based on color type
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
    >
      {children}
    </Badge>
  );
};

const SubjectCard = ({ subject }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");

  //static data
  const sampleProf = "Sample Prof"
  const sampleAssignment = 12

  // Get the color for the top bar
  const topBarColor = getTopBarColor(subject.colorCode);

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
      _hover={{ shadow: "md", bg: cardHoverBg }}
      transition="all 0.3s"
    >
      <Box h="2px" bg={topBarColor}></Box>
      <CardBody p={5}>
        <Flex justifyContent="space-between" alignItems="start" mb={3}>
          <SubjectBadge color={subject.colorCode}>{subject.subjectCode}</SubjectBadge>
          <Tooltip label={`${sampleAssignment} assignments`}>
            <Flex alignItems="center" color={subTextColor}>
              <DocumentIcon />
              <Text ml={1} fontSize="sm">
                {sampleAssignment}
              </Text>
            </Flex>
          </Tooltip>
        </Flex>
        <Heading fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
          {subject.subjectName}
        </Heading>
        <Flex alignItems="center" mt={4}>
          <Avatar size="sm" name={sampleProf} mr={2} />
          <Text fontSize="sm" color={subTextColor}>
            {sampleProf}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SubjectCard;
