import React, { useEffect, useState, useContext } from "react";
import { actionTypes } from "./Todos";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

import { UsernameContext } from "../contexts/UsernameContext";
import "../css/todo.css";
const Todos = ({ dispatch, todos, loading }) => {
  const { username, setUsername } = useContext(UsernameContext);
  const history = useHistory();
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  async function populateTodos() {
    const req = await axios.get("https://makeyourlists.herokuapp.com/", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (req.statusText === "OK") {
      await req.data.todo;
      dispatch({
        type: actionTypes.FETCH,
        payload: { data: req.data.todo, loading: false },
      });
    } else {
      alert(req.data.error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUsername(user.user);
        populateTodos();
      } else {
        localStorage.removeItem("token");
        history.replace("/login");
      }
    } else {
      history.replace("/register");
    }
  }, []);
  return (
    <>
      <h2
        style={{
          textAlign: "right",
          textTransform: "capitalize",
          paddingRight: "10rem",
        }}
      >
        Hi, {username}
      </h2>
      <div className="main-container">
        <h1 className="heading">Todos</h1>
        <div className="inputs-wrapper">
          <input
            type="text"
            name="input"
            value={userInput}
            onChange={handleChange}
            placeholder="Enter Todo"
          />
          <i
            className="fas fa-plus-circle add-icon icons"
            onClick={() => {
              setUserInput("");
              dispatch({ type: actionTypes.ADD, payload: userInput });
            }}
          ></i>
          <ol>
            {loading ? "loading..." : ""}
            {todos?.map((todo, key) => (
              <div key={key} className="todos">
                <li>{todo.todo}</li>
                <div className="icons-wrapper">
                  <i
                    className="fas fa-edit icons edit-icon"
                    onClick={() => {
                      dispatch({
                        type: actionTypes.EDIT,
                        payload: todo.id,
                      });
                    }}
                  ></i>
                  <i
                    className="fas fa-trash-alt icons delete-icon"
                    onClick={() =>
                      dispatch({
                        type: actionTypes.DELETE,
                        payload: todo.id,
                      })
                    }
                  ></i>
                </div>
              </div>
            ))}
          </ol>
        </div>
        {/* <Modal isOpen={modalOpen} data={todoToBeEdited} /> */}
      </div>
    </>
  );
};

export default Todos;
