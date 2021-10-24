import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../css/registrationForm.css";
const schema = yup.object().shape({
  name: yup.string().required().min(2).max(30),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(32),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords does not match"),
  mobilenumber: yup
    .string()
    .min(10)
    .max(10)
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  profession: yup.string().optional("optional").min(3).max(30),
});

const RegistrationForm = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    // storing data in database
    try {
      await axios.post("http://localhost:3001/register", data);
      alert("user registered");
      history.push("/login");
      reset();
    } catch (err) {
      const errRes = err.response;
      if (errRes.status === 400) {
        alert(errRes.data.error);
      } else if (errRes.status === 500) {
        alert(errRes.data.error);
      }
    }
  };
  return (
    <div className="registration-main-div">
      <h2 className="heading">Register</h2>
      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <label className="control-label" htmlFor="name">
          Name
        </label>
        <div className="input-wrapper">
          <i className="fa fa-user"></i>
          <input
            {...register("name")}
            type="text"
            className="name"
            placeholder="Name"
          />
        </div>
        <p>{errors.name?.message}</p>

        <label className="control-label" htmlFor="lastName">
          Email
        </label>

        <div className="input-wrapper">
          <i className="fa fa-envelope"></i>
          <input
            {...register("email")}
            type="email"
            className="email"
            placeholder="Email"
          />
        </div>
        <p>{errors.email?.message}</p>

        <label className="control-label" htmlFor="mobileNumber">
          Mobile Number
        </label>

        <div className="input-wrapper">
          <i className="fas fa-phone"></i>
          <input
            {...register("mobilenumber")}
            type="text"
            className="number"
            placeholder="Mobile Number"
          />
        </div>
        <p>{errors.mobilenumber?.message}</p>

        <label className="control-label" htmlFor="profession">
          Profession
        </label>

        <div className="input-wrapper">
          <i className="fas fa-user-tie"></i>
          <input
            {...register("profession")}
            type="text"
            className="profession"
            placeholder="Your profession"
          />
        </div>
        <p>{errors.profession?.message}</p>

        <label className="control-label" htmlFor="password">
          Password
        </label>

        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            {...register("password")}
            type="password"
            className="password"
            placeholder="Password"
          />
        </div>
        <p>{errors.password?.message}</p>

        <label className="control-label" htmlFor="confirmPassword">
          Confirm Password
        </label>

        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            {...register("confirmpassword")}
            type="password"
            className="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <p>{errors.confirmpassword?.message}</p>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
