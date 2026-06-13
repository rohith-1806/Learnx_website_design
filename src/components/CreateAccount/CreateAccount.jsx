import React, { useState } from "react";
import "./CreateAccount.css";

const CreateAccount = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // CHECK EXISTING USER

    const existingUser = users.find(
      (user) => user.email === formData.email
    );

    if (existingUser) {

      alert("User already exists");

      return;
    }

    // NEW USER

    const newUser = {
      id: Date.now(),

      name: formData.name,

      email: formData.email,

      password: formData.password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account Created Successfully");

    window.location.href = "/user-login";
  };

  return (

    <div className="create-account-container">

      <form
        className="create-account-form"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Create Account
        </button>

      </form>

    </div>
  );
};

export default CreateAccount;