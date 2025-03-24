import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importing icons from react-icons
import { handleDelete } from "./services/deleteSubject";
import UpdateSubjectModal from "./UpdateSubjectModal";

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
    return color;
  }
  return `${color}.500`;
};

// Function to create Badge based on color type
const SubjectBadge = ({ color, children }) => {
  if (isHexColor(color)) {
    return (
      <Badge
        px={2}
        py={1}
        borderRadius="md"
        fontSize="xs"
        fontWeight="medium"
        bg={`${color}20`}
        color={color}
      >
        {children}
      </Badge>
    );
  }

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

const SubjectCard = ({ subject, onUpdate, onDelete }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");

  const toast = useToast();
  // Static data
  const sampleProf = "Sample Prof";
  const sampleAssignment = 12;
  const topBarColor = getTopBarColor(subject.colorCode);

  const handleSubjectDelete = async () => {
    try {
      await handleDelete(subject.id);

      toast({
        title: "Success",
        description: "Subject deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDelete()
    } catch (e) {
      console.log(e);
    }
  };

  // Get the color for the top bar

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
          <SubjectBadge color={subject.colorCode}>
            {subject.subjectCode}
          </SubjectBadge>
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
        <Flex justifyContent="flex-end" mt={4} gap={2}>
          <UpdateSubjectModal subject={subject} onUpdate={onDelete} />
          <Tooltip label="Delete">
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              onClick={() => {
                handleSubjectDelete();
              }}
              aria-label="Delete subject"
            >
              <Icon as={FiTrash2} />
            </Button>
          </Tooltip>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SubjectCard;
