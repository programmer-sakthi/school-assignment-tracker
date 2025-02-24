import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { Moon, Search, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import InstituteCard from "./InstituteCard";

const InstituteList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [instData, setInstData] = useState([]);
  const [fetchData, setFetchData] = useState(true);

  const { user } = useContext(AuthContext);

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/institutes/" + user.id
      );

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
            image: imageResponse.data,
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
        image:
          imageResults.find((img) => img.id === institute.id)?.image || null,
      }));

      setInstData(updatedInstitutes);
      // console.log(updatedInstitutes);
      setFetchData(false);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setFetchData(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
    console.log(instData);
  }, []);

  const filteredInstitutes = instData.filter((institute) =>
    institute.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 m-20 mt-17">
      <div className="flex items-center justify-between flex-wrap">
        {/* <HStack spacing={4} width={"10%"}> */}
        <h1 style={{ fontSize: "40px" }} className="font-mono">
          Institutes
        </h1>
        {/* </HStack> */}
        <HStack spacing={4} width={"40%"}>
          <InputGroup
            width="100%"
            minWidth="100%"
            _focusWithin={{ ".search-icon": { color: "blue.500" } }}
          >
            <InputLeftElement pointerEvents="none">
              <Search className={`search-icon text-gray-400 h-5 w-5`} />
            </InputLeftElement>
            ``
            <Input
              placeholder="Search institutes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              textAlign="center"
              paddingRight={"60px"}
            />
          </InputGroup>
        </HStack>

        <HStack spacing={4}>
          <Button colorScheme="blue">Add Institute</Button>
          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <Moon /> : <Sun />}
            onClick={toggleColorMode}
          />
        </HStack>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutes.map((institute) => (
          <InstituteCard
            key={institute.id}
            name={institute.name}
            location={institute.location}
            studentCount={institute.studentCount}
            teacherCount={institute.teacherCount}
            imageUrl={institute.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default InstituteList;
