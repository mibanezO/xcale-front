import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./views/Chat";
import Register from "./views/Register";
import Login from "./views/Login";
import Conversation from "./views/Conversation";
import "bulma/css/bulma.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />}>
          <Route path=":id" element={<Conversation />} />
          <Route
            path="*"
            element={
              <span>Escoge un Grupo para entrar a una conversación</span>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
