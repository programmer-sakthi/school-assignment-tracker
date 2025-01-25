import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import InstitutionCard from "./InstitutionCard";

const InstitutionManagement = () => {
  const [instData, setInstData] = useState([]); // State for institution data
  const [fetchData, setFetchData] = useState(true); // State to show the loader
  const [images, setImages] = useState({}); // Store images by institution ID

  // Function to fetch institutions and their corresponding images
  const fetchInstitutes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/institutes");
      console.log("Institutes data:", response.data);

      // Filter institutions that have valid image data
      const filteredData = response.data.filter(
        (inst) => inst.imageData !== null && inst.imageData !== undefined
      );

      // Fetch images for each institution
      const imagePromises = filteredData.map(async (institute) => {
        try {
          const imageResponse = await axios.get(
            `http://localhost:8080/api/institutes/${institute.id}/image`,
            {
              responseType: "blob",
            }
          );
          return {
            id: institute.id,
            imageURL: URL.createObjectURL(imageResponse.data),
          };
        } catch (error) {
          console.error(
            "Error fetching image for institute:",
            institute.id,
            error
          );
          return { id: institute.id, imageURL: null }; // Fallback for errors
        }
      });

      const imageResults = await Promise.all(imagePromises);

      const updatedInstitutes = filteredData.map((institute) => ({
        ...institute,
        imageURL:
          imageResults.find((img) => img.id === institute.id)?.imageURL || null,
      }));

      setInstData(updatedInstitutes);
      console.log(updatedInstitutes);
      setFetchData(false);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setFetchData(false);
    }
  };

  // Function called when a new institution is added
  const onInstituteAdded = () => {
    setFetchData(true); // Show the loader
    fetchInstitutes(); // Re-fetch the institutions
  };

  // useEffect to fetch institution data on component mount
  useEffect(() => {
    fetchInstitutes();
  }, []);

  return (
    <div>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {instData.map((institution) => (
          <InstitutionCard
            key={institution.id}
            institute={institution}
            onUpdate={(updatedInstitute) => {
              // Handle update logic
              console.log("Updating institute:", updatedInstitute);
            }}
            onDelete={(id) => {
              // Handle delete logic
              console.log("Deleting institute with ID:", id);
            }}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default InstitutionManagement;
