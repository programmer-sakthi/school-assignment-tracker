import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import axios from "axios";
// import { DeleteIcon } from "lucide-react";

const DeleteInstitute = ({ department , onChange}) => {
  const toast = useToast()
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteDepartment/${department.id}`
      );
      toast({
        title: "Department Deleted",
        description: "Department has been deleted successfully",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      onChange()
    } catch (error) {
      window.alert("Error Deleting Department");
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip label="Delete Department">
        <IconButton
          icon={<DeleteIcon />}
          size="sm"
          colorScheme="red"
          variant="ghost"
          aria-label="Delete Department"
          onClick={handleDelete}
        />
      </Tooltip>
    </>
  );
};

export default DeleteInstitute;
