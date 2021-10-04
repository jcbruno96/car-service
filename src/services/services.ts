import { Service, Transaction } from "../interfaces/services";
import { instance } from "./api";

export const getServices = () => {
  return instance.get<Service[]>("/services");
};

export const getCarServices = (carId: number) => {
  return instance.get<Transaction[]>(`/transactions?carId=${carId}`);
};

export const postTransaction = (transaction: Transaction) => {
  return instance.post("/transactions", transaction);
};
