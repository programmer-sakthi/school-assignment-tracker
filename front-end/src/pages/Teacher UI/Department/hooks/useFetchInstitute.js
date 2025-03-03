import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { fetchInstitute } from "../services/fetchInstitute";

const useFetchInstitute = () => {
  const { user } = useContext(AuthContext);
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const getInstitutes = async () => {
        try {
          const data = await fetchInstitute(user);
          setInstitutes(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      getInstitutes();
    }
  }, [user]);

  return { institutes, loading, error };
};

export default useFetchInstitute;
