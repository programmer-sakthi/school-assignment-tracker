import React from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaUniversity, FaUsers, FaEdit, FaTrash } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import Swal from "sweetalert2";

const ListClasses = ({ formattedData, onDelete, onUpdate  }) => {
  return (
    <Box
      p={8}
      w="100%"
      bg="gray.50"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading size="lg" textAlign="center" mb={6}>
        Class List with Institutes
      </Heading>
      <VStack spacing={4} align="stretch">
        {formattedData.map((item, index) => (
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
                {item.class}
              </Text>
              <Text fontSize="sm" color="gray.500">
                <Icon as={FaUniversity} mr={2} /> {item.institute}
              </Text>
            </Box>
            <HStack spacing={4}>
              <HStack>
                <Icon as={FaUsers} boxSize={5} color="blue.400" />
                <Text fontSize="md" fontWeight="medium" color="blue.600">
                  {item.studentCount} students
                </Text>
              </HStack>
              {/* Update Button */}
              <Button
                size="sm"
                colorScheme="yellow"
                leftIcon={<FaEdit />}
                onClick={() => onUpdate(index)}
              >
                Update
              </Button>
              {/* Delete Button */}
              <Button
                size="sm"
                colorScheme="red"
                leftIcon={<FaTrash />}
                onClick={() => {
                  Swal.fire({
                    icon: "warning", // Use "warning" for delete confirmation
                    title: "Are you sure?",
                    text: "This action cannot be undone!",
                    showCancelButton: true, // Enables the Cancel button
                    confirmButtonText: "Delete", // Text for the confirm button
                    cancelButtonText: "Cancel", // Text for the cancel button
                    confirmButtonColor: "#d33", // Color for the Delete button
                    cancelButtonColor: "#3085d6", // Color for the Cancel button
                  }).then( (result) => {
                    if (result.isConfirmed) {
                      // Action to perform if "Delete" is clicked
                      Swal.fire({
                        icon: "info",
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                      });
                      onDelete(index)
                    }
                  }
                  )
                }}
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ListClasses;
