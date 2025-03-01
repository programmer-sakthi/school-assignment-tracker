import { Select } from "@chakra-ui/react";
import useFetchInstitute from "./hooks/useFetchInstitute";

const InstituteSelect = ({ currentInstitute, setCurrentInstitute }) => {
  const { institutes, loading, error } = useFetchInstitute();

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (e) => {
    setCurrentInstitute(e.target.value);
  };

  return (
    <Select value={currentInstitute || ""} onChange={handleChange}>
      <option value="">All Institutes</option>
      {institutes.map((institute) => (
        <option key={institute.id} value={institute.id}>
          {institute.name}
        </option>
      ))}
    </Select>
  );
};

export default InstituteSelect;
