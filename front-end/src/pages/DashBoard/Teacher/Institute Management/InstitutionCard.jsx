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
import { FiEdit } from "react-icons/fi"; // Update icon
import { GiTeacher } from "react-icons/gi";
import { MdDelete } from "react-icons/md"; // Delete icon
import { PiStudentDuotone } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const InstitutionCard = ({ institute, onUpdate, onDelete }) => {
  return (
    <div>
      <Card
        maxW="sm"
        width={"260px"}
        height={"380px"}
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
            <Heading size="md">{institute.instituteName}</Heading>

            <HStack justify="center" spacing={6} fontSize="lg" color="blue.600">
              <Text>
                <SiGoogleclassroom style={{ display: "inline" }} />{" "}
                {institute.classCount}
              </Text>
              <Text>
                <GiTeacher style={{ display: "inline" }} />
                {institute.teacherCount}
              </Text>
              <Text>
                <PiStudentDuotone style={{ display: "inline" }} />
                {institute.studentCount}
              </Text>
            </HStack>

            <HStack justify="center" spacing={4} mt={4}>
              <Button
                leftIcon={<FiEdit />}
                colorScheme="teal"
                size="sm"
                onClick={() => onUpdate(institute)}
              >
                Update
              </Button>
              <Button
                leftIcon={<MdDelete />}
                colorScheme="red"
                size="sm"
                onClick={() => onDelete(institute.id)}
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
