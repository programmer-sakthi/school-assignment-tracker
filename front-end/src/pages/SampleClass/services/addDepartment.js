import axios from "axios";

export const createDepartment = async (departmentData) => {
  const response = await axios.post(
    "http://localhost:8080/departments",
    departmentData
  );
  return response.data;
};

export const mapDepartmentToInstitute = async (departmentId, instituteId) => {
  const response = await axios.post(
    `http://localhost:8080/mapDepartmentToInstitute/${departmentId}/${instituteId}`
  );
  return response.data;
};
