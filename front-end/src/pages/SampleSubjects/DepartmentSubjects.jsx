import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const DepartmentSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("grid");
  const { colorMode } = useColorMode();

  // Sample data for demonstration
  const department = {
    name: "Computer Science",
    code: "CS",
    totalSubjects: 24,
    description:
      "Courses related to computing, programming, and information systems",
  };

  const subjects = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      professor: "Dr. Alan Turing",
      assignments: 8,
      color: "blue",
    },
    {
      id: 2,
      code: "CS102",
      name: "Data Structures",
      professor: "Dr. Ada Lovelace",
      assignments: 12,
      color: "green",
    },
    {
      id: 3,
      code: "CS201",
      name: "Algorithms",
      professor: "Dr. John McCarthy",
      assignments: 10,
      color: "purple",
    },
    {
      id: 4,
      code: "CS210",
      name: "Computer Architecture",
      professor: "Dr. Linus Torvalds",
      assignments: 6,
      color: "orange",
    },
    {
      id: 5,
      code: "CS301",
      name: "Database Systems",
      professor: "Dr. Grace Hopper",
      assignments: 9,
      color: "red",
    },
    {
      id: 6,
      code: "CS310",
      name: "Web Development",
      professor: "Dr. Tim Berners-Lee",
      assignments: 14,
      color: "teal",
    },
    {
      id: 7,
      code: "CS401",
      name: "Artificial Intelligence",
      professor: "Dr. Andrew Ng",
      assignments: 7,
      color: "pink",
    },
    {
      id: 8,
      code: "CS410",
      name: "Machine Learning",
      professor: "Dr. Geoffrey Hinton",
      assignments: 11,
      color: "yellow",
    },
  ];

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) => {
    const query = searchQuery.toLowerCase();
    return (
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query) ||
      subject.professor.toLowerCase().includes(query)
    );
  });

  // Get chakra colors for badges
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

  // Theme-aware style values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const pageBgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");

  // Document icons with theme support
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

  // Empty state icon with theme support
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
    <Box bg={pageBgColor} minH="100vh">
      <Box
        bg={bgColor}
        shadow="sm"
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Container maxW="6xl" py={4}>
          <Breadcrumb fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                color={subTextColor}
                _hover={{ color: textColor }}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                color={subTextColor}
                _hover={{ color: textColor }}
              >
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

      <Container maxW="6xl" py={6} px={4}>
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

        <InputGroup mb={6}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={subTextColor} />
          </InputLeftElement>
          <Input
            pl={10}
            py={3}
            borderRadius="lg"
            placeholder="Search subjects, codes, or professors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg={bgColor}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
          />
        </InputGroup>

        {viewType === "grid" ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredSubjects.map((subject) => (
              <Card
                key={subject.id}
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
                  <Flex
                    justifyContent="space-between"
                    alignItems="start"
                    mb={3}
                  >
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
                  <Heading
                    fontSize="lg"
                    fontWeight="bold"
                    mb={2}
                    color={textColor}
                  >
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
            ))}
          </SimpleGrid>
        ) : (
          <Box
            bg={bgColor}
            borderRadius="lg"
            shadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            {filteredSubjects.map((subject, index) => (
              <Box
                key={subject.id}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottomWidth={
                  index !== filteredSubjects.length - 1 ? "1px" : "0"
                }
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
            ))}
          </Box>
        )}

        {filteredSubjects.length === 0 && (
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
            <Text color={subTextColor}>
              Try adjusting your search or filters
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DepartmentSubjects;
