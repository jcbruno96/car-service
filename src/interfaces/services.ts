import { Car } from "./cars";
import { Owner } from "./owners";

export interface Service {
  id: number;
  name: string;
  datetime?: string;
  cost?: number;
  checked?: boolean;
}

export interface Transaction {
  id?: number;
  timestamp: number;
  carId: number;
  owner?: Owner;
  services: Service[];
  cost?: number;
}
