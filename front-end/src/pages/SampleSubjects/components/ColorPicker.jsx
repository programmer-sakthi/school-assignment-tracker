import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";

const ColorPicker = ({ selectedColor, onChange }) => {
  // Predefined color options
  const colorOptions = [
    "#3182CE", // Blue
    "#38A169", // Green
    "#E53E3E", // Red
    "#DD6B20", // Orange
    "#D69E2E", // Yellow
    "#805AD5", // Purple
    "#00B5D8", // Cyan
    "#ED64A6", // Pink
    "#4A5568", // Gray
    "#2D3748", // Dark Gray
  ];

  return (
    <>
      {/* Color preview */}
      <Flex align="center" mb={3}>
        <Box
          bg={selectedColor}
          w="36px"
          h="36px"
          borderRadius="md"
          mr={3}
          border="1px solid"
          borderColor="gray.200"
        />
        <Text>{selectedColor}</Text>

        {/* Hidden native color input */}
        <Input
          type="color"
          value={selectedColor}
          onChange={(e) => onChange(e.target.value)}
          w="1px"
          h="1px"
          position="absolute"
          opacity="0"
          id="native-color-input"
        />

        {/* Custom color picker button */}
        <Button
          size="sm"
          ml="auto"
          onClick={() => document.getElementById("native-color-input").click()}
        >
          Custom Color
        </Button>
      </Flex>

      {/* Color palette */}
      <HStack spacing={2} flexWrap="wrap">
        {colorOptions.map((color) => (
          <Box
            key={color}
            bg={color}
            w="30px"
            h="30px"
            borderRadius="md"
            cursor="pointer"
            onClick={() => onChange(color)}
            border={selectedColor === color ? "2px solid" : "1px solid"}
            borderColor={selectedColor === color ? "blue.500" : "gray.200"}
            _hover={{ transform: "scale(1.1)" }}
            transition="transform 0.2s"
          />
        ))}
      </HStack>
    </>
  );
};

export default ColorPicker;
