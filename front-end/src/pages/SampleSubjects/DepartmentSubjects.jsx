import {
  Box,
  Container,
  SimpleGrid,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../Teacher UI/Layout/Layout";
import BreadcrumbNav from "./BreadcrumbNav";
import DepartmentHeader from "./DepartmentHeader";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import SubjectCard from "./SubjectCard";
import SubjectListItem from "./SubjectList";
import { getSubjects } from "./services/fetchSubjects";

const DepartmentSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("grid");
  const { colorMode } = useColorMode();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  const department = {
    name: "Computer Science",
    code: "CS",
    totalSubjects: 24,
    description:
      "Courses related to computing, programming, and information systems",
  };

  const fetchSubjects = async () => {
    try {
      const subjectData = await getSubjects();
      setSubjects(subjectData);
      console.log(subjectData)
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter((subject) => {
    if (!subject) return false;

    const query = searchQuery.toLowerCase();

    return (
      (subject.subjectName && subject.subjectName.toLowerCase().includes(query)) ||
      (subject.subjectCode && subject.subjectCode.toLowerCase().includes(query)) ||
      (subject.professor && subject.professor.toLowerCase().includes(query))
    );
  });

  // Theme-aware style values
  const bgColor = useColorModeValue("white", "gray.800");
  const pageBgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={6}
                >
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
      )}
    </>
  );
};

export default DepartmentSubjects;
