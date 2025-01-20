// ListSections.js
import {
    Box,
    Button,
    HStack,
    Text,
    VStack,
    Icon,
  } from "@chakra-ui/react";
  import { FaEdit, FaTrash } from "react-icons/fa";
  import React from "react";
  import Swal from "sweetalert2";
  
  const ListSections = ({ sections, onUpdate, onDelete }) => {
    return (
      <Box p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
        <VStack spacing={4} align="stretch">
          {sections.map((section, index) => (
            <HStack
              key={index}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              spacing={4}
              _hover={{ bg: "gray.100" }}
            >
              <Box flex="1">
                <Text fontWeight="bold">{section.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {section.description}
                </Text>
              </Box>
              <HStack>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => onUpdate(index)}
                >
                  <FaEdit /> Update
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This action cannot be undone!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Delete",
                      cancelButtonText: "Cancel",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onDelete(index);
                        Swal.fire("Deleted!", "Section has been removed.", "success");
                      }
                    });
                  }}
                >
                  <FaTrash /> Delete
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  };
  
  export default ListSections;
  