import { useState } from "react";

import styled from "styled-components";
import { useHistory } from "react-router";

import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";

import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { useApi } from "./hooks/useApi";

import { Button, DeleteAlert } from "../../components";

import CarsList from "./components/CarsList/CarsList";
import MobileCarsList from "./components/MobileCarsList/MobileCarsList";
import CarForm from "./components/CarForm/CarForm";

import { Car } from "../../interfaces/cars";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { deleteCar } from "../../services/cars";

const Cars = () => {
  const [carForm, showCarForm] = useState<"close" | "add" | "edit">("close");
  const [transactionForm, showTransactionForm] = useState(false);
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [actualCar, setActualCar] = useState<Car | null>(null);

  const { isMobile, width } = useResponsive(576);
  const { cars, loadCars } = useApi();
  const history = useHistory();

  const cancelForm = () => {
    setActualCar(null);
    showCarForm("close");
    showTransactionForm(false);
  };

  const savedForm = () => {
    cancelForm();
    loadCars();
  };

  const deleteHandler = (car: Car) => {
    console.log("Delete car: ", car.id);
    setActualCar(car);
    showDeleteAlert(true);
  };

  const editHandler = (car: Car) => {
    console.log("Edit car: ", car);
    setActualCar(car);
    showCarForm("edit");
  };

  const addTransactionHandler = (car: Car) => {
    setActualCar(car);
    showTransactionForm(true);
    console.log("Add transaccion handler: ", car);
  };

  const viewDetailHandler = (carId: number) => {
    console.log("View detail handler");
    history.push(`/car/${carId}`);
  };

  const deleteActionAccepted = async () => {
    console.log("Auto eliminado: ", actualCar);
    try {
      await deleteCar(actualCar?.id!);
      loadCars();
      showDeleteAlert(false);
      setActualCar(null);
    } catch (err) {
      console.log("Delete car failed: ", err);
    }
  };

  return (
    <>
      <ButtonContainer>
        <Button icon="plus" color="primary" onClick={() => showCarForm("add")}>
          Automotor
        </Button>
      </ButtonContainer>

      {isMobile ? (
        <MobileCarsList
          cars={cars}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          addTransactionHandler={addTransactionHandler}
          viewDetailHandler={viewDetailHandler}
        />
      ) : (
        <CarsList
          cars={cars}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          addTransactionHandler={addTransactionHandler}
          viewDetailHandler={viewDetailHandler}
        />
      )}

      <SlidingPanel
        type={"right"}
        panelContainerClassName="custom-panel"
        isOpen={transactionForm || carForm !== "close"}
        size={isMobile ? 100 : width > 1080 ? 35 : 60}
      >
        {transactionForm ? (
          <TransactionForm
            carId={actualCar?.id || 0}
            cancelHandler={cancelForm}
          />
        ) : (
          <CarForm
            car={actualCar}
            cancelHandler={cancelForm}
            savedHandler={savedForm}
          />
        )}
      </SlidingPanel>

      <DeleteAlert
        open={deleteAlert}
        text="¿Está seguro que quiere eliminar este registro?"
        cancelHandler={() => showDeleteAlert(false)}
        acceptHandler={deleteActionAccepted}
      />
    </>
  );
};

export default Cars;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 16px;
  margin-bottom: 32px;
`;
