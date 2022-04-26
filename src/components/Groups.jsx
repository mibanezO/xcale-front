import React, { useState } from "react";
import { saveGroup } from "../services/groupService";
import BaseModal from "./BaseModal";
import GroupLink from "./GroupLink";

function Groups({
  number,
  groups,
  onGroupCreated,
  clearNotifications,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [notification, setNotification] = useState("");

  const handleCreateGroup = () => setOpen(true);
  const handleClearModal = () => {
    setOpen(false);
    setName("");
  };
  const handleChangeName = ({ target: { value } }) => {
    setName(value);
  };
  const createNewGroup = async (e) => {
    e.preventDefault();
    const group = {
      name,
      numbers: [number],
    };
    const { success, saved, error } = await saveGroup(group);
    if (success) {
      onGroupCreated(saved);
      return handleClearModal();
    }
    setNotification(error.message);
  };

  return (
    <>
      <div className="column is-3 is-narrow">
        <article className="hero is-fullheight-with-navbar is-success pl-5">
          <div className="content">
            <div className="columns">
              <div className="column">
                <p className="title">Grupos</p>
              </div>
              <div className="column">
                <button
                  onClick={handleCreateGroup}
                  className="button is-primary is-light"
                >
                  Nuevo Grupo +
                </button>
              </div>
            </div>
            <div className="content">
              {groups.map((group) => (
                <GroupLink
                  key={group.id}
                  group={group}
                  clearNotifications={clearNotifications}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
      <BaseModal
        open={open}
        disableBackground={true}
        onClose={handleClearModal}
      >
        <form onSubmit={createNewGroup}>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Nuevo Grupo</p>
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
                <label className="label">Nombre del Grupo</label>
                <div className="control">
                  <input
                    onChange={handleChangeName}
                    type="text"
                    className="input"
                    placeholder="Nombre del Grupo"
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Crear Nuevo Grupo</button>
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

export default Groups;
