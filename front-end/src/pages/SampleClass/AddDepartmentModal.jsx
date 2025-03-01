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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import InstituteSelect from "./InstituteSelect";

const AddDepartmentModal = ({ isOpen, onClose, onAddDepartment }) => {
  const [formData, setFormData] = useState({
    name: "",
    instituteId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInstituteChange = (instituteId) => {
    setFormData({ ...formData, instituteId });
  };

  const handleSubmit = async () => {
    // Form validation
    if (!formData.name.trim() || !formData.instituteId) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/departments",
        formData
      );
      await axios.post(
        "http://localhost:8080/mapDepartmentToInstitute/" +
          response.data.id +
          "/" +
          formData.instituteId
      );

      toast({
        title: "Success",
        description: `${formData.name} department has been created`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setFormData({ name: "", instituteId: "" });
    onClose()
    setIsSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Department</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl isRequired mb={4}>
            <FormLabel>Department Name</FormLabel>
            <Input
              name="name"
              placeholder="Enter department name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Institute</FormLabel>
            <InstituteSelect
              currentInstitute={formData.instituteId}
              setCurrentInstitute={handleInstituteChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Creating"
          >
            Create Department
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDepartmentModal;
