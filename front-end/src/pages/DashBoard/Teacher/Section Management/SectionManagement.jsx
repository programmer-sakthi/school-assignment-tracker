import React, { useState } from "react";
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
import { FaTrash, FaUniversity } from "react-icons/fa";
import { MdClass, MdGroup } from "react-icons/md";
import Swal from "sweetalert2";
import AddSectionModal from "./AddSectionModal";
import UpdateSectionModal from "./UpdateSectionModal";

const SectionManagement = () => {
  const [sectionList, setSectionList] = useState([
    {
      class: "IT",
      section: "A",
      studentCount: 60,
      description: "Section A of IT",
    },
    {
      class: "IT",
      section: "B",
      studentCount: 65,
      description: "Section B of IT",
    },
    {
      class: "CSE",
      section: "A",
      studentCount: 70,
      description: "Section A of CSE",
    },
    {
      class: "MECH",
      section: "A",
      studentCount: 40,
      description: "Section A of Mechanical Engineering",
    },
  ]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const handleOpenUpdateModal = (selectedSection) => {
    setCurrentSection(selectedSection);
    setIsUpdateModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSection = (newSection) => {
    setSectionList((prevList) => [...prevList, newSection]);
    setIsAddModalOpen(false);
  };

  const handleUpdateSection = (updatedData) => {
    setSectionList((prevList) =>
      prevList.map((sec) =>
        sec.section === currentSection.section && sec.class === currentSection.class
          ? { ...sec, ...updatedData }
          : sec
      )
    );
    setIsUpdateModalOpen(false);
  };

  const handleDeleteSection = (selectedSection) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the section "${selectedSection.section}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setSectionList((prevList) =>
          prevList.filter(
            (sec) =>
              sec.section !== selectedSection.section ||
              sec.class !== selectedSection.class
          )
        );
        Swal.fire("Deleted!", "The section has been deleted.", "success");
      }
    });
  };

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Section Management</Heading>
        <Button colorScheme="teal" onClick={handleOpenAddModal}>
          Add Section
        </Button>
      </Flex>

      <VStack spacing={4} align="stretch">
        {sectionList.map((sec, index) => (
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
            <Icon as={MdGroup} boxSize={6} color="teal.500" />
            <Box flex="1">
              <Text fontWeight="bold" fontSize="lg">
                {sec.section}
              </Text>
              <Text fontSize="sm" color="gray.500">
                <Icon as={MdClass} mr={2} /> {sec.class}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {sec.description}
              </Text>
            </Box>
            <HStack spacing={3}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => handleOpenUpdateModal(sec)}
              >
                Update
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                leftIcon={<FaTrash />}
                onClick={() => handleDeleteSection(sec)}
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>

      <AddSectionModal
        isModalOpen={isAddModalOpen}
        onModalClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSection}
      />
      <UpdateSectionModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        currentSection={currentSection}
        onUpdate={handleUpdateSection}
      />
    </Box>
  );
};

export default SectionManagement;
