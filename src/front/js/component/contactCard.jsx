import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const ContactCard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => { }, [store.listaContactos]);

  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          {store.listaContactos && store.listaContactos.length > 0 ? (
            <>
              {store.listaContactos.map((item, index) => {
                return (
                  <li key={index} className="list-group-item d-flex mt-2 mb-2">
                    {/* Mostrar la imagen de perfil cargada o una imagen predeterminada si no se cargó ninguna */}
                    <img
                      src={
                        item.profile_image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      className="rounded rounded-circle ms-5 me-5"
                      style={{ width: "15%" }}
                      alt="Profile"
                    />
                    <div className="d-flex flex-column align-items-start col-8">
                      <h5>{item.full_name}</h5>
                      <div className="d-flex align-items-center text-secondary my-1">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className="ms-3 fw-bold">{item.address}</span>
                      </div>
                      <div className="d-flex align-items-center text-secondary my-1">
                        <i className="fa-solid fa-phone-flip"></i>
                        <span className="ms-3" style={{ fontSize: "14px" }}>{item.phone}</span>
                      </div>
                      <div className="d-flex align-items-center text-secondary my-1">
                        <i className="fa-solid fa-envelope"></i>
                        <span className="ms-3" style={{ fontSize: "12px" }}>{item.email}</span>
                      </div>
                    </div>
                    <div>
                      <Link to={"/edit-contact/" + index}>
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <i
                        className="fa-solid fa-trash-can ms-4"
                        onClick={() => actions.deleteContact(index)}
                      ></i>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <li className="list-group-item text-center">
              <h1>There are no contacts to show</h1>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ContactCard;
