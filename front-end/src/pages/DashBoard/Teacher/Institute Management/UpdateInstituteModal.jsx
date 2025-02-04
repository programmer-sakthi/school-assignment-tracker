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
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

const UpdateInstituteModal = ({ institute, onInstituteUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [instituteName, setInstituteName] = useState(institute.name);
  const [description, setDescription] = useState(institute.description);
  const [imageURL, setImageURL] = useState(institute.imageURL);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setInstituteName(institute.name);
    setDescription(institute.description);
    // console.log(institute)
  }, [institute]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const updatedInstitute = {
      name: instituteName,
      description: description,
    };
    if (image) {
      formData.append("imageFile", image);
    }
    formData.append(
      "institute",
      new Blob([JSON.stringify(updatedInstitute)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/institutes/${institute.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Institution updated successfully:", response.data);
        alert("Institution updated successfully");
        onInstituteUpdated();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating institution:", error);
        alert("Failed to update institution");
      });
  };

  const handleClose = () => {
    onClose();
    setImage(null);
    setInstituteName("");
    setDescription("");
    setImageURL(institute.imageURL);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FiEdit />}
        colorScheme="teal"
        size="sm"
      >
        Update
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Institution</ModalHeader>
          <ModalCloseButton onClick={handleClose}/>
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl mt={4}>
                {/* TODO: Previous image should be shown here */}
                {institute.imageURL && (
                  <div className="mb-4">
                    <FormLabel>Current Image</FormLabel>
                    <img
                      src={imageURL}
                      alt={"current image"}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}
                <FormLabel>Upload Image</FormLabel>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(e.target.files[0])
                    setImageURL(URL.createObjectURL(file))
                  }
                }
                  // value={image}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Institution Name</FormLabel>
                <Input
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
                <Button onClick={handleClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateInstituteModal;
