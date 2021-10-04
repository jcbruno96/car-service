import { Api } from "../interfaces/api";
import { Brand, Car } from "../interfaces/cars";
import { instance } from "./api";

export const getCars = () => {
  return instance.get<Car[]>("/cars");
};

export const getCar = (carId: number) => {
  return instance.get<Car>(`/cars/${carId}`);
};

export const getCarByPatent = (patent: string) => {
  return instance.get<Car[]>(`/cars?patent=${patent}`);
};

export const postCar = (car: Car) => {
  return instance.post(`/cars`, car);
};

export const putCar = (carId: number, car: Car) => {
  return instance.put(`/cars/${carId}`, car);
};

export const deleteCar = (carId: number) => {
  return instance.delete(`/cars/${carId}`);
};

export const getBrands = () => {
  return instance.get<Brand[]>("/brands");
};
