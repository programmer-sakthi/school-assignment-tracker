import { Avatar, Badge, Box, Card, CardBody, Flex, Heading, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";

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

const SubjectCard = ({ subject }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");

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
      <Box h="2px" bg={`${subject.color}.500`}></Box>
      <CardBody p={5}>
        <Flex justifyContent="space-between" alignItems="start" mb={3}>
          <Badge
            {...getBadgeProps(subject.color)}
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
            fontWeight="medium"
          >
            {subject.code}
          </Badge>
          <Tooltip label={`${subject.assignments} assignments`}>
            <Flex alignItems="center" color={subTextColor}>
              <DocumentIcon />
              <Text ml={1} fontSize="sm">
                {subject.assignments}
              </Text>
            </Flex>
          </Tooltip>
        </Flex>
        <Heading fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
          {subject.name}
        </Heading>
        <Flex alignItems="center" mt={4}>
          <Avatar size="sm" name={subject.professor} mr={2} />
          <Text fontSize="sm" color={subTextColor}>
            {subject.professor}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SubjectCard;
