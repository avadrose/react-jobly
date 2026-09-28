import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ signup }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
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

    const result = await signup(formData);

    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
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
            required
          />
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>

          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>

          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;