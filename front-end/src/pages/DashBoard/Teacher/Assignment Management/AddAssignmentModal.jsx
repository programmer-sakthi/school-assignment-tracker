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
import React, { useState } from "react";
import Select from "react-select";

const AddAssignmentModal = ({
  isModalOpen,
  closeModal,
  handleAddAssignment,
}) => {
  const [channal, setChannal] = useState();
  const [channalData, setChannalData] = useState({
    instituteName: "",
    className: "",
    sectionName: "",
  });

  const institutes = ["SKCET", "SKCT", "SKASC", "KCT", "PSG"];
  const classes = [
    {
      institute: "SKCET",
      classes: ["IT", "CSE", "MECH"],
    },
    {
      institute: "SKCT",
      classes: ["AI", "AIML"],
    },
    {
      institute: "SKASC",
      classes: ["BSC", "Arts"],
    },
  ];

  function getClassesByInstitute(instituteName) {
    const institute = classes.find((item) => item.institute === instituteName);
    return institute ? institute.classes : []; // Return classes or an empty array if not found
  }

  const InstituteChannal = () => {
    return (
      <>
        <FormControl mt={4}></FormControl>
      </>
    );
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Channal</FormLabel>
              <Select
                value={channal}
                options={[
                  {
                    value: "Institute",
                    label: "Institute",
                  },
                  {
                    value: "Class",
                    label: "Class",
                  },
                  {
                    value: "Section",
                    label: "Section",
                  },
                ]}
                placeholder={"Select an channal to upload"}
                onChange={(channalName) => setChannal(channalName)}
              />
            </FormControl>
            <FormControl id="title" mt={4}>
              <FormLabel>Assignment Title</FormLabel>
              <Input placeholder="Enter assignment title" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                handleAddAssignment({
                  id: crypto.randomUUID(),
                  title: "New Assignment",
                  totalStudents: 20,
                  completedStudents: 0,
                })
              }
            >
              Add Assignment
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const ClassChannal = () => {
  <div>ClassChannal</div>;
};

const SectionChannal = () => {
  <div>SectionChannal</div>;
};

export default AddAssignmentModal;
