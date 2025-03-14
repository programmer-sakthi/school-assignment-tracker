import {
  Box,
  Container,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../Teacher UI/Layout/Layout";
import BreadcrumbNav from "./BreadcrumbNav";
import DepartmentHeader from "./DepartmentHeader";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import SubjectCard from "./SubjectCard";
import SubjectListItem from "./SubjectList";

const DepartmentSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("grid");
  const { colorMode } = useColorMode();

  // Sample data for demonstration
  const department = {
    name: "Computer Science",
    code: "CS",
    totalSubjects: 24,
    description:
      "Courses related to computing, programming, and information systems",
  };

  const subjects = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      professor: "Dr. Alan Turing",
      assignments: 8,
      color: "#0000ff",
    },
    {
      id: 2,
      code: "CS102",
      name: "Data Structures",
      professor: "Dr. Ada Lovelace",
      assignments: 12,
      color: "#000000",
    },
    {
      id: 3,
      code: "CS201",
      name: "Algorithms",
      professor: "Dr. John McCarthy",
      assignments: 10,
      color: "purple",
    },
    {
      id: 4,
      code: "CS210",
      name: "Computer Architecture",
      professor: "Dr. Linus Torvalds",
      assignments: 6,
      color: "orange",
    },
    {
      id: 5,
      code: "CS301",
      name: "Database Systems",
      professor: "Dr. Grace Hopper",
      assignments: 9,
      color: "red",
    },
    {
      id: 6,
      code: "CS310",
      name: "Web Development",
      professor: "Dr. Tim Berners-Lee",
      assignments: 14,
      color: "teal",
    },
    {
      id: 7,
      code: "CS401",
      name: "Artificial Intelligence",
      professor: "Dr. Andrew Ng",
      assignments: 7,
      color: "pink",
    },
    {
      id: 8,
      code: "CS410",
      name: "Machine Learning",
      professor: "Dr. Geoffrey Hinton",
      assignments: 11,
      color: "yellow",
    },
  ];

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) => {
    const query = searchQuery.toLowerCase();
    return (
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query) ||
      subject.professor.toLowerCase().includes(query)
    );
  });

  // Theme-aware style values
  const bgColor = useColorModeValue("white", "gray.800");
  const pageBgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Layout>
      <Box bg={pageBgColor} minH="100vh">
        <BreadcrumbNav department={department} />

        <Container maxW="6xl" py={6} px={4}>
          <DepartmentHeader
            department={department}
            viewType={viewType}
            setViewType={setViewType}
          />

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {viewType === "grid" ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {filteredSubjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              bg={bgColor}
              borderRadius="lg"
              shadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
            >
              {filteredSubjects.map((subject, index) => (
                <SubjectListItem
                  key={subject.id}
                  subject={subject}
                  isLast={index === filteredSubjects.length - 1}
                />
              ))}
            </Box>
          )}

          {filteredSubjects.length === 0 && <EmptyState />}
        </Container>
      </Box>
    </Layout>
  );
};

export default DepartmentSubjects;
