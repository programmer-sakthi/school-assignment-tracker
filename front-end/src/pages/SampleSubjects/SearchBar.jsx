import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <InputGroup mb={6}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color={subTextColor} />
      </InputLeftElement>
      <Input
        pl={10}
        py={3}
        borderRadius="lg"
        placeholder="Search subjects, codes, or professors..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg={bgColor}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;
