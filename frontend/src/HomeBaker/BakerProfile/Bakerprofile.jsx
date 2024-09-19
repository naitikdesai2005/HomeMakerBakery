import React, { useState, useEffect } from "react";
import HeaderBaker from "../HeaderBaker/HeaderBaker.jsx";
import axios from "axios";
import "./Bakerprofile.css";

const Bakerprofile = () => {
  const [bakerDetails, setBakerDetails] = useState({
    name: "",
    email: "",
    bio: "",
    mobilenumber: "",
    bakeryname: "",
    bakeryaddress: "",
    password: "",
    profilePic: "",
    gender: "",
    link: "",
    bankAccNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(bakerDetails);

  // Fetching the baker profile
  useEffect(() => {
    const fetchBakerProfile = async () => {
      try {
        const response = await axios.get("/api/baker/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          const profileData = response.data.data;
          console.log("Profile data fetched:", profileData); // Debug log
          setBakerDetails(profileData);
          setUpdatedDetails(profileData);
        } else {
          console.error("Error fetching baker profile: Unsuccessful response");
        }
      } catch (error) {
        console.error("Error fetching baker profile:", error);
      }
    };

    fetchBakerProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
    console.log(`Updated ${name}:`, value); // Debug log
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Saving the updated profile
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", updatedDetails.name);
    formData.append("email", updatedDetails.email);
    formData.append("bio", updatedDetails.bio);
    formData.append("phone", updatedDetails.phone);
    formData.append("bakeryName", updatedDetails.bakeryName);
    formData.append("address", updatedDetails.address);
    formData.append("password", updatedDetails.password);
    formData.append("gender", updatedDetails.gender);
    formData.append(
      "facebookInstagramLink",
      updatedDetails.facebookInstagramLink
    );
    formData.append("bankAccountNumber", updatedDetails.bankAccountNumber);

    if (updatedDetails.profilePic instanceof File) {
      formData.append("image", updatedDetails.profilePic);
    }

    try {
      const response = await axios.post("/api/baker/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Profile updated successfully", response.data); // Debug log
      setBakerDetails(updatedDetails);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating baker profile:", error);
    }
  };

  // Handling file input for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Profile picture updated:", file); // Debug log
        setUpdatedDetails({ ...updatedDetails, profilePic: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <HeaderBaker />
      <div className="baker-profile-container">
        <div className="profile-pic">
          <img
            src={
              updatedDetails.profilePic instanceof File
                ? URL.createObjectURL(updatedDetails.profilePic)
                : updatedDetails.profilePic || "https://via.placeholder.com/150"
            }
            alt="Profile"
          />
          {isEditing && (
            <>
              <input
                type="file"
                id="profilePicUpload"
                onChange={handleFileChange}
              />
              <label htmlFor="profilePicUpload" className="upload-button">
                Upload New Picture
              </label>
            </>
          )}
        </div>

        <div className="profile-details">
          {isEditing ? (
            <div className="edit-container">
              <div className="input-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={updatedDetails.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Bakery Name:</label>
                <input
                  type="text"
                  name="bakeryName"
                  value={updatedDetails.bakeryName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={updatedDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={updatedDetails.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Bio:</label>
                <textarea
                  name="bio"
                  value={updatedDetails.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Facebook / Instagram Link (Optional):</label>
                <input
                  type="text"
                  name="facebookInstagramLink"
                  value={updatedDetails.facebookInstagramLink}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Bank Account Number:</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={updatedDetails.bankAccountNumber}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2>{bakerDetails.name}</h2>
              <p>Email: {bakerDetails.email}</p>
              <p>Phone: {bakerDetails.phone}</p>
              <p>Bakery: {bakerDetails.bakeryName}</p>
              <p>Address: {bakerDetails.address}</p>
              <p>Gender: {bakerDetails.gender}</p>
              <p>
                Facebook / Instagram Link:{" "}
                {bakerDetails.facebookInstagramLink || "Not Provided"}
              </p>
              <p>
                Bank Account Number:{" "}
                {bakerDetails.bankAccountNumber || "Not Provided"}
              </p>
              <p>{bakerDetails.bio}</p>
              <button onClick={handleEditToggle} className="edit-button">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bakerprofile;
