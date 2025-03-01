import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon, Search } from "lucide-react";
import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import AddDepartmentModal from "./AddDepartmentModal";
import DepartmentCard from "./DepartmentCard";
import useFetchDepartment from "./hooks/useFetchDepartment";
import InstituteSelect from "./InstituteSelect";

const InstituteDepartmentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [instituteFilter, setInstituteFilter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reloadCounter, setReloadCounter] = useState(0);
  const { departments, loading, error } = useFetchDepartment(
    instituteFilter,
    reloadCounter
  );
  const toast = useToast();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Filter departments based on search query
  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onChange = () => setReloadCounter((prev) => prev + 1);

  return (
    <Container maxW="container.xl" py={8}>
      <Flex align="center" mb={6}>
        <Heading>Departments</Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button
            leftIcon={<Icon as={FaUniversity} />}
            rightIcon={<ExternalLinkIcon />}
            colorScheme="teal"
            size="md"
            onClick={() => console.log("View All Institutes clicked")}
          >
            View All Institutes
          </Button>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="green"
            size="md"
            onClick={onOpen}
          >
            Add Department
          </Button>
        </HStack>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        mb={6}
        gap={4}
        justifyContent="space-between"
      >
        <InputGroup width="400px">
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <HStack width="400px">
          <InstituteSelect
            currentInstitute={instituteFilter}
            setCurrentInstitute={setInstituteFilter}
          />
        </HStack>
      </Flex>

      <Text color="gray.600">
        Showing {filteredDepartments.length} out of {departments.length}{" "}
        departments
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredDepartments.map((department) => (
          <DepartmentCard key={department.id} department={department} onChange={onChange} />
        ))}
      </SimpleGrid>

      <AddDepartmentModal isOpen={isOpen} onClose={onClose} onChange={onChange} />
    </Container>
  );
};

export default InstituteDepartmentsList;
