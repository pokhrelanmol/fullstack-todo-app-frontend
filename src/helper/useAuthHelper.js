// import axios from "axios";
// import React from "react";
// const populateTodo = async () => {
//   const req = await axios.get("http://localhost:3001/todos", {
//     headers: {
//       "x-access-token": localStorage.getItem("token"),
//     },
//   });
//   if (req.data.status === "ok") {
//     // console.log(req.data.todos);
//     return req.data.todos;
//   } else {
//     alert(req.data.error);
//     return "data not found";
//   }
// };

// const useAuthHelper = () => {
//   const [todo, setTodo] = React.useState("");
//   React.useEffect(() => {
//     const data = populateTodo().then((todo) => {
//       setTodo(todo);
//       console.log(todo);
//     });
//     return () => {
//       setTodo(""); // This worked for me
//     };
//   }, [todo]);
//   console.log(todo);
//   return todo;
// };

// export default useAuthHelper;
