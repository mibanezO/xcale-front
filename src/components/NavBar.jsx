import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { number, name } = user;

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const modalClasses = ["modal"];

  if (open) modalClasses.push("is-active");

  const title = !name ? `Usuario: ${number}` : name;

  return (
    <>
      <nav
        className="navbar is-success mb-0 p-0"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-item">
          {!!user.photo && (
            <figure className="image is-24x24">
              <img
                src={`data:image/png;base64,${user.photo}`}
                alt="icon"
                className="is-rounded"
              />
            </figure>
          )}
        </div>
        <div className="navbar-start">
          <div className="navbar-item">
            <h1 className="title has-text-white">{title}</h1>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button
              onClick={() => setOpen(true)}
              className="button is-success is-light"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className={modalClasses.join(" ")}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-body">¿Desea cerrar la sesión?</div>
          <div className="modal-card-foot">
            <button onClick={handleLogout} className="button is-success">
              Cerrar Sesión
            </button>
            <button onClick={() => setOpen(false)} className="button">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
