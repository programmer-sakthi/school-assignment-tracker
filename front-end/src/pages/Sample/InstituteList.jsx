import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import InstituteCard from "./InstituteCard";

// Mock data for initial development
const mockInstitutes = [
  {
    id: 1,
    name: "Tech University",
    location: "Silicon Valley",
    studentCount: 5000,
    teacherCount: 250,
    imageUrl: "https://example.com/tech-uni.jpg",
  },
  {
    id: 2,
    name: "Design Academy",
    location: "New York",
    studentCount: 2500,
    teacherCount: 120,
    imageUrl: null,
  },
  {
    id: 3,
    name: "Science Institute",
    location: "Boston",
    studentCount: 3200,
    teacherCount: 180,
    imageUrl: "https://example.com/science-inst.jpg",
  },
  {
    id: 4,
    name: "Business School",
    location: "London",
    studentCount: 1800,
    teacherCount: 90,
    imageUrl: null,
  },
];

const InstituteList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const filteredInstitutes = mockInstitutes.filter((institute) =>
    institute.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 m-20 mt-17">
      <div className="flex items-center justify-between flex-wrap" >
        {/* <HStack spacing={4} width={"10%"}> */}
          <h1 style={{ fontSize: "40px" }} className="font-mono">Institutes</h1>
        {/* </HStack> */}
        <HStack spacing={4} width={"40%"}>
          <InputGroup
            width="100%"
            minWidth="100%"
            _focusWithin={{ ".search-icon": { color: "blue.500" } }}
          >
            <InputLeftElement pointerEvents="none">
              <Search className={`search-icon text-gray-400 h-5 w-5`} />
            </InputLeftElement>``
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
            imageUrl={institute.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default InstituteList;
