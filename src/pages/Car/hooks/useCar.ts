import { useEffect, useState } from "react";
import { Car } from "../../../interfaces/cars";
import { Owner } from "../../../interfaces/owners";
import { Transaction } from "../../../interfaces/services";
import { getCar } from "../../../services/cars";
import { getCarOwners } from "../../../services/owners";
import { getCarServices } from "../../../services/services";

export const useCar = (carId: string) => {
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [services, setServices] = useState<Transaction[]>([]);
  const [car, setCar] = useState<Car | null>(null);

  const loadCar = async () => {
    try {
      const response = await getCar(Number(carId));
      setCar(response?.data || null);
      //setOwners(response?.data?.owners || []);
    } catch (err) {
      console.log("useCar - getCar: ", err);
    }
  };

  const loadOwners = async () => {
    try {
      const response = await getCarOwners(Number(carId));
      console.log("OWNERS: ", response.data);
      setOwners(response?.data || []);
    } catch (err) {
      console.log("useCar - getOwners: ", err);
    }
  };

  const loadServices = async () => {
    try {
      const response = await getCarServices(Number(carId));
      setServices(response?.data || null);
    } catch (err) {
      console.log("useCar - getCarServices: ", err);
    }
  };

  const getCarInformation = async () => {
    setLoading(true);
    await Promise.all([loadCar(), loadOwners(), loadServices()]);
    setLoading(false);
  };

  useEffect(() => {
    console.log("CAR ID!: ", carId);
    if (carId) {
      getCarInformation();
    }
  }, [carId]);

  return { loading, owners, services, car };
};
