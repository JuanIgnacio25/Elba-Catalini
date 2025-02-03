"use client";

import "./contact.css";

import { useState } from "react";
import axios from "axios";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setResponse("");
    setError("");

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("company", company);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const res = await axios.post("/api/contact", formData);

      setResponse(res.data);

      setFullName("");
      setCompany("");
      setLocation("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setError(
        "Ocurrio un error al mandar el formulario, intente completarlo de nuevo."
      );
    }
  };

  return (
    <div className="contact-container">
      <div className="contact">
        <h1 className="contact-form-title">Formulario de Contacto</h1>
        <form className="contact-form" onSubmit={handleFormSubmit}>
          <div className="contact-form-data">
            <p className="contact-form-data-label">Nombre y apellido*</p>
            <input
              className="contact-form-data-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="contact-form-data">
            <p className="contact-form-data-label">Empresa*</p>
            <input
              className="contact-form-data-input"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="contact-form-data">
            <p className="contact-form-data-label">Localidad/Provincia*</p>
            <input
              className="contact-form-data-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="contact-form-data">
            <p className="contact-form-data-label">Correo Electronico*</p>
            <input
              className="contact-form-data-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="contact-form-data">
            <p className="contact-form-data-label">Detalles de tu consulta*</p>
            <textarea
              className="contact-form-data-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="contact-form-button-container">
            <button className="contact-form-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
        <div
          className={`contact-form-response ${
            response ? "contact-form-response-active" : ""
          }`}
        >
          <p>{response}</p>
        </div>
        <div
          className={`contact-form-error ${
            error ? "contact-form-error-active" : ""
          }`}
        >
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
