import axios from "axios"

const fetchDepartment = async (instituteId) => {
    try{
        const response = await axios.get(
            `http://localhost:8080/getDepartmentsByInstituteId/${instituteId}`
          );
          return response.data;
    }
    catch{
        console.error("Error fetching department:", error);
        throw error;
    }
}

export {fetchDepartment}