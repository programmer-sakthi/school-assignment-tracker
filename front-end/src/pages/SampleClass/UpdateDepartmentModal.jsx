import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";

const UpdateDepartmentModal = ({ department }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (department && department.name) {
      setFormData({ name: department.name, id: department.id });
    }
    console.log(department);
    // console.log(formData)
  }, [department]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log(formData);
      const response = await axios.put(
        `http://localhost:8080/departments/${department.id}/${formData.name}`
      );
      toast({
        title: "Department Updated",
        description: "Department name has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <>
      {/* Update Button that opens the modal */}
      <Tooltip label="Edit Department">
        <IconButton
          icon={<EditIcon />}
          size="sm"
          colorScheme="blue"
          variant="ghost"
          aria-label="Edit Department"
          mr={1}
          onClick={onOpen}
        />
      </Tooltip>

      {/* The Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Department</ModalHeader>
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
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText="Updating"
            >
              Update Department Name
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateDepartmentModal;
