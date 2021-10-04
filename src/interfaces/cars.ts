import { Owner } from "./owners";
import { Service } from "./services";

export interface Car {
  id?: number;
  brandId?: number | string;
  brand?: Brand;
  model: string;
  year: number | string;
  color: string;
  patent: string;
  kilometers: number | string;
  automatic?: boolean;
  picture?: string;
  owners?: Owner[];
  services?: Service[];
}

export interface Brand {
  id: number;
  name: string;
}
