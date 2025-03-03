import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteInstitute from "./DeleteInstitute";
import UpdateDepartmentModal from "./UpdateDepartmentModal";

const DepartmentCard = ({ department, onEdit, onDelete, onChange }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const navigate = useNavigate();

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
        <UpdateDepartmentModal department={department} onChange={onChange} />
        <DeleteInstitute department={department} onChange={onChange} />
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

      <Button
        size="sm"
        colorScheme="blue"
        mt={4}
        onClick={() => navigate("/subjects")}
      >
        View Department
      </Button>
    </Box>
  );
};

export default DepartmentCard;
