import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../services/userService";

function Login({}) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [notification, setNotification] = useState("");

  const handleChangePhone = ({ target: { value } }) => {
    setPhone(value);
  };

  const clearNotification = () => {
    setNotification("");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      return setNotification("Debe ingresar el numero de teléfono");
    }
    const { success, user, error } = await fetchUser(phone);
    if (success) {
      sessionStorage.setItem("user", JSON.stringify(user));
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
              Group Chat App
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
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary">Login</button>
                <button
                  type="button"
                  onClick={navigateToRegister}
                  className="button is-primary is-light"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
