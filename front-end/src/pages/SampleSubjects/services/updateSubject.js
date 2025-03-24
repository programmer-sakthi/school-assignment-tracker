import axios from "axios";

const updateSubject = async (updatedSubject) => {
  try {
    console.log(updatedSubject);

    const response = await axios.put(
      "http://localhost:8080/subjects/" + updatedSubject.id,
      {
        subjectName: updatedSubject.subjectName,
        subjectCode: updatedSubject.subjectCode,
        colorCode: updatedSubject.colorCode,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export { updateSubject };
