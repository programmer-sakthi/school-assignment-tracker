// AddSectionModal.js
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
import Select from 'react-select';
import React, { useState } from "react";

const AddSectionModal = ({ isModalOpen, onModalClose, onAdd }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [className, setClassName] = useState("");

  const institutions = [
    { value: "skcet", label: "SKCET" },
    { value: "skct", label: "SKCT" },
    { value: "kct", label: "KCT" },
  ];

  const classes = [
    { value: "IT", label: "IT" },
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
  ];

  const handleAddSection = () => {
    if (sectionName && sectionDescription) {
      onAdd({ name: sectionName, description: sectionDescription });
      setSectionName("");
      setSectionDescription("");
      onModalClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Modal isCentered isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Section</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Institution</FormLabel>
            <Select
              value={instituteName}
              options={institutions}
              placeholder="Select an Institution"
              onChange={(selectedOption) => setInstituteName(selectedOption)}
              isSearchable
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Classes</FormLabel>
            <Select
              value={className}
              options={classes}
              placeholder="Select an Institution"
              onChange={(selectedOption) => setClassName(selectedOption)}
              isSearchable
              isDisabled={ instituteName === "" }
            /> 
          </FormControl>
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
          <Button colorScheme="blue" onClick={handleAddSection}>
            Add
          </Button>
          <Button ml={3} onClick={onModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSectionModal;
