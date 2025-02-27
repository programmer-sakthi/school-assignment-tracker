import axios from "axios";

// Return a promise that the component can handle
const handleDelete = async (id) => {
  if (!id) {
    return Promise.reject(new Error("Invalid ID"));
  }

  try {
    const response = await axios.delete(
      `http://localhost:8080/api/institutes/${id}`
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { handleDelete };
