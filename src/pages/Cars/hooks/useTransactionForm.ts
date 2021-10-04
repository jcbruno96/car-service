import { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Service, Transaction } from "../../../interfaces/services";
import { Owner } from "../../../interfaces/owners";
import { getServices, postTransaction } from "../../../services/services";
import { getCarOwners } from "../../../services/owners";

type FormType = {
  owner: string;
  services: {
    [id: number]: Service;
  };
};

export const useTransactionForm = (
  carId: number,
  onSaved: (success: boolean) => void
) => {
  const [services, setServices] = useState<Service[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);

  const formik = useFormik<FormType>({
    initialValues: {
      owner: "",
      services: {},
    },
    validationSchema: Yup.object().shape({
      owner: Yup.string().required("Propietario requerido"),
    }),
    onSubmit: async (values) => {
      console.log("values: ", values);
      const services = Object.values(formik.values.services).filter(
        (s) => s.checked
      );
      const owner = owners.find((o) => o.id === Number(values.owner));

      const data: Transaction = {
        owner,
        services,
        carId,
        timestamp: Date.now(),
        cost: getCost(),
      };
      try {
        console.log("Transaction daa: ", data);
        await postTransaction(data);
        onSaved(true);
      } catch (err) {
        console.log("useTransactionForm - onSubmit: ", err);
        onSaved(false);
      }
    },
  });

  const loadServices = async () => {
    try {
      const response = await getServices();
      const results = response?.data || [];
      setServices(results);
    } catch (err) {
      console.log("useApi - getServices: ", err);
    }
  };

  const loadOwners = async () => {
    try {
      const response = await getCarOwners(carId);
      const results = response?.data?.map((owner) => ({
        ...owner,
        name: `${owner.firstName} ${owner.lastName}`,
      }));
      setOwners(results || []);
    } catch (err) {
      console.log("useApi - setOwners: ", err);
    }
  };

  const updateServices = (service: Service) => {
    const actual = formik.values.services[service.id];
    formik.setFieldValue("services", {
      ...formik.values.services,
      [service.id]: {
        ...service,
        checked: actual ? !actual.checked : true,
      },
    });
  };

  const getCost = () => {
    const services = Object.values(formik.values.services);
    return services.reduce((acc: number, curr: Service) => {
      return acc + (curr?.checked ? curr?.cost || 0 : 0);
    }, 0);
  };

  useEffect(() => {
    loadServices();
    loadOwners();
  }, []);

  return {
    formik,
    owners,
    services,
    updateServices,
    getCost,
  };
};
