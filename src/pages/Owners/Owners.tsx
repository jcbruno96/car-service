import { useState } from "react";
import styled from "styled-components";

import SlidingPanel from "react-sliding-side-panel";

import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { useApi } from "./hooks/useApi";

import { Button, Col, Collapse, DeleteAlert } from "../../components";

import OwnersList from "./components/OwnersList/OwnersList";
import MobileOwnersList from "./components/MobileOwnersList/MobileOwnersList";
import OwnerForm from "./components/OwnerForm/OwnerForm";

import { Owner } from "../../interfaces/owners";

import { deleteOwner } from "../../services/owners";

const Owners = () => {
  const [ownerForm, showOwnerForm] = useState<"close" | "add" | "edit">(
    "close"
  );
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [actualOwner, setActualOwner] = useState<Owner | null>(null);

  const { width, isMobile } = useResponsive(576);
  const { owners, loadOwners } = useApi();

  const cancelForm = () => {
    setActualOwner(null);
    showOwnerForm("close");
  };

  const savedForm = () => {
    cancelForm();
    loadOwners();
  };

  const deleteHandler = (owner: Owner) => {
    console.log("Delete owner: ", owner.id);
    setActualOwner(owner);
    showDeleteAlert(true);
  };

  const editHandler = (owner: Owner) => {
    console.log("Edit owner: ", owner);
    setActualOwner(owner);
    showOwnerForm("edit");
  };

  const deleteActionAccepted = async () => {
    console.log("Owner deleted: ", actualOwner);
    try {
      await deleteOwner(actualOwner?.id!);
      loadOwners();
      showDeleteAlert(false);
      setActualOwner(null);
    } catch (err) {
      console.log("Delete owner failed: ", err);
    }
  };

  return (
    <>
      <ButtonContainer>
        <Button
          icon="plus"
          color="primary"
          onClick={() => showOwnerForm("add")}
        >
          Propietario
        </Button>
      </ButtonContainer>

      {isMobile ? (
        <MobileOwnersList
          owners={owners}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      ) : (
        <OwnersList
          owners={owners}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      )}

      <SlidingPanel
        type={"right"}
        panelContainerClassName="custom-panel"
        isOpen={ownerForm !== "close"}
        size={isMobile ? 100 : width > 1080 ? 35 : 60}
      >
        <OwnerForm
          owner={actualOwner}
          cancelHandler={cancelForm}
          savedHandler={savedForm}
        />
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

export default Owners;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 16px;
  margin-bottom: 32px;
`;
