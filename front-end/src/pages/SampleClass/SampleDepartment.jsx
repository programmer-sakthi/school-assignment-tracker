import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Moon, Search, Sun } from "lucide-react";
import { useState } from "react";

const DepartmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { colorMode, toggleColorMode } = useColorMode();

  // Sample department data
  const departments = [
    {
      id: 1,
      name: "Computer Science",
      head: "Dr. Sarah Johnson",
      faculty: 24,
      students: 450,
      established: 1985,
      category: "technology",
      image: "/api/placeholder/400/240",
      accolades: ["Research Excellence Award", "Innovation Hub"],
    },
    {
      id: 2,
      name: "Electrical Engineering",
      head: "Dr. Michael Chen",
      faculty: 18,
      students: 380,
      established: 1962,
      category: "engineering",
      image: "/api/placeholder/400/240",
      accolades: ["Industry Partnership Excellence"],
    },
    {
      id: 3,
      name: "Mechanical Engineering",
      head: "Prof. Robert Williams",
      faculty: 21,
      students: 410,
      established: 1958,
      category: "engineering",
      image: "/api/placeholder/400/240",
      accolades: ["National Design Award", "Sustainable Engineering Hub"],
    },
    {
      id: 4,
      name: "Civil Engineering",
      head: "Dr. Amelia Rodriguez",
      faculty: 16,
      students: 320,
      established: 1960,
      category: "engineering",
      image: "/api/placeholder/400/240",
      accolades: ["Urban Planning Excellence"],
    },
    {
      id: 5,
      name: "Physics",
      head: "Prof. James Wilson",
      faculty: 15,
      students: 280,
      established: 1950,
      category: "science",
      image: "/api/placeholder/400/240",
      accolades: ["Quantum Research Center", "National Science Medal"],
    },
    {
      id: 6,
      name: "Mathematics",
      head: "Dr. Emily Parker",
      faculty: 17,
      students: 310,
      established: 1952,
      category: "science",
      image: "/api/placeholder/400/240",
      accolades: ["Mathematical Excellence Center"],
    },
  ];

  // Filter departments based on search and category filter
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = dept.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || dept.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Get unique categories for filter options
  const categories = [
    "all",
    ...new Set(departments.map((dept) => dept.category)),
  ];

  // Theme specific colors
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh" transition="background 0.2s ease">
      <Container maxW="6xl" py={12}>
        {/* Header with Theme Toggle */}
        <Flex direction="column" align="center" mb={16} position="relative">
          <Box position="absolute" right={0} top={0}>
            <IconButton
              aria-label={`Switch to ${
                colorMode === "light" ? "dark" : "light"
              } mode`}
              icon={
                colorMode === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )
              }
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="blue"
              rounded="full"
            />
          </Box>

          <Box w={24} h={1} bg={accentColor} rounded="full" mb={4}></Box>
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            textAlign="center"
            color={textColor}
          >
            Academic Departments
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            maxW="2xl"
            color={mutedTextColor}
          >
            Explore our world-class departments offering innovative education
            and groundbreaking research.
          </Text>
        </Flex>

        {/* Search and Filter Controls */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          align="center"
          justify="space-between"
          mb={10}
        >
          <InputGroup w={{ base: "full", md: "xs" }}>
            <InputLeftElement pointerEvents="none">
              <Search className="h-5 w-5 text-gray-400" />
            </InputLeftElement>
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              _focus={{ borderColor: accentColor }}
            />
          </InputGroup>

          <HStack
            spacing={2}
            wrap="wrap"
            justify={{ base: "center", md: "flex-start" }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedFilter(category)}
                size="sm"
                rounded="full"
                px={4}
                textTransform="capitalize"
                colorScheme={selectedFilter === category ? "blue" : "gray"}
                variant={selectedFilter === category ? "solid" : "outline"}
              >
                {category}
              </Button>
            ))}
          </HStack>
        </Flex>

        {/* Department Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {filteredDepartments.map((dept) => (
            <Card
              key={dept.id}
              overflow="hidden"
              borderRadius="xl"
              bg={cardBg}
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-8px)", boxShadow: "xl" }}
            >
              <Box position="relative">
                <Image
                  src={dept.image}
                  alt={`${dept.name} Department`}
                  h={48}
                  w="full"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-t, blackAlpha.700, transparent)"
                  display="flex"
                  alignItems="flex-end"
                >
                  <Heading size="lg" color="white" p={4}>
                    {dept.name}
                  </Heading>
                </Box>
              </Box>

              <CardBody>
                <Flex mb={4} align="center">
                  <Badge
                    rounded="full"
                    px={2}
                    py={1}
                    colorScheme="blue"
                    textTransform="uppercase"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    Est. {dept.established}
                  </Badge>
                  <Flex ml="auto" align="center" gap={1}>
                    <Box w={2} h={2} bg={accentColor} rounded="full"></Box>
                    <Text
                      fontSize="sm"
                      color={mutedTextColor}
                      textTransform="capitalize"
                    >
                      {dept.category}
                    </Text>
                  </Flex>
                </Flex>

                <VStack spacing={3} align="stretch" mb={6}>
                  <Flex
                    justify="space-between"
                    align="center"
                    pb={2}
                    borderBottom={`1px solid ${borderColor}`}
                  >
                    <Text fontWeight="medium" color={textColor}>
                      Department Head
                    </Text>
                    <Text color={mutedTextColor}>{dept.head}</Text>
                  </Flex>
                  <Flex
                    justify="space-between"
                    align="center"
                    pb={2}
                    borderBottom={`1px solid ${borderColor}`}
                  >
                    <Text fontWeight="medium" color={textColor}>
                      Faculty
                    </Text>
                    <Flex align="center" gap={2}>
                      <Progress
                        value={(dept.faculty / 30) * 100}
                        size="sm"
                        w={24}
                        colorScheme="blue"
                        rounded="full"
                      />
                      <Text color={mutedTextColor}>{dept.faculty}</Text>
                    </Flex>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="medium" color={textColor}>
                      Students
                    </Text>
                    <Flex align="center" gap={2}>
                      <Progress
                        value={(dept.students / 500) * 100}
                        size="sm"
                        w={24}
                        colorScheme="green"
                        rounded="full"
                      />
                      <Text color={mutedTextColor}>{dept.students}</Text>
                    </Flex>
                  </Flex>
                </VStack>

                {dept.accolades && dept.accolades.length > 0 && (
                  <Box mb={6}>
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      color={mutedTextColor}
                      mb={2}
                    >
                      Achievements
                    </Text>
                    <Flex flexWrap="wrap" gap={2}>
                      {dept.accolades.map((accolade, idx) => (
                        <Tag
                          key={idx}
                          size="sm"
                          variant="subtle"
                          colorScheme="gray"
                        >
                          <TagLabel>{accolade}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                )}
              </CardBody>

              <CardFooter>
                <Stack w="full" spacing={2} direction="row">
                  <Button flex={1} colorScheme="blue" size="md">
                    View Details
                  </Button>
                  <Button variant="outline" colorScheme="gray" size="md">
                    Contact
                  </Button>
                </Stack>
              </CardFooter>
            </Card>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredDepartments.length === 0 && (
          <Flex direction="column" align="center" justify="center" py={16}>
            <Text fontSize="xl" color={mutedTextColor}>
              No departments found matching your criteria.
            </Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
            >
              Reset Filters
            </Button>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default DepartmentList;
