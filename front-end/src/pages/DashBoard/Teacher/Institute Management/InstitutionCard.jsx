import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { GiTeacher } from "react-icons/gi";
import { PiStudentDuotone } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const InstitutionCard = ({ institute }) => {
  return (
    <div>
      <Card maxW="sm" width={"260px"} height={"400px"}>
        <CardBody>
          <Image
            src={institute.imageURL}
            width={"200px"}
            height={"200px"}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{institute.instituteName}    </Heading>
            <Text color="blue.600" fontSize="2xl">
              <p>
                <SiGoogleclassroom style={{ display: "inline" }} />{" "}
                {institute.classCount}
              </p>
              <p>
                <GiTeacher style={{ display: "inline" }} />
                {""}
                {institute.teacherCount}
                <PiStudentDuotone style={{ display: "inline" , marginLeft: "20px" , marginTop : "20px" }} />
                {institute.studentCount}
              </p>
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default InstitutionCard;
