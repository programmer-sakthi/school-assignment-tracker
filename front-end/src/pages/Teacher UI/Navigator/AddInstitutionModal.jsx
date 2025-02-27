import {
  Box,
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
import { useContext, useRef, useState } from "react";
import { FiFileText, FiMapPin, FiUser } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContext";
import FileUpload from "./FileUpload";

const AddInstitutionModal = ({ onInstituteAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [instituteName, setInstituteName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialRef = useRef(null);
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const toast = useToast();

  const userContext = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!instituteName.trim()) {
      toast({
        title: "Invalid input",
        description: "Institution name is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    const institute = {
      name: instituteName,
      description: description,
      location: location,
    };
    formData.append("imageFile", image);
    formData.append(
      "institute",
      new Blob([JSON.stringify(institute)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/institutes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Institution added successfully:", response.data);

      // Link user to institution
      await axios.post(
        `http://localhost:8080/api/institutes/${response.data.id}/users/${userContext.user.id}`
      );

      toast({
        title: "Success",
        description: "Institution added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Ensure we call onInstituteAdded after all operations complete
      onInstituteAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding institution:", error);
      toast({
        title: "Error",
        description: "Failed to add institution",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setInstituteName("");
    setDescription("");
    setLocation("");
    setImage(null);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.400"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <div className="m-4">
      <Button colorScheme="blue" onClick={onOpen}>
        Add Institute
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleClose}
        initialFocusRef={initialRef}
        size="md"
      >
        {Overlay()}
        <ModalContent borderRadius="lg" shadow="lg">
          <ModalHeader fontSize="xl" fontWeight="bold">
            Create an Institution
          </ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel fontWeight="medium">Image Preview</FormLabel>
                {image ? (
                  <Box
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="sm"
                    mb={4}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Image Preview"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ) : (
                  <p className="text-gray-500 text-sm font-semibold italic">
                    No image available to preview
                  </p>
                )}
              </FormControl>

              <FileUpload setImage={setImage} />

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

              <ModalFooter px={0} mt={6}>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  size="md"
                  px={6}
                  isLoading={isSubmitting}
                  loadingText="Saving"
                >
                  Save
                </Button>
                <Button onClick={handleClose} size="md">
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddInstitutionModal;
