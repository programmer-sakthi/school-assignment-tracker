import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { FiEdit } from "react-icons/fi";
import ColorPicker from "./components/colorPicker";
import { updateSubject } from "./services/updateSubject";

const UpdateSubjectModal = ({ subject, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subjectName, setSubjectName] = useState(subject.subjectName);
  const [subjectCode, setSubjectCode] = useState(subject.subjectCode);
  const [colorCode, setColorCode] = useState("#3182CE");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Set initial form values when subject prop changes
  useEffect(() => {
    if (subject) {
      setSubjectName(subject.subjectName || "");
      setSubjectCode(subject.subjectCode || "");
      setColorCode(subject.colorCode || "#3182CE");
    }
  }, [subject]);

  const handleSubmit = async () => {
    // Create the updated subject object
    const updatedSubject = {
      ...subject,
      subjectName: subjectName,
      subjectCode: subjectCode,
      colorCode: colorCode,
    };

    setIsLoading(true);

    try {
      await updateSubject(updatedSubject);

      toast({
        title: "Subject updated",
        description: `${subjectName} has been updated successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onUpdate();

      // Close modal
      onClose();
    } catch (error) {
      toast({
        title: "Error updating subject",
        description:
          error.message || "An error occurred while updating the subject.",
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
      <Tooltip label="Update">
        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            onOpen();
          }}
          aria-label="Update subject"
        >
          <Icon as={FiEdit} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Subject</ModalHeader>
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
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Saving"
            >
              Update Subject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateSubjectModal;
