import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

const DeleteConfirmationDialog = ({ instituteName, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleConfirmDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <button
        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
        onClick={onOpen}
        aria-label={`Delete ${instituteName}`}
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Institute
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {instituteName}? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirmationDialog;