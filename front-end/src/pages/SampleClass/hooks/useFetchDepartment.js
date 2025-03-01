import { useEffect, useState } from "react";
import { fetchDepartment } from "../services/fetchDepartment";

const useFetchDepartment = (instituteId) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!instituteId) return;

    const getDepartments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDepartment(instituteId);
        setDepartments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getDepartments();
  }, [instituteId]);

  return { departments, loading, error };
};

export default useFetchDepartment;
