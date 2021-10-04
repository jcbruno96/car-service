import { Car } from "./cars";

export interface Owner {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  picture?: string;
  registerTime?: string;
  cars: Car[];
  carsId?: number[];
}
