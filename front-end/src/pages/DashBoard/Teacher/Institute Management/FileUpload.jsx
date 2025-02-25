import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FiUpload, FiFile } from 'react-icons/fi';

function FileUpload({setImage}) {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };
  
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const hoverBorderColor = useColorModeValue('blue.400', 'blue.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <FormControl mt={3} size="sm">
      <FormLabel fontSize="sm" fontWeight="medium">Upload Image</FormLabel>
      <Box
        position="relative"
        borderWidth={1}
        borderRadius="md"
        borderStyle="dashed"
        borderColor={isDragging ? hoverBorderColor : borderColor}
        bgColor={bgColor}
        py={2}
        px={3}
        transition="all 0.2s"
        _hover={{ borderColor: hoverBorderColor }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept="image/*"
          onChange={handleFileChange}
          cursor="pointer"
        />
        <Flex align="center" justify="center" h="36px">
          {fileName ? (
            <Flex align="center">
              <Icon as={FiFile} mr={2} color="blue.500" />
              <Text isTruncated maxW="200px" fontSize="sm">{fileName}</Text>
            </Flex>
          ) : (
            <Flex align="center">
              <Icon as={FiUpload} w={4} h={4} color="gray.500" mr={2} />
              <Text fontSize="sm" color="gray.600">Drop image or click to browse</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </FormControl>
  );
}

export default FileUpload;