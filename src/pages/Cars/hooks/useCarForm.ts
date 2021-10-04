import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Brand, Car } from "../../../interfaces/cars";
import { getBrands, postCar, putCar } from "../../../services/cars";

export const useCarForm = (
  car: Car | null,
  onSaved: (carId: number, success: boolean) => void
) => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const formik = useFormik<Car>({
    initialValues: {
      brandId: car?.brand?.id?.toString() || "",
      model: car?.model || "",
      picture: car?.picture || "",
      patent: car?.patent || "",
      color: car?.color || "",
      year: car?.year || "",
      automatic: car?.automatic || false,
      kilometers: car?.kilometers ?? "",
    },
    validationSchema: Yup.object().shape({
      brandId: Yup.string().required("Marca requerida"),
      model: Yup.string().required("Modelo requerida"),
      picture: Yup.string(),
      patent: Yup.string().required("Patente requerida"),
      color: Yup.string().required("Color requerido"),
      year: Yup.string().required("Año requerido"),
      automatic: Yup.boolean(),
      kilometers: Yup.string().required("Kilometros requerido"),
    }),
    onSubmit: async (values) => {
      console.log("values: ", values);
      const brand = brands.find((b) => b.id === Number(values.brandId));
      const id = car?.id || Math.round(Math.random() * 1000);
      const data = {
        ...values,
        id,
        brand,
      };

      try {
        if (!car) await postCar(data);
        else await putCar(car.id!, data);

        onSaved(id, true);
      } catch (err) {
        console.log("Save error: ", err);
        onSaved(0, false);
      }
    },
  });

  const loadBrands = async () => {
    try {
      const response = await getBrands();
      const results = response?.data || [];
      setBrands(results);
    } catch (err) {
      console.log("useCarForm - setBrands: ", err);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  return {
    formik,
    brands,
  };
};
