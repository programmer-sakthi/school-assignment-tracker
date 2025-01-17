import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaTrash, FaUniversity } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import Swal from "sweetalert2";
import AddClassModal from "./AddClassModal";
import UpdateClassModal from "./UpdateClassModal";

const ClassManagement = () => {
  const [classList, setClassList] = useState([
    {
      institute: "SKCET",
      class: "IT",
      studentCount: 250,
      description: "Information Technology",
    },
    {
      institute: "SKCET",
      class: "CSE",
      studentCount: 300,
      description: "Computer Science",
    },
    {
      institute: "SKCET",
      class: "MECH",
      studentCount: 60,
      description: "Mechanical Engineering",
    },
    {
      institute: "SKCT",
      class: "ECE",
      studentCount: 160,
      description: "Electronics & Communication",
    },
  ]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const handleOpenUpdateModal = (selectedClass) => {
    setCurrentClass(selectedClass);
    setIsUpdateModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddClass = (newClass) => {
    setClassList((prevList) => [...prevList, newClass]);
    setIsAddModalOpen(false);
  };

  const handleUpdateClass = (updatedData) => {
    setClassList((prevList) =>
      prevList.map((cls) =>
        cls.class === currentClass.class &&
        cls.institute === currentClass.institute
          ? { ...cls, ...updatedData }
          : cls
      )
    );
    setIsUpdateModalOpen(false);
  };

  const handleDeleteClass = (selectedClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the class "${selectedClass.class}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setClassList((prevList) =>
          prevList.filter(
            (cls) =>
              cls.class !== selectedClass.class ||
              cls.institute !== selectedClass.institute
          )
        );
        Swal.fire("Deleted!", "The class has been deleted.", "success");
      }
    });
  };

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Class Management</Heading>
        <Button colorScheme="teal" onClick={handleOpenAddModal}>
          Add Class
        </Button>
      </Flex>

      <VStack spacing={4} align="stretch">
        {classList.map((cls, index) => (
          <HStack
            key={index}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            align="center"
            spacing={4}
            _hover={{ boxShadow: "md", bg: "gray.100" }}
          >
            <Icon as={MdClass} boxSize={6} color="teal.500" />
            <Box flex="1">
              <Text fontWeight="bold" fontSize="lg">
                {cls.class}
              </Text>
              <Text fontSize="sm" color="gray.500">
                <Icon as={FaUniversity} mr={2} /> {cls.institute}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {cls.description}
              </Text>
            </Box>
            <HStack spacing={3}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => handleOpenUpdateModal(cls)}
              >
                Update
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                leftIcon={<FaTrash />}
                onClick={() => handleDeleteClass(cls)}
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>

      <AddClassModal
        isModalOpen={isAddModalOpen}
        onModalClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddClass}
      />
      <UpdateClassModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        currentClass={currentClass}
        onUpdate={handleUpdateClass}
      />
    </Box>
  );
};

export default ClassManagement;
