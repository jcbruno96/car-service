import { Owner } from "../interfaces/owners";
import { instance } from "./api";

export const getOwners = () => {
  return instance.get<Owner[]>("/owners");
};

export const getCarOwners = (carId: number) => {
  return instance.get<Owner[]>(`/owners?carsId=${carId}`);
};

export const postOwner = (owner: Owner) => {
  return instance.post(`/owners`, owner);
};

export const putOwner = (ownerId: number, owner: Owner) => {
  return instance.put(`/owners/${ownerId}`, owner);
};

export const deleteOwner = (ownerId: number) => {
  return instance.delete(`/owners/${ownerId}`);
};
