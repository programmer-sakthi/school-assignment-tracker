import axios from "axios"

const getSubjects = async () => {
    const response=await axios.get("http://localhost:8080/subjects")
    console.log(response)
    return response.data;
}

export {getSubjects}