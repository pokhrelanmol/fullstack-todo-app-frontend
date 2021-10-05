import React, { useReducer } from "react";
import Todos from "./Todo";
import axios from "axios";
import Modal from "./Modal";
export const actionTypes = {
  FETCH: "FETCH_DATA",
  ADD: "ADD_TODO",
  DELETE: "DELETE_TODO",
  EDIT: "EDIT_TODO",
  UPDATE: "UPDATE_TODO",
  TOGGLE_MODAL: "TOGGLE_MODAL",
};

let initialState = {
  todos: [],
  loading: true,
  modalOpen: false,
  todoToBeEdited: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH:
      const data = action.payload.data;
      if (data) {
        return {
          ...state,

          loading: action.payload.loading,
          todos: [...data],
        };
      }
    case actionTypes.ADD:
      if (action.payload.length < 2) {
        alert("minimum length of todo should be 2");
      } else {
        const todoToBePosted = action.payload;
        axios
          .post(
            "https://makeyourlists.herokuapp.com/",
            { data: todoToBePosted },
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          )
          .then(() => console.log("todo posted"));
        console.log([...state.todos[0].todo]);
        return {
          ...state,
          todos: [...state.todos, { todo: todoToBePosted }],
          loading: false,
        };
      }
    case actionTypes.DELETE:
      axios
        .delete("https://makeyourlists.herokuapp.com/", {
          data: { id: action.payload },
        })
        .then(() => alert(`todo with id ${action.payload} deleted`))
        .catch((err) => console.log(err));
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case actionTypes.EDIT:
      let editTodo;
      state.todos.map((todo) => {
        if (todo.id === action.payload) {
          editTodo = todo;
        }
      });
      return {
        ...state,
        modalOpen: true,
        todoToBeEdited: editTodo,
      };
    case actionTypes.UPDATE:
      axios
        .patch("https://makeyourlists.herokuapp.com/", {
          id: action.payload.id,
          newTodo: action.payload.updatedTodo,
        })
        .then((data) => {
          console.log(data);
          alert("todo updated");
        })
        .catch((err) => console.error(err));
      return {
        ...state,
        todos: state.todos.map((_todo) => {
          if (_todo.id === action.payload.id) {
            _todo.todo = action.payload.updatedTodo;
          }
          return _todo;
        }),
        modalOpen: false,
      };
    default:
      return state;
  }
};

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Todos
        dispatch={dispatch}
        todos={state.todos}
        loading={state.loading}
        modalOpen={state.modalOpen}
        todoToBeEdited={state.todoToBeEdited}
      />
      <Modal
        dispatch={dispatch}
        isOpen={state.modalOpen}
        data={state.todoToBeEdited}
      />
    </>
  );
};

export default Reducer;
