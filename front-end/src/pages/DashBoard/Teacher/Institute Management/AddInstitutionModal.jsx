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

const AddInstitutionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [instituteName, setInstituteName] = useState("");
  const [description, setDescription] = useState("");

  const initialRef = useRef(null);
  //   const finalRef = useRef(null);

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.400"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <div className="m-4">
      <button className="primary-btn" onClick={() => onOpen()}>
        Add New Institution
      </button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        {Overlay()}
        <ModalContent>
          <ModalHeader>Create an institution</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Upload File</FormLabel>

              <input type="file" className="form-control" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Institution Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Name of institution"
                onChange={(e) => setInstituteName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="describe about institution"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                // send post request to add the institution
                onClose();
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddInstitutionModal;
