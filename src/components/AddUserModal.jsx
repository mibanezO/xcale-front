import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { addToGroup } from "../services/groupService";

function AddUserModal({ groupId }) {
  const [open, setOpen] = useState("");
  const [number, setNumber] = useState("");
  const [notification, setNotification] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClearModal = () => {
    setNumber("");
    setOpen(false);
  };
  const handleChangeNumber = ({ target: { value } }) => {
    setNumber(value);
  };
  const addNewUser = async (e) => {
    e.preventDefault();
    const response = await addToGroup(groupId, number);
    if (response.success) {
        setNumber('');
        setOpen(false);
    } else {
        setNotification(response.error.message);
    }
  };

  return (
    <>
      <div className="column is-1">
        <div className="field">
          <div className="control">
            <button className="button is-success" onClick={handleOpen}>
              Agregar Usuario
            </button>
          </div>
        </div>
      </div>
      <BaseModal
        open={open}
        disableBackground={true}
        onClose={handleClearModal}
      >
        <form onSubmit={addNewUser}>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Añadir usuario</p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={handleClearModal}
              ></button>
            </header>
            <section className="modal-card-body">
              {!!notification && (
                <div className="notification is-danger is-light">
                  <button
                    onClick={() => setNotification("")}
                    className="delete"
                  ></button>
                  {notification}
                </div>
              )}
              <div className="field">
                <label className="label">Teléfono del usuario</label>
                <div className="control">
                  <input
                    onChange={handleChangeNumber}
                    type="text"
                    className="input"
                    placeholder="Teléfono"
                    value={number}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Añadir</button>
              <button
                onClick={handleClearModal}
                type="button"
                className="button"
              >
                Cancelar
              </button>
            </footer>
          </div>
        </form>
      </BaseModal>
    </>
  );
}

export default AddUserModal;
