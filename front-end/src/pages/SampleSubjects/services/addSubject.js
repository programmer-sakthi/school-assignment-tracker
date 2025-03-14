import axios from 'axios'

export const createSubject = async (subject) => {
    const response=await axios.post("http://localhost:8080/subjects",subject);
    return response.data;
}