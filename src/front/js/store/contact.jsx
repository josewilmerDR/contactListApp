export const contactStore = {
    listaContactos: [
        {
            full_name: "Dave Bradley",
            email: "dave@gmail.com",
            agenda_slug: "josewilmerDRAgenda",
            address: "47568 NW 34ST, 33434 FL, USA",
            phone: "7864445566"
        }
    ]

}

export function contactActions(getStore, getActions, setStore) {
    return {
        addContact: async (obj) => {
            const store = getStore();
            let arrTemp = store.listaContactos.slice()

            arrTemp.push(obj)
            setStore({ ...store, listaContactos: arrTemp })
            return store.listaContactos;
        },

        deleteContact: (indice) => {
            let store = getStore();
            let arrTemp = store.listaContactos.filter((item, index) => { return index != indice });
            setStore({ ...store, listaContactos: arrTemp });
        },
        editContact: (indice, nombre, email) => {
            let store = getStore();
            let arrTemp = store.listaContactos.slice();
            arrTemp[indice]["full_name"] = nombre;
            arrTemp[indice]["email"] = email;
            setStore({ ...store, listaContactos: arrTemp })
        },
        peticionEjemplo: async () => {
            let respuesta = fetch("https://assets.breatheco.de/apis/fake/contact/agenda", { //En las solicitudes GET, se puede obviar el segundo parametro del fech.
                method: "GET",
                headers: { "Content-Type": "aplication/json" },
                body: JSON.stringify(suma)

            }).then((promesa) => {
                console.log("promesa.ok", promesa.ok);
                console.log("promesa.status", promesa.status);
                console.log("promesa.text()", promesa.text());
                return promesa.json() //este es un proceso que puede tardar un tiempo, por tanto tien que ser asincrono
            }).then((response) => {
                suma = response;
                console.log("response", response);
            })
        }
    }

}