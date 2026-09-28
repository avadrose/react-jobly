import React, { useContext, useState } from "react";
import UserContext from "./UserContext";

function ProfileForm({ saveProfile }) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  });

  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));

    setSaveConfirmed(false);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const result = await saveProfile(formData);

    if (result.success) {
      setSaveConfirmed(true);
      setFormErrors([]);
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <p>{currentUser.username}</p>
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>

          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>

          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
          />
        </div>

        {formErrors.length > 0 &&
          formErrors.map(error => (
            <p key={error}>{error}</p>
          ))}

        {saveConfirmed && (
          <p>Updated successfully.</p>
        )}

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;