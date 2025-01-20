import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  
  const UpdateSectionModal = ({ isModalOpen, onModalClose, currentSection, onUpdate }) => {
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
  
    useEffect(() => {
      if (currentSection) {
        setSectionName(currentSection.name);
        setSectionDescription(currentSection.description);
      }
    }, [currentSection]);
  
    const handleUpdateSection = () => {
      if (sectionName && sectionDescription) {
        onUpdate({ name: sectionName, description: sectionDescription });
        onModalClose();
      } else {
        alert("Please fill out all fields.");
      }
    };
  
    return (
      <Modal isCentered isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Section</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Section Name</FormLabel>
              <Input
                value={sectionName}
                placeholder="Enter section name"
                onChange={(e) => setSectionName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={sectionDescription}
                placeholder="Enter section description"
                onChange={(e) => setSectionDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateSection}>
              Update
            </Button>
            <Button ml={3} onClick={onModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default UpdateSectionModal;
  
  