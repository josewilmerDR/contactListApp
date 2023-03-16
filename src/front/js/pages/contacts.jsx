import React, { useEffect, useState, useContext, useSyncExternalStore } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contactos = () => {
    const { store, actions } = useContext(Context)
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [lista, setLista] = useState(store.listaContactos)
    useEffect(() => {
        let funcionCarga = async () => {
            let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/agenda/newAnthony")
            console.log(respuestaJson)
            setLista(respuestaJson);
        }
        funcionCarga();
    }, [])

    useEffect(() => { }, [lista, nombre, email])

    return (<div>
        Contactos
        <br />
        <Link to="add-contact">Agregar un contacto</Link>
        <br />
        <input type="text" placeholder="nombre nuevo" onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="nuevo email" onChange={(e) => setEmail(e.target.value)} />
        <ul>
            {lista && lista.length > 0 ? <>
                {lista.map((item, index) => {
                    return (
                        <li key={index}>
                            {item.full_name} - {item.email} - {item.phone}
                            <button
                                type="button"
                                onClick={() => {
                                    if (nombre === "" || email === "") {
                                        alert("Rellene un nombre y un correo")
                                        return
                                    }
                                    actions.editContact(index, nombre, email)
                                }}>
                                Editar Contacto
                            </button>
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => { actions.deleteContact(index) }}>
                                Eliminar Contacto
                            </button>
                        </li>
                    )
                })}

            </>
                :
                <>No hay contactos</>}
        </ul>
    </div>)
}

export default Contactos;