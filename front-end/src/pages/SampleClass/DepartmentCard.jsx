import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

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

export default DepartmentCard;
