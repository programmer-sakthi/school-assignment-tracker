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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Select from "react-select";

const AddClassModal = ({ isModalOpen, onAdd, onModalClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [instituteName, setInstituteName] = useState(null);
  const [classRoomName, setClassRoomName] = useState("");
  const [description, setDescription] = useState("");

  const initialRef = useRef(null);

  const options = [
    { value: "skcet", label: "SKCET" },
    { value: "skct", label: "SKCT" },
    { value: "kct", label: "KCT" },
  ];

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.400"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <div>
      <Modal
        isCentered
        isOpen={isModalOpen}
        onClose={onModalClose}
        initialFocusRef={initialRef}
      >
        {Overlay()}
        <ModalContent>
          <ModalHeader>Create a New Class</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              setInstituteName(null);
              setClassRoomName("");
              setDescription("");
            }}
          />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Institution</FormLabel>
              <Select
                value={instituteName}
                options={options}
                placeholder="Select an Institution"
                onChange={(selectedOption) => setInstituteName(selectedOption)}
                isSearchable
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Class Name</FormLabel>
              <Input
                placeholder="Name of the class"
                value={classRoomName}
                onChange={(e) => setClassRoomName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Describe about the class"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (instituteName && classRoomName && description) {
                  onAdd({
                    institute: instituteName.label,
                    class: classRoomName,
                    studentCount: 0,
                    description,
                  });
                  setInstituteName(null);
                  setClassRoomName("");
                  setDescription("");
                  onClose();
                } else {
                  alert("Please fill out all fields.");
                }
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setInstituteName(null);
                setClassRoomName("");
                setDescription("");
                onModalClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddClassModal;
