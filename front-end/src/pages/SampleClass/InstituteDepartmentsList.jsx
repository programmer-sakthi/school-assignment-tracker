import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon, Search } from "lucide-react";
import { useState } from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";
import AddDepartmentModal from "./AddDepartmentModal"; // Import the modal component
import InstituteSelect from "./InstituteSelect";

// Sample data - replace with your actual data or API call
const departmentsData = [
  {
    id: 1,
    name: "Computer Science",
    instituteId: 1,
    institute: "School of Engineering",
    teachers: 15,
    students: 320,
    subjects: 24,
    established: "1985",
    headOfDepartment: "Dr. Alan Johnson",
  },
  {
    id: 2,
    name: "Mechanical Engineering",
    instituteId: 1,
    institute: "School of Engineering",
    teachers: 18,
    students: 280,
    subjects: 22,
    established: "1982",
    headOfDepartment: "Dr. Sarah Miller",
  },
  {
    id: 3,
    name: "Mathematics",
    instituteId: 2,
    institute: "School of Sciences",
    teachers: 12,
    students: 150,
    subjects: 18,
    established: "1975",
    headOfDepartment: "Dr. Robert Chen",
  },
  {
    id: 4,
    name: "Physics",
    instituteId: 2,
    institute: "School of Sciences",
    teachers: 14,
    students: 180,
    subjects: 20,
    established: "1979",
    headOfDepartment: "Dr. Emily Garcia",
  },
  {
    id: 5,
    name: "Business Administration",
    instituteId: 3,
    institute: "School of Business",
    teachers: 20,
    students: 350,
    subjects: 25,
    established: "1990",
    headOfDepartment: "Dr. Mark Wilson",
  },
];

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      borderRadius="lg"
      className="hover:shadow-lg transition-shadow duration-300"
      position="relative"
    >
      {/* Action buttons positioned at top right */}
      <Flex position="absolute" top={3} right={3}>
        <Tooltip label="Edit Department">
          <IconButton
            icon={<EditIcon />}
            size="sm"
            colorScheme="blue"
            variant="ghost"
            aria-label="Edit Department"
            mr={1}
            onClick={() => onEdit(department)}
          />
        </Tooltip>
        <Tooltip label="Delete Department">
          <IconButton
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            aria-label="Delete Department"
            onClick={() => onDelete(department.id)}
          />
        </Tooltip>
      </Flex>

      <Heading fontSize="xl" mb={3}>
        {department.name}
      </Heading>

      <StatGroup mb={4}>
        <Stat>
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaChalkboardTeacher} mr={1} /> Teachers
          </StatLabel>
          <StatNumber>{department.teachers}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaUserGraduate} mr={1} /> Students
          </StatLabel>
          <StatNumber>{department.students}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaBook} mr={1} /> Subjects
          </StatLabel>
          <StatNumber>{department.subjects}</StatNumber>
        </Stat>
      </StatGroup>

      <Button size="sm" colorScheme="blue" mt={4}>
        View Department
      </Button>
    </Box>
  );
};

const InstituteDepartmentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [instituteFilter, setInstituteFilter] = useState("");
  const [departments, setDepartments] = useState(departmentsData);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Get unique institutes for filter dropdown
  const institutes = [...new Set(departments.map((dept) => dept.institute))];

  // Filter departments based on search query and institute filter
  const filteredDepartments = departments.filter((department) => {
    const matchesSearch = department.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesInstitute =
      instituteFilter === "" || department.institute === instituteFilter;
    return matchesSearch && matchesInstitute;
  });

  // Handler for adding a new department
  const handleAddDepartment = (newDepartment) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
  };

  // Handler for editing a department
  const handleEditDepartment = (department) => {
    setDepartmentToEdit(department);
    onOpen(); // Open the modal for editing
  };

  // Handler for updating a department
  const handleUpdateDepartment = (updatedDepartment) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.id === updatedDepartment.id ? updatedDepartment : dept
      )
    );
    setDepartmentToEdit(null);
  };

  // Handler for deleting a department
  const handleDeleteDepartment = (departmentId) => {
    // In a real application, you would typically show a confirmation dialog first
    setDepartments((prevDepartments) =>
      prevDepartments.filter((dept) => dept.id !== departmentId)
    );
    toast({
      title: "Department deleted",
      description: "The department has been successfully removed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handler for opening the add department modal
  const handleOpenAddModal = () => {
    setDepartmentToEdit(null); // Clear any previously set department to edit
    onOpen();
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setDepartmentToEdit(null);
    onClose();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex align="center" mb={6}>
        <Heading>Institute Departments</Heading>
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
            onClick={handleOpenAddModal}
          >
            Add Department
          </Button>
        </HStack>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        mb={6}
        gap={4}
        justifyContent={"space-between"}
      >
        <InputGroup width={"400px"}>
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <HStack width={"400px"}>
          <InstituteSelect
            currentInstitute={instituteFilter}
            setCurrentInstitute={setInstituteFilter}
          />
        </HStack>
      </Flex>

      <HStack mb={4} spacing={2}>
        <Text color="gray.600">
          Showing {filteredDepartments.length} out of {departments.length}{" "}
          departments
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredDepartments.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        ))}
      </SimpleGrid>

      {/* Add/Edit Department Modal */}
      <AddDepartmentModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onAddDepartment={
          departmentToEdit ? handleUpdateDepartment : handleAddDepartment
        }
        departmentToEdit={departmentToEdit}
      />
    </Container>
  );
};

export default InstituteDepartmentsList;
