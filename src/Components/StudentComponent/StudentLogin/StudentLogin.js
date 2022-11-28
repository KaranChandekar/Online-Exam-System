import style from "./StudentLogin.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function StudentLogin() {
  const [user, setUser] = useState({
    user_email: "",
    user_password: "",
  });

  function onTextFieldChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  let history = useHistory();

  const [check, setCheck] = useState(false);

  async function handleLogin() {
    let value = await axios.get("http://localhost:3333/user");

    for (let i = 0; i < value.data.length; i++) {
      if (
        value.data[i].user_email === user.user_email &&
        value.data[i].user_password === user.user_password
      ) {
        setCheck(true);
        alert("success");
        sessionStorage.setItem("user", user.user_email);
        history.push("/StudentDashboard");
      }
    }
    if (check) alert(" Wrong User Email or password");
  }

  return (
    <section className={style.loginSection}>
      <div id={style.container}>
        <h1>Student Login</h1>

        <form className={style.form}>
          <input
            placeholder="Email"
            name="user_email"
            onChange={(e) => onTextFieldChange(e)}
            type="text"
            id={style.email}
          />

          <input
            placeholder="Password"
            name="user_password"
            onChange={(e) => onTextFieldChange(e)}
            type="password"
            id={style.password}
          />

          <button id={style.login} onClick={handleLogin}>
            Login
          </button>
        </form>

        <div id={style.signup}>
          New to Portal?{" "}
          <NavLink exact to="/StudentSignup">
            {" "}
            Register
          </NavLink>
          <NavLink id={style.goBackLink} exact to="/">
            {" "}
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default StudentLogin;
