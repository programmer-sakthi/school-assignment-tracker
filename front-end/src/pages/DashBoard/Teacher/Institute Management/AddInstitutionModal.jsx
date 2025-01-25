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
import axios from "axios";
import React, { useRef, useState } from "react";

const AddInstitutionModal = ({ onInstituteAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [instituteName, setInstituteName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const initialRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const institute = {
      instituteName: instituteName,
      description: description,
    };
    formData.append("imageFile", image);
    formData.append(
      "institute",
      new Blob([JSON.stringify(institute)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/institutes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Institution added successfully:", response.data);
        alert("Institution added successfully");
        onInstituteAdded();
      })
      .catch((error) => {
        console.error("Error adding institution:", error);
        alert("Failed to add institution");
      });
  };

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.400"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <div className="m-4">
      <button className="primary-btn" onClick={onOpen}>
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
          <ModalHeader>Create an Institution</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl mt={4}>
                <FormLabel>Upload File</FormLabel>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Institution Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Name of institution"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Describe the institution"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddInstitutionModal;
