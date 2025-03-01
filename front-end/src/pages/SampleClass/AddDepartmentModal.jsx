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
import InstituteSelect from "./InstituteSelect";
import useAddDepartment from "./hooks/useAddDepartment";

const AddDepartmentModal = ({ isOpen, onClose, onAddDepartment }) => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleInstituteChange,
    handleSubmit,
  } = useAddDepartment(onClose, onAddDepartment);

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
