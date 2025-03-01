import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import {
  createDepartment,
  mapDepartmentToInstitute,
} from "../services/addDepartment";

const useAddDepartment = (onClose, onAddDepartment) => {
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
      const newDepartment = await createDepartment(formData);
      await mapDepartmentToInstitute(newDepartment.id, formData.instituteId);

      toast({
        title: "Success",
        description: `${formData.name} department has been created`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Call onAddDepartment callback if provided
      if (onAddDepartment) {
        onAddDepartment(newDepartment);
      }

      // Reset form data
      setFormData({ name: "", instituteId: "" });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to create department",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleInstituteChange,
    handleSubmit,
  };
};

export default useAddDepartment;
