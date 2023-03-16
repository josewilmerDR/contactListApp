import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState({})
    // let newContact = {
    //     full_name: "Antiono",
    //     email: "email@gmail.com",
    //     phone: "88882889",
    //     agenda_slug: "josewilmerDRAgenda",
    //     address: "47568 NW 34ST, 33434 FL, USA",
    // }
    useEffect(() => { }, [data.full_name, data.email, data.phone])

    return (
        <div>
            aqui deberia agregar contactos nuevos
            <Link to="/">Regresar a vista de contactos</Link>
            <br />
            <input placeholder="Agregue nombre de contacto" nombre="full_name" onChange={(e) => { setData({ ...data, full_name: e.target.value }) }} />
            <input placeholder="Agregue email de contacto" nombre="email" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
            <input placeholder="Agregue teléfono de contacto" nombre="phone" onChange={(e) => { setData({ ...data, phone: e.target.value }) }} />

            <button type="button" onClick={() => {
                actions.addContact(data)
            }}>Agregar Contacto a la agenda</button>

            <br />

            <button type="button" onClick={async () => {
                let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/",
                    {
                        full_name: data.full_name,
                        email: data.email,
                        agenda_slug: "agenda_de_antonio",
                        address: "47688 NM 34st, 34545 FL, US",
                        phone: data.phone,

                    },
                    "POST"

                )
                if (!response.ok) {
                    alert("No se registró el contacto")
                    return
                }

                console.log("contacto creado", respuestaJson)

            }}>Boton con fetch</button>
        </div>

    )
}

export default AddContact;