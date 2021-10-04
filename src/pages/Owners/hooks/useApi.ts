import { useState, useEffect } from "react";
import { Owner } from "../../../interfaces/owners";
import { getOwners } from "../../../services/owners";

export const useApi = () => {
  const [owners, setOwners] = useState<Owner[]>([]);

  const loadOwners = async () => {
    try {
      const response = await getOwners();
      const results = response?.data || [];
      setOwners(results);
    } catch (err) {
      console.log("useApi - getOwners: ", err);
    }
  };

  useEffect(() => {
    loadOwners();
  }, []);

  return {
    owners,
    loadOwners,
  };
};
