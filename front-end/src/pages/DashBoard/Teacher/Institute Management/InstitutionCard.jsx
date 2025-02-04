import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { GiTeacher } from "react-icons/gi";
import { MdDelete } from "react-icons/md"; // Delete icon
import { PiStudentDuotone } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import Swal from "sweetalert2";
import UpdateInstituteModal from "./UpdateInstituteModal";

const InstitutionCard = ({ institute, onUpdate, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      icon: "question",
      title: "Are you sure want to delete " + institute.name + " institute ?",
      text: "All classes and sections assosisated with institute will also be deleted! It cannot be reverted",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(institute)
        fetch(`http://localhost:8080/api/institutes/${institute.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire(
                "Deleted!",
                "The institute has been deleted.",
                "success"
              );
              onDelete(); 
            } else {
              Swal.fire(
                "Error!",
                "There was a problem deleting the institute.",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was a problem deleting the institute.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      <Card
        maxW="sm"
        width={"260px"}
        height={"fit-content"}
        borderRadius="lg"
        boxShadow="lg"
      >
        <CardBody>
          <Image
            src={institute.imageURL}
            alt={institute.instituteName}
            width={"200px"}
            height={"200px"}
            borderRadius="lg"
            objectFit="cover"
            mx="auto"
          />
          <Stack mt="4" spacing="3" textAlign="center">
            <Heading size="md">{institute.name}</Heading>

            <HStack justify="center" spacing={6} fontSize="lg" color="blue.600">
              <Text>
                <SiGoogleclassroom style={{ display: "inline" }} />{" "}
                {institute.classCount}10
              </Text>
              <Text>
                <GiTeacher style={{ display: "inline" }} />
                {institute.teacherCount} 60
              </Text>
              <Text>
                <PiStudentDuotone style={{ display: "inline" }} />
                {institute.studentCount} 70
              </Text>
            </HStack>

            <HStack justify="center" spacing={4} pt={0} mt={0}>
              <UpdateInstituteModal
                institute={institute}
                onInstituteUpdated={() => onUpdate()}
              />
              <Button
                leftIcon={<MdDelete />}
                colorScheme="red"
                size="sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default InstitutionCard;
