"use client";

import "./contact.css";

import { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("company", company);
    formData.append("location", 25);
    formData.append("email", email);
    formData.append("message", message);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      console.log({ fullName, company, location, email, message });
      console.log(images);
      const res = await axios.post("/api/contact", formData);
      console.log(res);

      setFullName("");
      setCompany("")
      setLocation("")
      setEmail("")
      setMessage("")
      setImages([]);

      const urlsToRevoke = [...imageUrls];
      setImageUrls([]);

      if (imageInputRef.current) {
        imageInputRef.current.value = null;
      }

      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact">
        <div className="contact-form-container">
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
              <p className="contact-form-data-label">
                Detalles de tu consulta*
              </p>
              <textarea
                className="contact-form-data-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="contact-form-data">
              <label
                htmlFor="file-upload"
                className="contact-form-data-custom-label"
              >
                Adjuntar archivos
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                className="contact-form-data-custom-input"
                onChange={handleImageChange}
                ref={imageInputRef}
              />

              <div className="file-names">
                {imageUrls.length > 0 ? (
                  <ul>
                    {imageUrls.map((url, index) => (
                      <li key={index} className="file-name">
                        <Image
                          src={url}
                          alt={`Uploaded image ${index + 1}`}
                          width={150}
                          height={150}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  "Seleccione algun archivo si es necesario."
                )}
              </div>
            </div>
            <div className="contact-form-button-container">
              <button className="contact-form-button" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
