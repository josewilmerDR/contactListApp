import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/home.css";

const EditContact = (props) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [fullName, setFullName] = useState(store.listaContactos[params.theindex].full_name);
    const [email, setEmail] = useState(store.listaContactos[params.theindex].email);
    const [address, setAddress] = useState(store.listaContactos[params.theindex].address);
    const [phone, setPhone] = useState(store.listaContactos[params.theindex].phone);
    const [profileImage, setProfileImage] = useState(store.listaContactos[params.theindex].profile_image || "");

    const navigate = useNavigate();

    const handleEditContact = () => {
        const updatedContact = {
            full_name: fullName,
            email: email,
            address: address,
            phone: phone,
            profile_image: profileImage
        };
        actions.editContact(params.theindex, updatedContact);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "You have edited the contact",
            showConfirmButton: true
        }).then(() => {
            navigate("/");
        });;
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mt-4 bg-light p-3">
            <div className="d-flex align-items-center">
                <h1>Edit Contact: {store.listaContactos[params.theindex].full_name}</h1>
                <Link to="/">
                    <button type="button" className="btn btn-primary m-3">
                        Go Back
                    </button>
                </Link>
            </div>
            <form className="row g-3">
                {/* Input for image upload */}
                <div className="col-md-6">
                    <label htmlFor="profile-image" className="form-label">
                        Profile Image:
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="profile-image"
                        name="profile-image"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="full-name" className="form-label">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="full-name"
                        name="full-name"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="address" className="form-label">
                        Address:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="col-md-12 d-flex align-items-end justify-content-center">
                    <button type="button" className="btn btn-primary w-50 mt-4" onClick={handleEditContact}>Edit</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;

EditContact.propTypes = {
    match: PropTypes.object
};
