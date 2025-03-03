import axios from "axios";

const fetchInstitute = async (user) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/institutes/${user.id}`
    );

    const insituteData = response.data.map((institute) => {
        return {
            id: institute.id,
            name: institute.name
        }
    });
    return insituteData;
  } catch (error) {
    console.error("Error fetching department:", error);
    throw error;
  }
};

export {fetchInstitute}


