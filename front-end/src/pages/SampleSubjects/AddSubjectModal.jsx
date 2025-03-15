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
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import ColorPicker from "./components/colorPicker";
import { createSubject } from "./services/addSubject";

const AddSubjectModal = ({onCreate}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [colorCode, setColorCode] = useState("#3182CE");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    // Create the subject object
    const newSubject = {
      subjectName: subjectName,
      subjectCode: subjectCode,
      colorCode: colorCode,
    };

    setIsLoading(true);

    try {
      // Call the createSubject function directly
      await createSubject(newSubject);

      toast({
        title: "Subject created",
        description: `${subjectName} has been added successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onCreate()

      // Reset form and close modal
      setSubjectName("");
      setSubjectCode("");
      setColorCode("#3182CE");
      onClose();
    } catch (error) {
      toast({
        title: "Error creating subject",
        description:
          error.message || "An error occurred while creating the subject.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button bg={"green"} color={"white"} onClick={onOpen}>
        Add Subject
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Subject</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="subjectName" isRequired>
                <FormLabel>Subject Name</FormLabel>
                <Input
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Mathematics"
                />
              </FormControl>

              <FormControl id="subjectCode" isRequired>
                <FormLabel>Subject Code</FormLabel>
                <Input
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  placeholder="e.g. MATH101"
                />
              </FormControl>

              <FormControl id="colorCode">
                <FormLabel>Color Code</FormLabel>
                {/* Use the new ColorPicker component */}
                <ColorPicker
                  selectedColor={colorCode}
                  onChange={setColorCode}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Saving"
            >
              Save Subject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSubjectModal;
