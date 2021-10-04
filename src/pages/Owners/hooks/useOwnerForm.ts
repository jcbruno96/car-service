import { useFormik } from "formik";
import * as Yup from "yup";
import { Car } from "../../../interfaces/cars";
import { Owner } from "../../../interfaces/owners";
import { postOwner, putOwner } from "../../../services/owners";

export const useOwnerForm = (
  owner: Owner | null,
  onSaved: (ownerId: number, success: boolean) => void
) => {
  const formik = useFormik<Owner>({
    initialValues: {
      firstName: owner?.firstName || "",
      lastName: owner?.lastName || "",
      picture: owner?.picture || "",
      email: owner?.email || "",
      phone: owner?.phone || "",
      cars: owner?.cars || [],
      carsId: owner?.carsId || [],
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Nombre requerido"),
      lastName: Yup.string().required("Apellido requerido"),
      email: Yup.string().email("Formato invalido").required("Email requerido"),
      phone: Yup.string().required("Teléfono requerido"),
    }),
    onSubmit: async (values) => {
      console.log("values: ", values);
      //const brand = brands.find((b) => b.id === Number(values.brandId));
      const id = owner?.id || Math.round(Math.random() * 1000);
      const data = {
        ...values,
        id,
      };

      try {
        if (!owner) await postOwner(data);
        else await putOwner(owner.id!, data);

        onSaved(id, true);
      } catch (err) {
        console.log("Save error: ", err);
        onSaved(0, false);
      }
    },
  });

  const addCar = (car: Car) => {
    formik.setFieldValue("cars", [...formik.values.cars, car]);
    formik.setFieldValue("carsId", [...(formik.values.carsId || []), car.id!]);
  };

  const deleteCar = (carId: number) => {
    formik.setFieldValue("cars", [
      ...formik.values.cars.filter((c) => c.id !== carId),
    ]);
    formik.setFieldValue("carsId", [
      ...formik.values.carsId!.filter((c) => c !== carId),
    ]);
  };

  return {
    formik,
    addCar,
    deleteCar,
  };
};
