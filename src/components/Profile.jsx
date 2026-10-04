import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      navigate("/login");
      return;
    }

    fetch(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    navigate("/login");
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <img src={user.image} alt={user.firstName} />

      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Phone: {user.phone}</p>
      <p>Birth Date: {user.birthDate}</p>
      <p>Blood Group: {user.bloodGroup}</p>
      <p>Height: {user.height}</p>
      <p>Weight: {user.weight}</p>
      <p>Eye Color: {user.eyeColor}</p>
  </div>
  );
}

export default Profile;