import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { ArrowUpDown, Moon, Search, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddInstitutionModal from "../DashBoard/Teacher/Institute Management/AddInstitutionModal";
import InstituteCard from "./InstituteCard";

const InstituteList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [instData, setInstData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { user } = useContext(AuthContext);

  const fetchInstitutes = async () => {
    if (!user || !user.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/institutes/${user.id}`
      );

      const filteredData = response.data.filter(
        (inst) => inst.imageData !== null && inst.imageData !== undefined
      );

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
          return { id: institute.id, imageURL: null };
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
    } catch (error) {
      console.error("Error fetching institutes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, [refreshTrigger]);

  const onInstituteListModified = () => {
    // Using a counter to force a refresh
    setRefreshTrigger((prev) => prev + 1);
  };

  const filteredInstitutes = instData
    .filter((institute) =>
      institute.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "students") {
        return b.studentCount - a.studentCount;
      } else if (sortBy === "teachers") {
        return b.teacherCount - a.teacherCount;
      }
      return 0;
    });

  return (
    <div className="space-y-6 m-20 mt-17">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 style={{ fontSize: "40px" }} className="font-mono">
          Institutes
        </h1>

        <HStack spacing={4} width={{ base: "100%", md: "40%" }}>
          <InputGroup
            width="100%"
            minWidth="100%"
            _focusWithin={{ ".search-icon": { color: "blue.500" } }}
          >
            <InputLeftElement pointerEvents="none">
              <Search className={`search-icon text-gray-400 h-5 w-5`} />
            </InputLeftElement>
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

        <HStack spacing={4} flexWrap="wrap">
          <Box position="relative" width="200px" border={"1px solid gray"}>
            <ArrowUpDown
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "gray",
              }}
            />
            <Select
              placeholder="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              pl="8"
              border="none"
              _focus={{ boxShadow: "none" }}
            >
              <option value="name">Name (A-Z)</option>
              <option value="students">Student Count (High to Low)</option>
              <option value="teachers">Teacher Count (High to Low)</option>
            </Select>
          </Box>

          <AddInstitutionModal onInstituteAdded={onInstituteListModified} />
          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <Moon /> : <Sun />}
            onClick={toggleColorMode}
          />
        </HStack>
      </div>

      {isLoading ? (
        <Center p={8}>
          <Spinner size="xl" />
        </Center>
      ) : filteredInstitutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutes.map((institute) => (
            <InstituteCard
              key={institute.id}
              instituteID={institute.id}
              name={institute.name}
              location={institute.location}
              studentCount={institute.studentCount}
              teacherCount={institute.teacherCount}
              imageUrl={institute.imageURL}
              onDelete={onInstituteListModified}
            />
          ))}
        </div>
      ) : (
        <Center p={8}>
          <Flex direction="column" align="center">
            <Text fontSize="xl">No institutes found</Text>
            {searchQuery && (
              <Text fontSize="md">Try a different search term</Text>
            )}
          </Flex>
        </Center>
      )}
    </div>
  );
};

export default InstituteList;
