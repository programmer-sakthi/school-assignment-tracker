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
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

// Sample institutes data with IDs
const institutesData = [
  { id: 1, name: "School of Engineering" },
  { id: 2, name: "School of Sciences" },
  { id: 3, name: "School of Business" },
  { id: 4, name: "School of Humanities" },
  { id: 5, name: "School of Medicine" },
];

const AddDepartmentModal = ({ isOpen, onClose, onAddDepartment }) => {
  const [formData, setFormData] = useState({
    name: "",
    instituteId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
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

    // Find the selected institute name
    const selectedInstitute = institutesData.find(
      (institute) => institute.id === parseInt(formData.instituteId)
    );

    // Create new department object
    const newDepartment = {
      id: Date.now(), // temporary ID (replace with proper ID generation or from API)
      name: formData.name,
      instituteId: parseInt(formData.instituteId),
      institute: selectedInstitute.name,
      teachers: 0,
      students: 0,
      subjects: 0,
      established: new Date().getFullYear().toString(),
      headOfDepartment: "",
    };

    // Call the parent component's function to add the department
    setTimeout(() => {
      onAddDepartment(newDepartment);
      setIsSubmitting(false);

      toast({
        title: "Success",
        description: `${formData.name} department has been created`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form and close modal
      setFormData({ name: "", instituteId: "" });
      onClose();
    }, 500); // Simulating API call delay
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
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Institute</FormLabel>
            <Select
              name="instituteId"
              placeholder="Select institute"
              value={formData.instituteId}
              onChange={handleChange}
            >
              {institutesData.map((institute) => (
                <option key={institute.id} value={institute.id}>
                  {institute.name}
                </option>
              ))}
            </Select>
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
