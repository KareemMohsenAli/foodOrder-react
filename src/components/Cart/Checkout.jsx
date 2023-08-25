import React, { useState } from "react";

export default function Checkout(props) {
  const [userData, setUserData] = useState({
    name: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const [error, seterror] = useState({
    nameErr: "",
    streetErr: "",
    postalCodeErr: "",
    cityErr: "",
  });

  const formisnotvalid =
    error.nameErr.length > 0 ||
    userData.name.length <= 0 ||
    error.streetErr.length > 0 ||
    userData.street.length <= 0 ||
    error.postalCodeErr.length > 0 ||
    userData.postalCode.length <= 0 ||
    error.cityErr.length > 0 ||
    userData.city.length <= 0;

  const onChangeHandler = (e) => {
    if (e.target.name === "name") {
      setUserData({
        ...userData,
        name: e.target.value,
      });

      seterror({
        ...error,
        nameErr:
          e.target.value.length === 0
            ? "required"
            : e.target.value.length < 5
            ? "must be at least 4 characters"
            : /\d/.test(e.target.value)
            ? "must be only strings"
            : "",
      });
    } else if (e.target.name === "street") {
      setUserData({
        ...userData,
        street: e.target.value,
      });
      seterror({
        ...error,
        streetErr:
        e.target.value.length === 0
        ? "required"
        : e.target.value.length < 5
        ? "must be at least 4 characters"
        : /\d/.test(e.target.value)
        ? "must be only strings"
        : "",
      });
    } else if (e.target.name === "postal") {
      setUserData({
        ...userData,
        postalCode: e.target.value,
      });
      seterror({
        ...error,
        postalCodeErr:
          e.target.value < 0
            ? "it should'nt be a negative number"
            : e.target.value.length < 6 && "must be at least 5 numbers",
      });
    } else if (e.target.name === "city") {
      setUserData({
        ...userData,
        city: e.target.value,
      });

      seterror({
        ...error,
        cityErr:
          e.target.value.length === 0
            ? "required"
            : e.target.value.length < 3
            ? "must be at least 3 characters"
            : /\d/.test(e.target.value)
            ? "must be only strings"
            : "",
      });
    } else {
      return;
    }
  };

  const ErrorClassName =
    error.nameErr.length > 0 ? "form-control is-invalid" : " form-control ";
  const ErrorClassStreet =
    error.streetErr.length > 0 ? "form-control is-invalid" : " form-control ";
  const ErrorClassPostal =
    error.postalCodeErr.length > 0
      ? "form-control is-invalid"
      : " form-control ";
  const ErrorClassCity =
    error.cityErr.length > 0 ? "form-control is-invalid" : " form-control ";


  const submitHandler = (e) => {
    const FormData={
      name:userData.name,
      street:userData.street,
      city:userData.city,
      postalCode:userData.postalCode,
    }
    e.preventDefault();
    if (formisnotvalid) {
      return;
    } else {
      console.log("come");
      props.onSumbit(FormData)
      setUserData({
        name: "",
        street: "",
        postalCode: "",
        city: "",
      })
    }
  };
  return (
    <form onSubmit={submitHandler} className="row g-3">
      <div className="col-auto">
        <label for="Name">Your Name</label>
        <input
          onChange={onChangeHandler}
          value={userData.name}
          type="text"
          name="name"
          className={ErrorClassName}
          id="Name"
          placeholder="Name"
        />
        <span className="text-danger">{error.nameErr}</span>
      </div>
      <div className="col-auto">
        <label for="Street">Street</label>
        <input
          onChange={onChangeHandler}
          value={userData.street}
          name="street"
          type="text"
          className={ErrorClassStreet}
          id="Street"
          placeholder="Street"
        />
        <span className="text-danger">{error.streetErr}</span>
      </div>
      <div className="col-auto">
        <label for="Postal Code">Postal Code</label>
        <input
          onChange={onChangeHandler}
          value={userData.postalCode}
          type="number"
          name="postal"
          className={ErrorClassPostal}
          id="Postal Code"
          placeholder="Postal Code"
        />
        <span className="text-danger">{error.postalCodeErr}</span>
      </div>
      <div className="col-auto">
        <label for="City">City</label>
        <input
          onChange={onChangeHandler}
          value={userData.city}
          name="city"
          type="text"
          className={ErrorClassCity}
          id="City"
          placeholder="City"
        />
        <span className="text-danger">{error.cityErr}</span>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">
          Order
        </button>
      </div>
      <div className="col-auto">
        <button
          onClick={props.onCancel}
          type="submit"
          className="btn btn-primary mb-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
