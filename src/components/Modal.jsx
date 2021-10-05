import React, { useEffect } from "react";
import { actionTypes } from "./Todos";
const Modal = ({ isOpen, data, dispatch }) => {
  const [modalOpen, setModalOpen] = React.useState(true);
  const [newTodo, setNewTodo] = React.useState("");
  React.useEffect(() => {
    setModalOpen(isOpen);
    setNewTodo(data ? data.todo : "");
  }, [isOpen, data]);

  if (modalOpen) {
    return (
      <div
        style={{
          position: "absolute",
          inset: "0 0 0 0",
          width: "100%",
          height: "100vh",
          backgroundColor: "gray",
          opacity: "0.70",
          display: "grid",
          placeContent: "center",
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({
              type: actionTypes.UPDATE,
              payload: { updatedTodo: newTodo, id: data.id },
            });
            setModalOpen(false);
          }}
        >
          Update
        </button>
        <button onClick={() => setModalOpen(false)}>cancel</button>
      </div>
    );
  } else {
    return null;
  }
};
export default Modal;
