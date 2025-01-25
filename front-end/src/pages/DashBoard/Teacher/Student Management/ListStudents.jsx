import React, { useState } from "react";
import {
  Box,
  Heading,
  Badge,
  Flex,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaUserGraduate, FaChalkboardTeacher, FaTrashAlt } from "react-icons/fa";

const ListUsers = () => {
  // Define users data (state to allow deletion)
  const [users, setUsers] = useState([
    { name: "Sakthi", email: "sakthi@gmail.com", type: "student" },
    { name: "Sakthi1", email: "sakthi1@gmail.com", type: "teacher" },
    { name: "Sakthi2", email: "sakthi2@gmail.com", type: "student" },
    { name: "Sakthi3", email: "sakthi3@gmail.com", type: "teacher" },
    { name: "Sakthi4", email: "sakthi4@gmail.com", type: "student" },
  ]);

  // Handle user deletion
  const handleDelete = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  // Separate students and teachers
  const students = users.filter((user) => user.type === "student");
  const teachers = users.filter((user) => user.type === "teacher");

  // Render user cards
  const renderUserCards = (userList, userType, icon) => (
    <Flex wrap="wrap" gap={4}>
      {userList.map((user, index) => (
        <Box
          key={index}
          bg="white"
          p={4}
          w={{ base: "100%", sm: "48%", md: "30%" }}
          boxShadow="md"
          borderRadius="lg"
          border="1px solid #e2e8f0"
          _hover={{ boxShadow: "lg" }}
          position="relative"
        >
          {/* Delete Button */}
          <IconButton
            icon={<FaTrashAlt />}
            aria-label="Delete"
            size="sm"
            colorScheme="red"
            position="absolute"
            top="70px"
            right="8px"
            onClick={() => handleDelete(user.email)}
          />

          {/* Content */}
          <Flex justify="space-between" align="center" mb={2}>
            <Flex align="center" gap={2}>
              {icon}
              <Text fontWeight="bold" fontSize="lg">
                {user.name}
              </Text>
            </Flex>
            <Badge
              colorScheme={userType === "student" ? "blue" : "green"}
              fontSize="sm"
            >
              {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </Badge>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            {user.email}
          </Text>
        </Box>
      ))}
    </Flex>
  );

  return (
    <Box className="container mt-4">
      {/* Students Section */}
      <Box mb={6}>
        <Heading size="lg" mb={4}>
          Students
        </Heading>
        {students.length > 0 ? (
          renderUserCards(students, "student", <FaUserGraduate size="1.5em" />)
        ) : (
          <Text>No students found.</Text>
        )}
      </Box>

      {/* Teachers Section */}
      <Box>
        <Heading size="lg" mb={4}>
          Teachers
        </Heading>
        {teachers.length > 0 ? (
          renderUserCards(teachers, "teacher", <FaChalkboardTeacher size="1.5em" />)
        ) : (
          <Text>No teachers found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default ListUsers;
