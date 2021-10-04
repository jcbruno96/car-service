import { useState, useEffect } from "react";
import { Car } from "../../../interfaces/cars";
import { getCars } from "../../../services/cars";

export const useApi = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const loadCars = async () => {
    try {
      const response = await getCars();
      const results = response?.data || [];
      setCars(results);
    } catch (err) {
      console.log("useApe - getCars: ", err);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return {
    cars,
    loadCars,
  };
};
