import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import NavBar from "./NavBar";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserContext from "./UserContext";
import JoblyApi from "./api";
import ProfileForm from "./ProfileForm";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("jobly-token")
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          JoblyApi.token = token;

          const { username } = jwtDecode(token);
          const user = await JoblyApi.getUser(username);

          setCurrentUser(user);
        } catch (err) {
          console.error("Problem loading user", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }

      setIsLoading(false);
    }

    getCurrentUser();
  }, [token]);

  async function login(data) {
    try {
      const token = await JoblyApi.login(data);

      localStorage.setItem("jobly-token", token);
      setToken(token);

      return { success: true };
    } catch (errors) {
      return {
        success: false,
        errors
      };
    }
  }

  async function signup(data) {
    try {
      const token = await JoblyApi.signup(data);

      localStorage.setItem("jobly-token", token);
      setToken(token);

      return { success: true };
    } catch (errors) {
      return {
        success: false,
        errors
      };
    }
  }

  async function saveProfile(data) {
    try {
      const updatedUser = await JoblyApi.saveProfile(
        currentUser.username,
        data
      );

      setCurrentUser(updatedUser);

      return { success: true };
    } catch (errors) {
      return {
        success: false,
        errors
      };
    }
  }

  async function applyToJob(jobId) {
    await JoblyApi.applyToJob(
      currentUser.username,
      jobId
    );

    setCurrentUser(user => ({
      ...user,
      applications: [
        ...user.applications,
        jobId
      ]
    }));
  }

  function logout() {
    localStorage.removeItem("jobly-token");
    setToken(null);
    setCurrentUser(null);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      <BrowserRouter>
        <NavBar logout={logout} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/companies">
            {currentUser ? (
              <CompanyList />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/companies/:handle">
            {currentUser ? (
              <CompanyDetail applyToJob={applyToJob} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/jobs">
            {currentUser ? (
              <JobList applyToJob={applyToJob}/>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/profile">
            {currentUser ? (
              <ProfileForm saveProfile={saveProfile} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route>
            <h2>404 - Page Not Found</h2>
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;