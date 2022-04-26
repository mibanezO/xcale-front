import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveNewUser } from "../services/userService";

function Register() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [notification, setNotification] = useState("");

  const handleChangePhone = ({ target: { value } }) => {
    setPhone(value);
  };

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
  };

  const clearNotification = () => {
    setNotification("");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      return setNotification("Debe ingresar el numero de teléfono");
    }
    const { success, saved, error } = await saveNewUser({ name, number: phone });
    if (success) {
      sessionStorage.setItem("user", JSON.stringify(saved));
      navigate("/chat");
    } else {
      setNotification(error.message || error.detail);
    }
  };

  return (
    <>
      {!!notification && (
        <div className="notification is-danger is-light">
          <button onClick={clearNotification} className="delete"></button>
          {notification}
        </div>
      )}
      <div className="columns is-desktop">
        <div className="column is-4 is-offset-4">
          <form className="box mt-6" onSubmit={handleSubmit}>
            <h1 className="title is-flex is-justify-content-center">
              Registrate
            </h1>
            <div className="field">
              <label htmlFor="phone" className="label">
                Teléfono
              </label>
              <div className="control">
                <input
                  onChange={handleChangePhone}
                  type="text"
                  className="input"
                  placeholder="Teléfono"
                  value={phone}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="name" className="label">
                Nombre
              </label>
              <div className="control">
                <input
                  onChange={handleChangeName}
                  type="text"
                  className="input"
                  placeholder="Nombre"
                  value={name}
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary">Registar Usuario</button>
                <button
                  type="button"
                  onClick={navigateToLogin}
                  className="button is-primary is-light"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
