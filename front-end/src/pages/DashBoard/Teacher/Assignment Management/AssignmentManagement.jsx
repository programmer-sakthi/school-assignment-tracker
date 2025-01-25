import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddAssignmentModal from "./AddAssignmentModal";

const assignments = [
  {
    id: 1,
    title: "Math Assignment 1",
    totalStudents: 30,
    completedStudents: 20,
  },
  {
    id: 2,
    title: "English Assignment 2",
    totalStudents: 25,
    completedStudents: 18,
  },
  {
    id: 3,
    title: "Science Assignment 3",
    totalStudents: 28,
    completedStudents: 25,
  },
];

const AssignmentManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentsList, setAssignmentsList] = useState(assignments);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddAssignment = (newAssignment) => {
    setAssignmentsList([...assignmentsList, newAssignment]);
    closeModal();
  };

  return (
    <Box className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Current Assignments</h2>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={openModal}>
          Add Assignment
        </Button>
      </div>

      <div className="mt-4">
        {assignmentsList.map((assignment) => (
          <div
            key={assignment.id}
            className="d-flex justify-content-between align-items-center mb-3 border p-3 rounded"
          >
            <div>
              <h5>{assignment.title}</h5>
              <p>
                {assignment.completedStudents}/{assignment.totalStudents}{" "}
                students completed
              </p>
            </div>
            <Button colorScheme="blue">View Details</Button>
          </div>
        ))}
      </div>
      <AddAssignmentModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleAddAssignment={handleAddAssignment}
      />
    </Box>
  );
};

export default AssignmentManagement;
