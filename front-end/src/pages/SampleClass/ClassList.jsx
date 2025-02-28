import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

// Sample data for demonstration (replace with your actual data)
const classData = [
  {
    id: 1,
    name: "Mathematics 101",
    studentCount: 25,
    teacherCount: 1,
    activeAssignments: 3,
  },
  {
    id: 2,
    name: "Physics 201",
    studentCount: 30,
    teacherCount: 2,
    activeAssignments: 5,
  },
  {
    id: 3,
    name: "Chemistry 301",
    studentCount: 20,
    teacherCount: 1,
    activeAssignments: 2,
  },
];

const ClassList = () => {
  return (
    <Box
      p={6}
      maxW="container.md"
      mx="auto"
      className="shadow-lg rounded-lg bg-gray-100" // Tailwind CSS classes
    >
      <Heading as="h2" size="lg" mb={6} className="text-center text-blue-600">
        Institute Classes
      </Heading>
      <VStack spacing={4} align="stretch">
        {classData.map((classItem) => (
          <Flex
            key={classItem.id}
            p={4}
            bg="white"
            borderRadius="md"
            justify="space-between"
            align="center"
            className="hover:bg-gray-50 transition duration-200" // Tailwind CSS hover effect
          >
            <Text fontWeight="bold" fontSize="lg" className="text-gray-800">
              {classItem.name}
            </Text>
            <Flex gap={6}>
              <Text className="text-gray-600">
                Students:{" "}
                <span className="font-semibold">{classItem.studentCount}</span>
              </Text>
              <Text className="text-gray-600">
                Teachers:{" "}
                <span className="font-semibold">{classItem.teacherCount}</span>
              </Text>
              <Text className="text-gray-600">
                Assignments:{" "}
                <span className="font-semibold">
                  {classItem.activeAssignments}
                </span>
              </Text>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default ClassList;
