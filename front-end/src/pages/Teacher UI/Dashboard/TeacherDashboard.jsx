import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  AddIcon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { FaClock, FaExclamation, FaFilter } from "react-icons/fa";
import Layout from "../Layout/Layout";

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("All Classes");

  // Mock data
  const classes = [
    "All Classes",
    "Science 101",
    "Mathematics 9A",
    "English Literature",
    "History 10B",
  ];

  const stats = [
    { label: "Active Assignments", value: 24, change: "+3 from last week" },
    { label: "Pending Reviews", value: 47, change: "12 due today" },
    { label: "Class Average", value: "78%", change: "+2% from last month" },
    { label: "Completion Rate", value: "87%", change: "-3% from last week" },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Chemical Reactions Lab Report",
      class: "Science 101",
      dueDate: "Feb 28, 2025",
      submissions: 15,
      totalStudents: 28,
      status: "Active",
    },
    {
      id: 2,
      title: "Algebraic Equations Quiz",
      class: "Mathematics 9A",
      dueDate: "Mar 2, 2025",
      submissions: 0,
      totalStudents: 32,
      status: "Scheduled",
    },
    {
      id: 3,
      title: "Essay: The Great Gatsby Analysis",
      class: "English Literature",
      dueDate: "Mar 5, 2025",
      submissions: 8,
      totalStudents: 30,
      status: "Active",
    },
    {
      id: 4,
      title: "World War II Timeline Project",
      class: "History 10B",
      dueDate: "Mar 10, 2025",
      submissions: 0,
      totalStudents: 25,
      status: "Scheduled",
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      student: "Alex Johnson",
      assignment: "Photosynthesis Quiz",
      class: "Science 101",
      submittedDate: "Feb 26, 2025",
      status: "Pending Review",
    },
    {
      id: 2,
      student: "Sarah Williams",
      assignment: "Calculus Test",
      class: "Mathematics 9A",
      submittedDate: "Feb 26, 2025",
      status: "Pending Review",
    },
    {
      id: 3,
      student: "Michael Brown",
      assignment: "Shakespeare Essay",
      class: "English Literature",
      submittedDate: "Feb 25, 2025",
      status: "Graded",
      grade: "A-",
    },
    {
      id: 4,
      student: "Emma Davis",
      assignment: "Ancient Rome Presentation",
      class: "History 10B",
      submittedDate: "Feb 25, 2025",
      status: "Graded",
      grade: "B+",
    },
  ];

  const studentPerformance = [
    {
      name: "Alex J.",
      assignmentsCompleted: 14,
      avgGrade: 88,
      lastSubmission: "3h ago",
    },
    {
      name: "Sarah W.",
      assignmentsCompleted: 15,
      avgGrade: 92,
      lastSubmission: "6h ago",
    },
    {
      name: "Michael B.",
      assignmentsCompleted: 12,
      avgGrade: 76,
      lastSubmission: "1d ago",
    },
    {
      name: "Emma D.",
      assignmentsCompleted: 13,
      avgGrade: 83,
      lastSubmission: "2d ago",
    },
    {
      name: "Daniel T.",
      assignmentsCompleted: 10,
      avgGrade: 74,
      lastSubmission: "2d ago",
    },
  ];

  const reminders = [
    {
      id: 1,
      text: "Grade Science 101 lab reports",
      priority: "High",
      due: "Today",
    },
    {
      id: 2,
      text: "Prepare next week's math quiz",
      priority: "Medium",
      due: "Tomorrow",
    },
    { id: 3, text: "Parent-teacher meeting", priority: "High", due: "Feb 28" },
    {
      id: 4,
      text: "Submit quarterly progress reports",
      priority: "Medium",
      due: "Mar 5",
    },
  ];

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Scheduled":
        return "blue";
      case "Completed":
        return "gray";
      case "Pending Review":
        return "orange";
      case "Graded":
        return "purple";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <Layout>
      <Box p={5} minH="100vh" bg={useColorModeValue("gray.50", "gray.900")} margin={"20"} marginTop={"7"}>
        {/* Header */}
        <Flex mb={6} justify="space-between" align="center">
          <Box>
            <Heading size="lg">Teacher Dashboard</Heading>
            <Text color="gray.500">
              Welcome back! Here's what's happening today.
            </Text>
          </Box>

          <HStack spacing={4}>
            <InputGroup w="300px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Search assignments, students..." />
            </InputGroup>

            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              position="relative"
            />

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {selectedClass}
              </MenuButton>
              <MenuList>
                {classes.map((cls) => (
                  <MenuItem key={cls} onClick={() => setSelectedClass(cls)}>
                    {cls}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Button leftIcon={<AddIcon />} colorScheme="blue">
              New Assignment
            </Button>
          </HStack>
        </Flex>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={6}>
          {stats.map((stat, index) => (
            <Stat
              key={index}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg={bgColor}
            >
              <StatLabel fontWeight="medium">{stat.label}</StatLabel>
              <StatNumber fontSize="3xl">{stat.value}</StatNumber>
              <StatHelpText>{stat.change}</StatHelpText>
            </Stat>
          ))}
        </SimpleGrid>

        {/* Main Content */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Left Column - Assignment Tables */}
          <GridItem>
            {/* Upcoming Assignments */}
            <Card shadow="md" mb={6} borderRadius="lg" bg={bgColor}>
              <CardHeader pb={0}>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Upcoming Assignments</Heading>
                  <HStack>
                    <IconButton
                      icon={<FaFilter />}
                      variant="ghost"
                      size="sm"
                      aria-label="Filter assignments"
                    />
                    <IconButton
                      icon={<CalendarIcon />}
                      variant="ghost"
                      size="sm"
                      aria-label="View calendar"
                    />
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody>
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr>
                      <Th>Assignment</Th>
                      <Th>Class</Th>
                      <Th>Due Date</Th>
                      <Th>Submissions</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {upcomingAssignments.map((assignment) => (
                      <Tr key={assignment.id}>
                        <Td fontWeight="medium">{assignment.title}</Td>
                        <Td>{assignment.class}</Td>
                        <Td>{assignment.dueDate}</Td>
                        <Td>
                          <HStack>
                            <Text>{`${assignment.submissions}/${assignment.totalStudents}`}</Text>
                            <Progress
                              value={
                                (assignment.submissions /
                                  assignment.totalStudents) *
                                100
                              }
                              size="sm"
                              w="80px"
                              colorScheme={
                                assignment.submissions > 0 ? "green" : "gray"
                              }
                              borderRadius="full"
                            />
                          </HStack>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={getStatusColor(assignment.status)}
                          >
                            {assignment.status}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Recent Submissions */}
            <Card shadow="md" borderRadius="lg" bg={bgColor}>
              <CardHeader pb={0}>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Recent Submissions</Heading>
                  <Button size="sm" variant="ghost">
                    View All
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr>
                      <Th>Student</Th>
                      <Th>Assignment</Th>
                      <Th>Class</Th>
                      <Th>Submitted</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentSubmissions.map((submission) => (
                      <Tr key={submission.id}>
                        <Td>
                          <HStack>
                            <Avatar size="xs" name={submission.student} />
                            <Text>{submission.student}</Text>
                          </HStack>
                        </Td>
                        <Td>{submission.assignment}</Td>
                        <Td>{submission.class}</Td>
                        <Td>{submission.submittedDate}</Td>
                        <Td>
                          <HStack>
                            <Badge
                              colorScheme={getStatusColor(submission.status)}
                            >
                              {submission.status}
                            </Badge>
                            {submission.grade && (
                              <Badge colorScheme="green">
                                {submission.grade}
                              </Badge>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>

          {/* Right Column - Reminders and Student Performance */}
          <GridItem>
            {/* Tabs for Reminders and Student Performance */}
            <Card shadow="md" borderRadius="lg" bg={bgColor}>
              <CardBody p={0}>
                <Tabs isFitted colorScheme="blue">
                  <TabList>
                    <Tab fontWeight="medium">Reminders</Tab>
                    <Tab fontWeight="medium">Student Performance</Tab>
                  </TabList>

                  <TabPanels>
                    {/* Reminders Panel */}
                    <TabPanel>
                      {reminders.map((reminder) => (
                        <Flex
                          key={reminder.id}
                          p={3}
                          mb={2}
                          borderWidth="1px"
                          borderRadius="md"
                          justify="space-between"
                          align="center"
                          borderLeftWidth="4px"
                          borderLeftColor={getPriorityColor(reminder.priority)}
                        >
                          <HStack>
                            {reminder.priority === "High" ? (
                              <FaExclamation color="red" />
                            ) : (
                              <FaClock />
                            )}
                            <Box>
                              <Text fontWeight="medium">{reminder.text}</Text>
                              <Text fontSize="sm" color="gray.500">
                                Due: {reminder.due}
                              </Text>
                            </Box>
                          </HStack>
                          <Tag
                            size="sm"
                            colorScheme={getPriorityColor(reminder.priority)}
                          >
                            <TagLabel>{reminder.priority}</TagLabel>
                          </Tag>
                        </Flex>
                      ))}
                      <Button w="full" mt={2} variant="outline">
                        Add Reminder
                      </Button>
                    </TabPanel>

                    {/* Student Performance Panel */}
                    <TabPanel>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Student</Th>
                            <Th isNumeric>Completed</Th>
                            <Th isNumeric>Avg. Grade</Th>
                            <Th>Last Activity</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {studentPerformance.map((student, idx) => (
                            <Tr key={idx}>
                              <Td>
                                <HStack>
                                  <Avatar size="xs" name={student.name} />
                                  <Text>{student.name}</Text>
                                </HStack>
                              </Td>
                              <Td isNumeric>{student.assignmentsCompleted}</Td>
                              <Td isNumeric>
                                <Badge
                                  colorScheme={
                                    student.avgGrade >= 85
                                      ? "green"
                                      : student.avgGrade >= 75
                                      ? "yellow"
                                      : "red"
                                  }
                                >
                                  {student.avgGrade}%
                                </Badge>
                              </Td>
                              <Td>{student.lastSubmission}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      <Button w="full" mt={4} variant="outline">
                        View Full Report
                      </Button>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>

            {/* Calendar Preview */}
            <Card shadow="md" borderRadius="lg" bg={bgColor} mt={6}>
              <CardHeader pb={0}>
                <Heading size="md">Calendar View</Heading>
              </CardHeader>
              <CardBody>
                <Text color="gray.500" mb={4}>
                  Upcoming deadlines and events
                </Text>

                {/* Simplified Calendar View */}
                <SimpleGrid columns={7} spacing={2} mb={4}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <Box
                        key={day}
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="sm"
                      >
                        {day}
                      </Box>
                    )
                  )}

                  {[...Array(7)].map((_, idx) => (
                    <Box
                      key={idx}
                      h="60px"
                      borderWidth="1px"
                      borderRadius="md"
                      textAlign="center"
                      py={2}
                      bg={idx === 1 ? "blue.50" : "transparent"}
                      borderColor={idx === 1 ? "blue.200" : borderColor}
                    >
                      <Text fontWeight={idx === 1 ? "bold" : "normal"}>
                        {idx + 26}
                      </Text>
                      {idx === 1 && (
                        <Box
                          w="80%"
                          mx="auto"
                          h="8px"
                          bg="blue.400"
                          borderRadius="full"
                        />
                      )}
                    </Box>
                  ))}
                </SimpleGrid>

                <Button w="full" leftIcon={<CalendarIcon />} variant="outline">
                  Open Full Calendar
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};

export default TeacherDashboard;
