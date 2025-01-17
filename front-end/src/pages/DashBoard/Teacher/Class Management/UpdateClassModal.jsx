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
  import Select from "react-select";
  
  const UpdateClassModal = ({ isOpen, onClose, currentClass, onUpdate }) => {
    const [instituteName, setInstituteName] = useState(null);
    const [classRoomName, setClassRoomName] = useState("");
    const [description, setDescription] = useState("");
  
    const options = [
      { value: "SKCET", label: "SKCET" },
      { value: "SKCT", label: "SKCT" },
      { value: "KCT", label: "KCT" },
    ];
  
    useEffect(() => {
      if (currentClass) {
        setInstituteName(
          options.find((option) => option.label === currentClass.institute) || null
        );
        setClassRoomName(currentClass.class);
        setDescription(currentClass.description || "");
      }
    }, [currentClass]);
  
    const handleUpdate = () => {
      const updatedData = {
        institute: instituteName?.label || "",
        class: classRoomName,
        description,
      };
      onUpdate(updatedData);
    };
  
    return (
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Class Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Institution</FormLabel>
              <Select
                value={instituteName}
                options={options}
                placeholder="Select an Institution"
                onChange={(institute) => setInstituteName(institute)}
                isSearchable
              />
            </FormControl>
  
            <FormControl mt={4}>
              <FormLabel>Class Name</FormLabel>
              <Input
                value={classRoomName}
                placeholder="Enter the class name"
                onChange={(e) => setClassRoomName(e.target.value)}
              />
            </FormControl>
  
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                placeholder="Describe the class"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default UpdateClassModal;
  