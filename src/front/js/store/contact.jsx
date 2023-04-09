import Swal from "sweetalert2";

export const contactStore = {
  listaContactos: [
    {
      full_name: "Dave Bradley",
      email: "dave@gmail.com",
      agenda_slug: "josewilmerDRAgenda",
      address: "47568 NW 34ST, 33434 FL, USA",
      phone: "7864445566",
      profileImage: ""

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

    deleteContact: async (index) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          arrTemp.splice(index, 1);
          setStore({ ...store, listaContactos: arrTemp });
          Swal.fire("Deleted!", "The contact has been deleted.", "success");
        }
      });

      return store.listaContactos;
    },

    editContact: async (index, obj) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      arrTemp[index] = obj;
      setStore({ ...store, listaContactos: arrTemp });

      return store.listaContactos;
    },

  }

}