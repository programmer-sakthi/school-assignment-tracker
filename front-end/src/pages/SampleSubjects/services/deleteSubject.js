import axios from "axios";

const handleDelete = async (id) => {
  const response = await axios.delete(`http://localhost:8080/subjects/${id}`);
};

export { handleDelete };
