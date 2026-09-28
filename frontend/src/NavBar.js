import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "./UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  function handleLogout() {
    logout();
    history.push("/");
  }

  return (
    <nav>
      <NavLink exact to="/">
        Jobly
      </NavLink>

      {" | "}

      {currentUser ? (
        <>
          <NavLink to="/companies">
            Companies
          </NavLink>

          {" | "}

          <NavLink to="/jobs">
            Jobs
          </NavLink>

          {" | "}

          <NavLink to="/profile">
            {currentUser.username}
          </NavLink>

          {" | "}

          <button onClick={handleLogout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login">
            Login
          </NavLink>

          {" | "}

          <NavLink to="/signup">
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;