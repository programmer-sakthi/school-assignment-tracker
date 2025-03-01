import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import axios from "axios";
// import { DeleteIcon } from "lucide-react";

const DeleteInstitute = ({ department }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteDepartment/${department.id}`
      );
      window.alert("Department Deleted");
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
