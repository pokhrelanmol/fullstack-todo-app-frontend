import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
const schema = yup.object().shape({
  oldpassword: yup.string().required().min(8).max(30),
  newpassword: yup.string().required().min(8).max(32),
});
const ChangePassword = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    try {
      const res = await axios.post(
        "https://makeyourlists.herokuapp.com/change-password",
        data,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        alert(res.data.message);
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
      const errRes = err.response;
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
          Old Password
        </label>
        <div className="input-wrapper">
          <i className="fa fa-lock"></i>
          <input
            {...register("oldpassword")}
            type="text"
            className="Name"
            placeholder="Old Password"
          />
        </div>
        <p>{errors.oldpassword?.message}</p>

        <label className="control-label" htmlFor="password">
          New Password
        </label>

        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            autoComplete="off"
            {...register("newpassword")}
            type="password"
            className="password"
            placeholder="New Password"
          />
        </div>
        <p>{errors.newpassword?.message}</p>
        <button type="submit" className="submit-button">
          Change
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
