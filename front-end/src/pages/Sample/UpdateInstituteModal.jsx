import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { PenSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FiFileText, FiMapPin, FiUser } from "react-icons/fi";
import FileUpload from "../DashBoard/Teacher/Institute Management/FileUpload";

const UpdateInstituteModal = ({ institute , onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
        onClick={onOpen} // Open the modal on click
      >
        <PenSquare className="w-4 h-4 text-blue-600" />
      </button>

      <UpdateModal isOpen={isOpen} onClose={onClose} institute={institute} onUpdate={onUpdate} />
    </>
  );
};

const UpdateModal = ({ isOpen, onClose, institute , onUpdate  }) => {
  const [instituteName, setInstituteName] = useState(institute.name);
  const [description, setDescription] = useState(institute.description);
  const [location, setLocation] = useState(institute.location);
  const [imageURL, setImageURL] = useState(institute.imageURL);
  const [image, setImage] = useState(null);
  const toast = useToast();
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const initialRef = useRef(null);

  useEffect(() => {
    if (image === null) setImageURL(institute.imageURL);
    else setImageURL(URL.createObjectURL(image));
  }, [image]);

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
      .put(
        `http://localhost:8080/api/institutes/${institute.instituteID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast(
          {
            title: "Success",
            description: "Institution updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          }
        )
        onUpdate()
        onClose();
      })
      .catch((error) => {
        console.log(formData);
        console.error("Error updating institution:", error);
        alert("Failed to update institution");
      });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Institution</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              {imageURL && (
                <div className="mb-4">
                  <FormLabel>Current Image</FormLabel>
                  <img
                    src={imageURL}
                    alt="current"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              )}
              <FileUpload setImage={setImage} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel fontWeight="medium">Institution Name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiUser color={iconColor} />}
                />
                <Input
                  ref={initialRef}
                  placeholder="Name of institution"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontWeight="medium">Description</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiFileText color={iconColor} />}
                />
                <Input
                  placeholder="Describe the institution"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight="medium">Location</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiMapPin color={iconColor} />}
                />
                <Input
                  placeholder="Institution location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </InputGroup>
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
  );
};

export default UpdateInstituteModal;
