import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UsernameContext } from "../contexts/UsernameContext";

import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required().min(2).max(30),
  password: yup.string().required().min(8).max(32),
});
const Login = () => {
  const { setUsername } = React.useContext(UsernameContext);
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
    try {
      const res = await axios.post("http://localhost:3001/login", data);
      if (res.data.userToken) {
        localStorage.setItem("token", res.data.userToken);
        alert("login successfull");
        setUsername(data.name);
        history.push("/");
        reset();
      }
    } catch (err) {
      const errRes = err.response;
      console.log(errRes);
      if (errRes.status === 400) {
        alert(errRes.data.error);
      } else if (errRes.status === 404) {
        alert(errRes.data.error);
      } else {
        alert("Internal errors occured");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>

      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <label className="control-label" htmlFor="Name">
          Name
        </label>
        <div className="input-wrapper">
          <i className="fa fa-user"></i>
          <input
            {...register("name")}
            type="text"
            className="Name"
            placeholder="Name"
          />
        </div>
        <p>{errors.name?.message}</p>

        <label className="control-label" htmlFor="password">
          Password
        </label>

        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            autoComplete="off"
            {...register("password")}
            type="password"
            className="password"
            placeholder="Password"
          />
        </div>
        <p>{errors.password?.message}</p>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
