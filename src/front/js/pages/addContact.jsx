import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="container mt-4 bg-light p-3">
      <div className="d-flex align-items-center">
        <h1>Add Contact</h1>
        <Link to="/"><button type="button" className="btn btn-primary m-3">Go Back</button></Link>
      </div>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="full-name" className="form-label">Full Name:</label>
          <input type="text" className="form-control" id="full-name" name="full-name" placeholder="Enter full name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="tel" className="form-control" id="phone" name="phone" placeholder="Enter phone number" />
        </div>
        <div className="col-md-6">
          <label htmlFor="profile-image" className="form-label">Profile Image:</label>
          <input type="file" className="form-control" id="profile-image" name="profile-image" onChange={handleImageChange} />
          {imagePreview && (
            <div className="mt-3">
              <p>Image Preview:</p>
              <img src={imagePreview} alt="Profile" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
            </div>
          )}
        </div>
        <div className="col-md-12 d-flex align-items-end justify-content-center">
          <button type="button" className="btn btn-primary w-50 mt-4" onClick={async () => {
            const full_name = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;

            const newContact = {
              full_name,
              email,
              phone,
              address,
              agenda_slug: "josewilmerDRAgenda",
              // Agregar la imagen seleccionada al objeto de contacto (esto es solo temporal y no lo guarda en el servidor)
              profile_image: imagePreview,
            };
            actions.addContact(newContact);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You have added a new contact to the list',
              showConfirmButton: true,
            });

            document.getElementById("full-name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("address").value = "";
            document.getElementById("profile-image").value = null;
            setSelectedImage(null);
            setImagePreview(null);

            // Redirigir a la página principal
            navigate("/");
          }}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddContact;

