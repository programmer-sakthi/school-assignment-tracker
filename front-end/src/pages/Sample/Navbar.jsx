import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const navItems = [
    "Dashboard",
    "Navigator",
    "Assignments",
    "Favourites",
    "FAQs",
  ];

  const handleNavItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={4}
      px={8}
      bg={isDark ? "gray.800" : "white"}
      color={isDark ? "white" : "black"}
      borderRadius="full"
      borderWidth="1px"
      borderColor={isDark ? "gray.600" : "gray.200"}
      boxShadow="sm"
      maxW="container.xl"
      mx="auto"
      my={4}
    >
      {/* Logo */}
      <Text fontSize="xl" fontWeight="bold">
        AsignTrack
      </Text>

      {/* Navigation Links */}
      <HStack spacing={8} display={{ base: "none", md: "flex" }}>
        {navItems.map((item) => (
          <Link
            key={item}
            onClick={() => handleNavItemClick(item)}
            position="relative"
            _hover={{ textDecoration: "none" }}
          >
            <Text
              fontWeight={selectedItem === item ? "bold" : "normal"}
              color={
                selectedItem === item
                  ? isDark
                    ? "blue.300"
                    : "blue.500"
                  : "inherit"
              }
              _hover={{ color: isDark ? "blue.300" : "blue.500" }}
              cursor="pointer"
            >
              {item}
            </Text>
            {selectedItem === item && (
              <Flex
                position="absolute"
                bottom="-10px"
                left="0"
                right="0"
                justify="center"
              >
                <Flex
                  h="3px"
                  w="70%"
                  bg={isDark ? "blue.300" : "blue.500"}
                  borderRadius="full"
                />
              </Flex>
            )}
          </Link>
        ))}
      </HStack>

      {/* Right side - Theme toggle and profile icon */}
      <HStack spacing={4}>
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          p={2}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Button variant="ghost" p={2} borderRadius="full" aria-label="Profile">
          <Icon as={FaUserCircle} boxSize={6} />
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
