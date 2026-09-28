import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ login }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const result = await login(formData);

    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        {formErrors.length > 0 && (
          <div>
            {formErrors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <button type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;